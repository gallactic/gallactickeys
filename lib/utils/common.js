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
  if (!str) return false;
  if (str.length % 2 === 0 && str.match(/^[0-9a-f]+$/i)) return true;
  return false;
};

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
};

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
};

/**
 * Validate string input whether it is a valid seed hash string
 * @param {String} s [A string input]
 * @returns {Boolean}
 */
util.isSeedHash = (s) => {
  if (!util.isHexString(s)) {
    throw new Error('Seed hash is not a valid Hex String')
  }

  return s.length === _SEEDHASH_LENGTH;
};

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
};

/**
 * convert Bytes to Hex String with uppercase
 * @param {Buffer} byteArray [An array of bytes]
 * @returns {String}
 */
util.bytesToHexUpperString = (byteArray) => {
  return new Buffer(byteArray).toString('hex').toUpperCase();
};

/**
 * Convert given string to buffer based on encoding
 * @param {String} str [a string]
 * @param {String} enc [Encoding method for converting string to buffer]
 */
util.strToBuffer = (str, enc) => {
  if (!str || str.constructor !== String) {
    throw new Error('Input string is not a valid string');
  }
  if (!enc && util.isHexString(str)) enc = 'hex';
  return Buffer.from(str, enc);
};

/**
 * Convert a hex-encoded string to UTF-16.
 * @param {String|Buffer} input Hex-encoded string.
 * @return {String} UTF16-LE string.
 */
util.hexToUtf16le = (input) => {
  input = util.strToBuffer(input, 'hex');
  if (input.length % 2 !== 0) {
    throw new Error('Can\'t convert input to UTF-16: invalid length');
  }
  return input.toString('utf16le');
};

/**
 * Pads a `String` to have an even length
 * @method padToEven
 * @param {String} a
 * @return {String}
 */
util.padToEven = function (a) {
  if (a.length % 2) a = '0' + a;
  return a;
}

/**
 * Converts a `Number` into a hex `String`
 * @method intToHex
 * @param {Number} i
 * @return {String}
 */
util.intToHex = function (i) {
  var hex = i.toString(16);
  if (hex.length % 2) {
    hex = '0' + hex;
  }

  return hex;
};

/**
 * Converts an `Number` to a `Buffer`
 * @method intToBuffer
 * @param {Number} i
 * @return {Buffer}
 */
util.intToBuffer = function (i) {
  var hex = util.intToHex(i);
  return new Buffer(hex.slice(2), 'hex');
}

/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 * @returns {Buffer} buffer value of given input
 */
util.toBuffer = function (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = new Buffer(v);
    } else if (typeof v === 'string') {
      if (util.isHexPrefixed(v)) {
        v = new Buffer(util.padToEven(util.stripHexPrefix(v)), 'hex');
      } else {
        v = new Buffer(v);
      }
    } else if (typeof v === 'number') {
      v = util.intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = new Buffer([]);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = new Buffer(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
};

/**
 * Returns a `Boolean` on whether or not the a `String` starts with "0x"
 * @param {String} str
 * @return {Boolean}
 */
util.isHexPrefixed = function (str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string! unable to proceed.');
  }
  return str.slice(0, 2) === '0x';
};

/**
 * Removes "0x" from a given `String`
 * @param {String} str
 * @return {String}
 */
util.stripHexPrefix = function (str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string! unable to proceed.');
  }
  return util.isHexPrefixed(str) ? str.slice(2) : str;
};

/**
 * Returns a buffer filled with 0s
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
util.zeros = function (bytes) {
  var buf = new Buffer(bytes);
  return buf.fill(0);
};

/**
 * Trims leading zeros from a `Buffer` or an `Array`
 * @param {Buffer|Array|String} a
 * @return {Buffer|Array|String}
 */
util.unpad = util.stripZeros = function (a) {
  a = util.stripHexPrefix(a);
  var first = a[0];
  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1);
    first = a[0];
  }
  return a;
};

/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */
util.setLengthLeft = util.setLength = function (msg, length, right) {
  var buf = util.zeros(length);
  msg = util.toBuffer(msg);

  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }
    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }
    return msg.slice(-length);
  }
};

/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
util.setLengthRight = function (msg, length) {
  return util.setLength(msg, length, true);
};

module.exports = util;