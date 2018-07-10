'use strict'

const constant = require('./constant/global'),
  util = require('./utils/common'),
  crypto = require('./utils/crypto'),
  mnomonic = require('./utils/mnemonic'),

  ADDRESS_LENGTH = 40; //20 bytes

class TenderKeys {
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
    result.salt = crypto.generateSalt();
    result.iv = crypto.generateIv();
    return result;
  }
}

/**
 * PRIVATE METHODS
 */



/**
 * Get the Address based on public key
 * @param {String} publicKey 32bytes of Hex String
 */
function getAddressByPubKey(publicKey) {
  if (!util._isPublicKey(publicKey)) {
    throw new Error('Public Key is not a valid Hex String')
  }
  let ripmd160 = new RIPEMD160();
  let encodedPubKey = util._hexStringToBytes(TYPE_ED25519 + PUBKEY_PREFIX + publicKey);
  var buffer = new Buffer(encodedPubKey);
  return ripmd160
    .update(buffer)
    .digest('hex')
    .toUpperCase();
}

/**
 * Get the Address based on private key
 * @param {String} privateKey 64bytes of Hex String
 */
function getAddressByPrivKey(privateKey) {
  if (!util._isPrivateKey(privateKey)) {
    throw new Error('Public Key is not a valid Hex String')
  }
  let publicKey = privateKey.substring(64, 128);
  return this.getAddressByPubKey(publicKey);
}

/**
 * Get the Public Key based on private key
 * @param {String} privateKey 64bytes of Hex String
 */
function getPubKeyByPrivKey(privateKey) {
  util._isPrivateKey(privateKey);
  return privateKey.substring(64, 128);
}

module.exports = TenderKeys;
