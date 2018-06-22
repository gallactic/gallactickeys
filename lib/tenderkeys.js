'use strict'

const crypto = require('crypto'),
  bip39 = require('bip39'),
  nacl = require('tweetnacl'),
  RIPEMD160 = require('ripemd160'),

  TYPE_ED25519 = '01',
  PUBKEY_PREFIX = '0120',
  PUBKEY_LENGTH = 64, // 32 bytes
  SEED_LENGTH = 64, // 32 bytes
  PRIVKEY_LENGTH = 128, // 64 bytes
  ADDRESS_LENGTH = 40, //20 bytes

  PUBKEY_NAME = 'PublicKey',
  SEED_NAME = 'Seed',
  PRIVKEY_NAME = 'PrivateKey',
  ADDRESS_NAME = 'Address';

class TenderKeys {
  constructor() { }

  /**
   * Generate Mnemonic string
   */
  static makeMnemonic() {
    return bip39.generateMnemonic();
  }

  /**
   * Generating a 32 bytes of hex string
   * @param {String} mnemonic a random string
   */
  static makeSeed(mnemonic) {
    let hash = crypto
      .createHash('sha256')
      .update(mnemonic)
      .digest('hex')
      .toUpperCase();
    return hash;
  }

  /**
   * Generating public and private key
   * @param {String} seed Random String
   */
  static makeKeyPair(seed) {
    _isHexString(seed, SEED_NAME, SEED_LENGTH);
    let buffer = new Buffer(seed, 'hex');
    let keyPair = sign(buffer);
    return {
      publicKey: _bytesToHexUpperString(keyPair.publicKey),
      privateKey: _bytesToHexUpperString(keyPair.privateKey || keyPair.secretKey)
    }
  }

  /**
   * Get the Address based on public key
   * @param {String} publicKey 32bytes of Hex String
   */
  static getAddressByPubKey(publicKey) {
    _isHexString(publicKey, PUBKEY_NAME, PUBKEY_LENGTH);
    let ripmd160 = new RIPEMD160();
    let encodedPubKey = _hexStringToBytes(TYPE_ED25519 + PUBKEY_PREFIX + publicKey);
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
  static getAddressByPrivKey(privateKey) {
    _isHexString(privateKey, PRIVKEY_NAME, PRIVKEY_LENGTH);
    let publicKey = privateKey.substring(64, 128);
    return this.getAddressByPubKey(publicKey);
  }

  /**
   * Get the Public Key based on private key
   * @param {String} privateKey 64bytes of Hex String
   */
  static getPubKeyByPrivKey(privateKey) {
    _isHexString(privateKey, PRIVKEY_NAME, PRIVKEY_LENGTH);
    return privateKey.substring(64, 128);
  }
}

/**
 * PRIVATE METHODS
 */

function sign(buffer) {
  // return ed25519.MakeKeypair(buffer);
  return nacl.sign.keyPair.fromSeed(buffer);
}

function _isHexString(hexString, pubOrPrivKey, pubOrPrivKeyLength) {
  if (typeof hexString !== 'string') {
    throw new Error('\nError : The type of ' + pubOrPrivKey + ' must be string!');
  }

  if (hexString.length !== pubOrPrivKeyLength) {
    throw new Error('\nError : The length of ' + pubOrPrivKey + ' must be ' + pubOrPrivKeyLength);
  }

  let arr = hexString.split();
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].match(/[0-9A-Fa-f]/)) {
      throw new Error('Error : unexpected junk in  ' + pubOrPrivKey);
    }
  }
}

// convert buffer to hex string with upper case letter
function _bufferToHexUpper(buffer) {
  return buffer.toString('hex').toUpperCase();
}

// convert Hex String to Bytes
function _hexStringToBytes(hexStr) {

  let result = [];
  while (hexStr.length >= 2) {
    result.push(parseInt(hexStr.substring(0, 2), 16));
    hexStr = hexStr.substring(2, hexStr.length);
  }

  return result;
}

// convert Bytes to Hex String
function _bytesToHexUpperString(byteArray) {
  return new Buffer(byteArray).toString('hex').toUpperCase();
}

module.exports = TenderKeys;
