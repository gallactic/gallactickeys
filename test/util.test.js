'use strict'

var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var globalOrWindow = (typeof window !== 'undefined' ? window : global);
var testData = (typeof window !== 'undefined' ? window : require('./util.td')).utilTd;

describe('GallacticKeys - utils', function () {
  it('should have util object', function () {
    expect(gallactickeys.utils.util).to.be.an('object');
  });

  it('should have crypto object', function () {
    expect(gallactickeys.utils.crypto).to.be.an('object');
  });

  it('should have util object', function () {
    expect(gallactickeys.utils.mnemonic).to.be.an('object');
  });
});

describe('GallacticKeys - utils - util', function () {
  const util = gallactickeys.utils.util;

  it('"isHexString" should return true given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', function () {
    expect(util.isHexString('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B')).to.equal(true);
  });

  it('"isPublicKey" should return true given 774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08', function () {
    expect(util.isPublicKey('774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08')).to.equal(true);
  });

  it('"isPrivateKey" should return true given 8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08', function () {
    expect(util.isPrivateKey('8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08'))
      .to.equal(true);
  });

  it('"isAddress" should return true given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', function () {
    expect(util.isAddress('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B'))
      .to.equal(true);
  });

  it('"isSeedHash" should return true given 8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D', function () {
    expect(util.isSeedHash('8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D'))
      .to.equal(true);
  });

  it('"hexStringToBytes" should return Buffer format given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', function () {
    expect(util.hexStringToBytes('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B'))
      .to.be.an('array')
  });

  it('"bytesToHexUpperString" should return Hex String given random bytes', function () {
    let hexString = util.bytesToHexUpperString(gallactickeys.utils.crypto.generateIv(10));
    expect(hexString).to.be.a('string');
    expect(util.isHexString(hexString)).to.equal(true);
  });

  it('"strToBuffer" should return buffer given random string', function () {
    expect(typeof util.strToBuffer('somethinghere')).to.equal('object');
  });

  it('"hexToUtf16le" should return String given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', function () {
    expect(util.hexToUtf16le('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B'))
      .to.be.a('string');
  });
});

