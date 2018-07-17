'use strict'

const constant = require('./constant/global'),
  util = require('./utils/common'),
  crypto = require('./utils/crypto'),
  mnomonic = require('./utils/mnemonic');

class GallacticKeys {
  constructor() { }

  /**
   * Generate a key pair
   * @param {Object} option [An object that contains configs or optional value]
   * @returns {Object} [contains seed, seedHash, and keyPair]
   */
  static create (option = {}) {
    let result = {};

    result.seed = option.seed || mnomonic.makeMnemonic();
    result.seedHashed = crypto.hashSeed(result.seed, { algorithm: 'sha256' });
    result.keyPair = crypto.makeKeyPair(result.seedHashed);
    result.keyPair.publicKey = util.bytesToHexUpperString(result.keyPair.publicKey);
    result.keyPair.privateKey = util.bytesToHexUpperString(result.keyPair.privateKey)
    result.salt = util.bytesToHexUpperString(crypto.generateSalt());
    result.iv = util.bytesToHexUpperString(crypto.generateIv());
    return result;
  }

  /**
   * Generate a keystore object based on given passphrase and private key along
   * with other params like salt, iv and key derivation
   * @param {String} password [A passphrase entered to create keystore object]
   * @param {String} privateKey [A 64 bytes Hex String]
   * @param {String} salt [A 32 bytes Hex String]
   * @param {String} iv [A 16 bytes Hex String]
   * @param {Object} option [An object contains kdf method and params]
   */
  static export (password, privateKey, salt, iv, option = {}) {
    if (!password || !privateKey || !iv || !salt) {
      throw new Error('Missing parameter! Make sure password, privateKey, iv and salt provided')
    }

    return crypto.marshal(
      crypto.deriveKey(password, salt, option),
      privateKey, util.strToBuffer(salt), util.strToBuffer(iv), option
    );
  }

  /**
   * Recover plaintext private key from secret-storage key object.
   * @param {String} password [a passphrase entered when creating the keystore object]
   * @param {Object} keyObject Keystore object.
   * @return {buffer} Plaintext private key.
   */
  static recover (password, keyObject) {
    var keyObjectCrypto, iv, salt, ciphertext, algo, derivedKey;

    if (!password || !keyObject || !keyObject.length <= 0) {
      throw new Error('Missing parameter! Make sure password and keyObject is provided')
    }

    keyObjectCrypto = keyObject.crypto;
    iv = util.strToBuffer(keyObjectCrypto.cipherparams.iv);
    salt = keyObjectCrypto.kdfparams.salt;
    ciphertext = util.strToBuffer(keyObjectCrypto.ciphertext);
    algo = keyObjectCrypto.cipher;

    if (keyObjectCrypto.kdf === 'pbkdf2' && keyObjectCrypto.kdfparams.prf !== 'hmac-sha256') {
      throw new Error('PBKDF2 only supported with HMAC-SHA256');
    }

    derivedKey = crypto.deriveKey(password, salt, keyObjectCrypto)
    return verifyAndDecrypt(derivedKey, iv, ciphertext, algo, keyObjectCrypto.mac);
  }
}

/**
 * PRIVATE METHODS
 */

// verify that message authentication codes match, then decrypt
function verifyAndDecrypt(derivedKey, iv, ciphertext, algo, mac) {
  var key;
  if (crypto.createMac(derivedKey, ciphertext) !== mac) {
    throw new Error('message authentication code mismatch');
  }

  key = derivedKey.slice(0, 16);

  return util.bytesToHexUpperString(crypto.decrypt(ciphertext, key, iv, algo));
}

module.exports = GallacticKeys;
