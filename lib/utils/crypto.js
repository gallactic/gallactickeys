'use strict';

const constant = global.constant,
  util = require('./common'),
  crypto = require('crypto'),
  nacl = require('tweetnacl'),
  RIPEMD160 = require('ripemd160'),

  TYPE_ED25519 = '01',
  PUBKEY_PREFIX = '0120';

const _ENCODING = constant.crypto.encoding,
  _ALGORITHM = constant.crypto.algorithm,
  _SALT_SIZE = constant.crypto.saltSize,
  _IV_SIZE = constant.crypto.ivSize;

class Crypto {
  constructor() { }
  /**
   * Generating a 32 bytes of hex string
   * @param {String} mnemonic a random string
   */
  static hashSeed(seed = '', option = {}) {
    let hash = crypto
      .createHash(option.algorithm || _ALGORITHM)
      .update(seed)
      .digest(option.encoding || _ENCODING)
      .toUpperCase();
    return hash;
  }

  /**
   * Generating a key pair
   * @param {String} seedHash a string which hash of seed content
   */
  static makeKeyPair(seedHash) {
    if (!util._isSeedHash(seedHash)) {
      throw new Error('String is not a valid seed hash');
    }
    let buffer = new Buffer(seedHash, 'hex');
    let keyPair = this.makeKeyPairFromSeed(buffer);
    return {
      publicKey: util._bytesToHexUpperString(keyPair.publicKey),
      privateKey: util._bytesToHexUpperString(keyPair.privateKey || keyPair.secretKey)
    }
  }

  /**
   * Generate key pair using ed25519 curve as encryption algorithm
   * @param {Buffer} buffer [An array of bytes of seedHash hex string]
   * @returns {Object} [Contains public key and private key pair]
   */
  static makeKeyPairFromSeed(buffer) {
    return nacl.sign.keyPair.fromSeed(buffer);
  }

  static generateSalt(size = _SALT_SIZE) {
    return crypto.randomBytes(size)
  }

  static generateIv(size = _IV_SIZE) {
    return crypto.randomBytes(size);
  }
}

module.exports = Crypto;