describe('GallacticKeys - utils - crypto', function () {
  const util = gallactickeys.utils.util;
  const crypto = gallactickeys.utils.crypto;
  it('should have "hashSeed" function', () => expect(crypto.hashSeed).to.be.a('function'));
  it('should have "makeKeyPair" function', () => expect(crypto.makeKeyPair).to.be.a('function'));
  it('should have "deriveKey" function', () => expect(crypto.deriveKey).to.be.a('function'));
  it('should have "marshal" function', () => expect(crypto.marshal).to.be.a('function'));
  it('should have "encrypt" function', () => expect(crypto.encrypt).to.be.a('function'));
  it('should have "decrypt" function', () => expect(crypto.decrypt).to.be.a('function'));
  it('should have "getAddressByPubKey" function', () => expect(crypto.getAddressByPubKey).to.be.a('function'));
  it('should have "getAddressByPrivKey" function', () => expect(crypto.getAddressByPrivKey).to.be.a('function'));
  it('should have "getAcAddrByPrivKey" function', () => expect(crypto.getAcAddrByPrivKey).to.be.a('function'));
  it('should have "getVaAddrByPrivKey" function', () => expect(crypto.getVaAddrByPrivKey).to.be.a('function'));
  it('should have "getPubKeyByPrivKey" function', () => expect(crypto.getPubKeyByPrivKey).to.be.a('function'));
  it('should have "encodeAddress" function', () => expect(crypto.encodeAddress).to.be.a('function'));
  it('should have "isCipherAvailable" function', () => expect(crypto.isCipherAvailable).to.be.a('function'));
  it('should have "makeKeyPairFromSeed" function', () => expect(crypto.makeKeyPairFromSeed).to.be.a('function'));
  it('should have "createMac" function', () => expect(crypto.createMac).to.be.a('function'));
  it('should have "generateSalt" function', () => expect(crypto.generateSalt).to.be.a('function'));
  it('should have "generateIv" function', () => expect(crypto.generateIv).to.be.a('function'));

  it('"hashSeed" should return 32 bytes of hex string given a mnemonic', function () {
    let seed = 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
    expect(util.isSeedHash(crypto.hashSeed(seed))).to.equal(true);
  });

  it('"makeKeyPair" should return a key pair object given a seed hash', function () {
    var makeKeyPairObj = crypto.makeKeyPair(testData.seedHash.valid);
    var pubKey = makeKeyPairObj.publicKey;
    var privKey = makeKeyPairObj.privateKey;
    expect(makeKeyPairObj).to.be.an('object');
    expect(pubKey).to.exist;
    expect(privKey).to.exist;
    expect(pubKey.length).to.equal(32);
    expect(privKey.length).to.equal(64);
  });

  it('"makeKeyPair" should throw an error given an invalid seed hash', function (done) {
    let test = {
      function: (input) => {
        try {
          return crypto.makeKeyPair(input);
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        expect(output).to.be.an('error');
      }
    };
    test.data = testData.seedHash.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"deriveKey" should return secret key given password', function () {
    expect(typeof crypto.deriveKey('password', 'somesalt', { kdf: 'pbkdf2' }))
      .to.equal('object');
  });

  it('"marshal" should return a keystore object given derivedKey, privatekey, salt and iv', function () {
    let data = {
      derivedKey: crypto.generateIv(16),
      privateKey: '8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08',
      iv: crypto.generateSalt(16),
      salt: crypto.generateIv(16),
      type: 1,
      opt: { kdf: 'pbkdf2' }
    }
    expect(crypto.marshal(data.derivedKey, data.privateKey, data.salt, data.iv, data.type, data.opt))
      .to.be.an('object');
  });

  it('"encrypt" should return encryption buffer given text, key and iv', function () {
    let data = {
      text: 'some text here',
      key: crypto.generateIv(16),
      iv: crypto.generateSalt(16)
    }
    expect(typeof crypto.encrypt(data.text, data.key, data.iv)).to.equal('object');
  });

  it('"decrypt" should return private key buffer given ciphertext, key, iv and algorithm', function () {
    let data = {
      ciphertext: 'cipheredtexthere',
      key: crypto.generateIv(16), // the use of generateIv here is just to create random bytes
      iv: crypto.generateSalt(16)
    }
    expect(typeof crypto.decrypt(data.ciphertext, data.key, data.iv))
      .to.equal('object');
  });

  it('"getAddressByPubKey" should return a 40-byte address, given a valid Public Key ', function (done) {
    var address = crypto.getAddressByPubKey(testData.keys.publicKey.valid);
    expect(address).to.exist;
    expect(address.length).to.equal(40);
    expect(util.isHexString(address)).to.be.true;
    done();
  });


  it('"getAddressByPubKey" should throw an error, given an invalid Public Key ', function (done) {
    let test = {
      function: (input) => {
        try {
          return crypto.getAddressByPubKey(input);
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        expect(output).to.be.an('error');
      }
    };

    test.data = testData.keys.publicKey.invalid;
    globalOrWindow.runTest(test, done);
  });


  it('"getAddressByPrivKey" should return a 40-byte address, given a valid Private Key (64-bytes Hex String)', function (done) {
    var address = crypto.getAddressByPrivKey(testData.keys.privateKey.valid);
    expect(address).to.exist;
    expect(address.length).to.equal(40);
    expect(util.isHexString(address)).to.be.true;
    done();
  });

  it('"getAddressByPrivKey" should throw an error, given an invalid Prvate Key', function (done) {
    let test = {
      function: (input) => {
        try {
          return crypto.getAddressByPrivKey(input);
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        expect(output).to.be.an('error');
      }
    };

    test.data = testData.keys.privateKey.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"encodeAddress", should return the encoded address based on given address and option', function (done) {
    const test = {
      function: function (data) {
        try {
          let res = crypto.encodeAddress(data.address, data.type);
          return res;
        } catch (e) {
          return e;
        }
      },
      validate: function (res) {
        if (!res instanceof Error) expect(res).to.be.a('string');
      }
    }
    test.data = [{
      input: {
        address: '6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC',
        type: 1
      },
      validate: function (res) {
        expect(res).to.equal('acHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds');
      }
    }, {
      input: {
        address: '6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC',
        type: 2
      },
      validate: function (res) {
        expect(res).to.equal('vaLg1Q47gZ1njdpWsbVjnxTiE8Kjbwn1Bvu');
      }
    }, {
      input: {
        address: '6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC',
        option: {}
      },
      validate: function (res) {
        expect(res instanceof Error).to.equal(true);
      }
    }];
    globalOrWindow.runTest(test, done);
  });

  it('"isCipherAvailable" should return true, provided a valid cipher name', function (done) {
    var cipher = crypto.isCipherAvailable(testData.cipher.valid);
    expect(cipher).to.be.true;
    done();
  });

  it('"isCipherAvailable" should return false, provided an invalid cipher name', function (done) {

    let test = {
      function: (input) => {
        try {
          return crypto.isCipherAvailable(input);
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    };

    test.data = testData.cipher.invalid;
    globalOrWindow.runTest(test, done);
  });
  it('"makeKeyPairFromSeed" should return a buffer object, provided a valid buffer', function (done) {
    const test = {
      function: (input) => {
        let result = crypto.makeKeyPairFromSeed(input.buffer);
        return result;
      },
      validate: (output) => {
        var pubKey = output.publicKey;
        var privKey = output.secretKey;
        expect(pubKey).to.exist;
        expect(privKey).to.exist;
        expect(pubKey.length).to.equal(32);
        expect(privKey.length).to.equal(64);
      }
    }
    test.data = testData.makeKeyPairFromSeed.valid;
    globalOrWindow.runTest(test, done)

  });

  it('"makeKeyPairFromSeed" should throw and error, provided an invalid buffer', function (done) {
    const test = {
      function: (input) => {
        try {
          let result = crypto.makeKeyPairFromSeed(input.buffer);
          return result;
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        expect(output).to.be.an('error');
      }
    }
    test.data = testData.makeKeyPairFromSeed.invalid;
    globalOrWindow.runTest(test, done)

  });

  it('"createMac" should return Hex string of mac given derivedKey and cipherText', function () {
    let data = {
      derivedKey: crypto.generateIv(16),
      ciphertext: 'someciphertexthere'
    };

    expect(crypto.createMac(data.derivedKey, data.ciphertext)).to.be.a('string');
  });

  it('"generateSalt" should return a buffer object, provided a valid numeric size >=0', function (done) {
    const test = {
      function: (input) => {
        let result = crypto.generateSalt(input);
        return result;
      },
      validate: (output) => {
        expect(typeof output).to.equal('object');
      }
    }
    test.data = testData.sizeGenerateSalt.valid;
    globalOrWindow.runTest(test, done)
  });

  it('"generateSalt" should return an error, provided a non-numeric or value < 0 as input', function (done) {
    const test = {

      function: (input) => {
        try {
          let result = crypto.generateSalt(input);
          return result;
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    }
    test.data = testData.sizeGenerateSalt.invalid;
    globalOrWindow.runTest(test, done)
  });

  it('"generateIv" should return a buffer object, provided a valid numeric size >=0', function (done) {
    const test = {
      function: (input) => {
        let result = crypto.generateIv(input);
        return result;
      },
      validate: (output) => {
        expect(typeof output).to.equal('object');
      }
    }
    test.data = testData.sizeGenerateIv.valid;
    globalOrWindow.runTest(test, done)
  });

  it('"generateIv" should return an error, provided a non-numeric or value < 0 as input', function (done) {
    const test = {

      function: (input) => {
        try {
          let result = crypto.generateIv(input);
          return result;
        } catch (e) {
          return e;
        }
      },
      validate: (output) => {
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    }
    test.data = testData.sizeGenerateIv.invalid;
    globalOrWindow.runTest(test, done)
  });
});