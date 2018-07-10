'use strict';

const bip39 = require('bip39');

class Mnemonic {
  constructor () {}
  /**
   * Generate Mnemonic string with around 12 words
   */
  static makeMnemonic() {
    return bip39.generateMnemonic();
  }
}

module.exports = Mnemonic