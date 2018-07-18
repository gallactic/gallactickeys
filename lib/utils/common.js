'use strict';

const constant = require('../constant/global'),
  _PUBKEY_LENGTH = constant.keyPair.publicKeyLength, // 32 bytes
  _PRIVKEY_LENGTH = constant.keyPair.privateKeyLength, // 64 bytes
  _SEEDHASH_LENGTH = constant.keyPair.seedHashLength,
  util = {}; // 32 bytes

/**
 * This will validate the string input whether it is a valid
 * hex string.
 * @param {String} hexString [A string input]
 * @returns {Boolean}
 */
util.isHexString = (str) => {
  if (str.length % 2 === 0 && str.match(/^[0-9a-f]+$/i)) return true;
  return false;
}

/**
 * Validate string input whether it is a valid public key string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
util.isPublicKey = (s) => {
  if (!util.isHexString(s)) {
    throw new Error('Public Key is not a valid Hex String')
  }

  return s.length === _PUBKEY_LENGTH;
}

/**
 * Validate string input whether it is a valid private key string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
util.isPrivateKey = (s) => {
  if (!util.isHexString(s)) {
    throw new Error('Private Key is not a valid Hex String')
  }

  return s.length === _PRIVKEY_LENGTH;
}

/**
 * Validate string input whether it is a valid seed hash string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
util.isSeedHash = (s) => {
  if (!util.isHexString(s)) {
    throw new Error('Private Key is not a valid Hex String')
  }

  return s.length === _SEEDHASH_LENGTH;
}

/**
 * convert Hex String to Bytes
 * @param {String} hexStr [A hex string as input]
 * @returns {String}
 */
util.hexStringToBytes = (hexStr) => {
  if (!util.isHexString(hexStr)) {
    throw new Error('String is not a valid Hex String')
  }
  for (var bytes = [], c = 0; c < hexStr.length; c += 2) {
    bytes.push(parseInt(hexStr.substr(c, 2), 16));
  }
  return bytes;
}

/**
 * convert Bytes to Hex String with uppercase
 * @param {Buffer} byteArray [An array of bytes]
 * @returns {String}
 */
util.bytesToHexUpperString = (byteArray) => {
  return new Buffer(byteArray).toString('hex').toUpperCase();
}

/**
 * Convert given string to buffer based on encoding
 * @param {String} str [a string]
 * @param {String} enc [Encoding method for converting string to buffer]
 */
util.strToBuffer =  (str, enc) => {
  if (!str || str.constructor !== String) {
    throw new Error('Input string is not a valid string');
  }
  if (!enc && util.isHexString(str)) enc = 'hex';
  return Buffer.from(str, enc);
}

/**
 * Convert a hex-encoded string to UTF-16.
 * @param {String|Buffer} input Hex-encoded string.
 * @return {String} UTF16-LE string.
 */
util.hexToUtf16le =  (input) => {
  input = util.strToBuffer(input, 'hex');
  if (input.length % 2 !== 0) {
    throw new Error('Can\'t convert input to UTF-16: invalid length');
  }
  return input.toString('utf16le');
}

module.exports = util;