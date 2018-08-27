'use strict'

const constant = require('./constant/global'),
  util = require('./utils/common'),
  crypto = require('./utils/crypto'),
  mnemonic = require('./utils/mnemonic'),
  gkeys = {};

const _AC_ADDR_ID = constant.id.acId, // 1
  _VA_ADDR_ID = constant.id.vaId, // 2
  _PRV_KEY_ID = constant.id.privKeyId, // 3
  _PUB_KEY_ID = constant.id.pubKeyId; //4

/**
 * Generate a key pair
 * @param {Object} option [An object that contains configs or optional value]
 * @returns {Object} [contains seed, seedHash, and keyPair]
 */
gkeys.create = (option = {}) => {
  let result = {};

  result.seed = option.seed || mnemonic.makeMnemonic();
  result.seedHashed = crypto.hashSeed(result.seed, { algorithm: 'sha256' });
  result.keyPair = crypto.makeKeyPair(result.seedHashed);
  result.keyPair.publicKey = util.bytesToHexUpperString(result.keyPair.publicKey);
  result.keyPair.publicKey = crypto.bs58Encode(result.keyPair.publicKey, _PUB_KEY_ID);
  result.keyPair.privateKey = util.bytesToHexUpperString(result.keyPair.privateKey);
  result.keyPair.privateKey = crypto.bs58Encode(result.keyPair.privateKey, _PRV_KEY_ID);
  result.salt = util.bytesToHexUpperString(crypto.generateSalt());
  result.iv = util.bytesToHexUpperString(crypto.generateIv());
  return result;
}

/**
 * Generate a Account keystore object based on given passphrase
 * and private key along with other params like salt, iv and key derivation
 * @param {String} password [A passphrase entered to create keystore object]
 * @param {String} privateKey [A 64 bytes Hex String]
 * @param {String} salt [A 32 bytes Hex String]
 * @param {String} iv [A 16 bytes Hex String]
 * @param {Object} option [An object contains kdf method and params]
 */
gkeys.exportAc = (password, privateKey, salt, iv, option = {}) => {
  return exportKs(password, privateKey, salt, iv, _AC_ADDR_ID, option)
}

/**
 * Generate a Validator keystore object based on given passphrase
 * and private key along with other params like salt, iv and key derivation
 * @param {String} password [A passphrase entered to create keystore object]
 * @param {String} privateKey [A 64 bytes Hex String]
 * @param {String} salt [A 32 bytes Hex String]
 * @param {String} iv [A 16 bytes Hex String]
 * @param {Object} option [An object contains kdf method and params]
 */
gkeys.exportVa = (password, privateKey, salt, iv, option = {}) => {
  return exportKs(password, privateKey, salt, iv, _VA_ADDR_ID, option)
}

/**
 * Recover plaintext private key from secret-storage key object.
 * @param {String} password [a passphrase entered when creating the keystore object]
 * @param {Object} keyObject Keystore object.
 * @return {buffer} Plaintext private key.
 */
gkeys.recover = (password, keyObject) => {
  var ksCrypto, iv, salt, ciphertext, algo, derivedKey;

  if (!password || !keyObject || Object.keys(keyObject).length === 0) {
    throw new Error('Missing parameter! Make sure password and keyObject is provided')
  }

  ksCrypto = keyObject.crypto;
  if (!ksCrypto || Object.keys(ksCrypto).length === 0) {
    throw new Error('Invalid keystore crypto object')
  }

  if (typeof ksCrypto.mac !== 'string' || !util.isHexString(ksCrypto.mac)) {
    throw new Error('Keystore object has invalid/empty "mac" value, Unable to proceed');
  }

  if (typeof ksCrypto.ciphertext !== 'string' || !ksCrypto.ciphertext) {
    throw new Error('Keystore object contains invalid cipher text value. Unable to proceed')
  }

  iv = util.strToBuffer(ksCrypto.cipherparams.iv);
  salt = ksCrypto.kdfparams.salt;
  ciphertext = util.strToBuffer(ksCrypto.ciphertext);
  algo = ksCrypto.cipher;

  if (ksCrypto.kdf === 'pbkdf2' && ksCrypto.kdfparams.prf !== 'hmac-sha256') {
    throw new Error('PBKDF2 only supported with HMAC-SHA256');
  }

  derivedKey = crypto.deriveKey(password, salt, ksCrypto)
  return verifyAndDecrypt(derivedKey, iv, ciphertext, algo, ksCrypto.mac);
}

gkeys.utils = {
  util, crypto, mnemonic
};

/**
 * PRIVATE METHODS
 */

// helper function to export keystore
function exportKs (password, privateKey, salt, iv, type, option = {}) {
  if (!password || !privateKey || !type) {
    throw new Error('Missing parameter! Make sure password, privateKey and type provided')
  }

  if (!crypto.isPrivateKey(privateKey)) {
    throw new Error('given Private Key is not a valid Private Key string');
  }

  salt = salt || util.bytesToHexUpperString(crypto.generateSalt());
  iv = iv || util.bytesToHexUpperString(crypto.generateIv())

  return crypto.marshal(
    crypto.deriveKey(password, salt, option), privateKey,
    util.strToBuffer(salt), util.strToBuffer(iv), type, option
  );
}

// verify that message authentication codes match, then decrypt
function verifyAndDecrypt(derivedKey, iv, ciphertext, algo, mac) {
  if (typeof algo !== 'string') {
    throw new Error('Cipher method is invalid. Unable to proceed')
  }
  var key;
  if (crypto.createMac(derivedKey, ciphertext) !== mac) {
    throw new Error('message authentication code mismatch');
  }

  key = derivedKey.slice(0, 16);

  return crypto.bs58Encode(util.bytesToHexUpperString(crypto.decrypt(ciphertext, key, iv, algo)), 3);
}

module.exports = gkeys;
