'use strict';

const bip39 = require('bip39'),
  mnemonic = {};

/**
 * Generate Mnemonic string with around 12 words
 * @returns {String} [A sentence made of random words]
 */
mnemonic.makeMnemonic = () => {
  return bip39.generateMnemonic();
}

module.exports = mnemonic