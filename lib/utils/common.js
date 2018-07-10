'use strict';

const constant = require('../constant/global'),
  PUBKEY_LENGTH = constant.keyPair.publicKeyLength, // 32 bytes
  PRIVKEY_LENGTH = constant.keyPair.privateKeyLength, // 64 bytes
  SEEDHASH_LENGTH = constant.keyPair.seedHashLength; // 32 bytes

module.exports = {
  _isHexString, _isPublicKey, _isPrivateKey, _isSeedHash, _hexStringToBytes,
  _bytesToHexUpperString, _strToBuffer, _hexToUtf16le
};

/**
 * This will validate the string input whether it is a valid
 * hex string.
 * @param {String} hexString [A string input]
 * @returns {Boolean}
 */
function _isHexString(str) {
  if (str.length % 2 === 0 && str.match(/^[0-9a-f]+$/i)) return true;
  return false;
}

/**
 * Validate string input whether it is a valid public key string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
function _isPublicKey(s) {
  if (!_isHexString(s)) {
    throw new Error('Public Key is not a valid Hex String')
  }

  return s.length === PUBKEY_LENGTH;
}

/**
 * Validate string input whether it is a valid private key string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
function _isPrivateKey(s) {
  if (!_isHexString(s)) {
    throw new Error('Private Key is not a valid Hex String')
  }

  return s.length === PRIVKEY_LENGTH;
}

/**
 * Validate string input whether it is a valid seed hash string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
function _isSeedHash(s) {
  if (!_isHexString(s)) {
    throw new Error('Private Key is not a valid Hex String')
  }

  return s.length === SEEDHASH_LENGTH;
}

/**
 * convert Hex String to Bytes
 * @param {String} hexStr [A hex string as input]
 * @returns {String}
 */
function _hexStringToBytes(hexStr) {
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
function _bytesToHexUpperString(byteArray) {
  return new Buffer(byteArray).toString('hex').toUpperCase();
}

function _strToBuffer (str, enc) {
  if (!str || str.constructor !== String) {
    throw new Error('Input string is not a valid string');
  }
  if (!enc && _isHexString(str)) enc = 'hex';
  return Buffer.from(str, enc);
}

/**
 * Convert a hex-encoded string to UTF-16.
 * @param {String|Buffer} input Hex-encoded string.
 * @return {String} UTF16-LE string.
 */
function _hexToUtf16le (input) {
  input = this._strToBuffer(input, 'hex');
  if (input.length % 2 !== 0) {
    throw new Error('Can\'t convert input to UTF-16: invalid length');
  }
  return input.toString('utf16le');
}
