'use strict'

var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var globalOrWindow = (typeof window !== 'undefined' ? window : global);
var utilTd = (typeof window !== 'undefined' ? window : require('./util.td'))._utilTd;

describe('GallacticKeys - utils', () => {
  it('should have util object', () => {
    expect(gallactickeys.utils.util).to.be.an('object');
  });

  it('should have crypto object', () => {
    expect(gallactickeys.utils.crypto).to.be.an('object');
  });

  it('should have util object', () => {
    expect(gallactickeys.utils.mnemonic).to.be.an('object');
  });
});

describe('GallacticKeys - utils - util', () => {
  const util = gallactickeys.utils.util;

  it('"isHexString" should return true given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', () => {
    expect(util.isHexString('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B')).to.equal(true);
  });

  it('"isPublicKey" should return true given 774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08', () => {
    expect(util.isPublicKey('774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08')).to.equal(true);
  });

  it('"isPrivateKey" should return true given 8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08', () => {
    expect(util.isPrivateKey('8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08'))
      .to.equal(true);
  });

  it('"isSeedHash" should return true given 8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D', () => {
    expect(util.isSeedHash('8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D'))
      .to.equal(true);
  });

  it('"hexStringToBytes" should return Buffer format given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', () => {
    expect(util.hexStringToBytes('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B'))
      .to.be.an('array')
  });

  it('"bytesToHexUpperString" should return Hex String given random bytes', () => {
    let hexString = util.bytesToHexUpperString(gallactickeys.utils.crypto.generateIv(10));
    expect(hexString).to.be.a('string');
    expect(util.isHexString(hexString)).to.equal(true);
  });

  it('"strToBuffer" should return buffer given random string', () => {
    expect(typeof util.strToBuffer('somethinghere')).to.equal('object');
  });

  it('"hexToUtf16le" should return String given 008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B', () => {
    expect(util.hexToUtf16le('008AEEDA4D805471DF9B2A5B0F38A0C3BCBA786B'))
      .to.be.a('string');
  });

  it('"padToEven" should pad odd string length ("something") to have even length', ()=> {
    expect(util.padToEven('something').length).to.equal(10);
  });

  it('"intToHex" should convert 210123 into hex string', () => {
    expect(util.intToHex(210123)).to.equal('0334cb');
  });

  it('"intToBuffer" should convert 210123 to buffer', () => {
    expect(util.intToBuffer(210123) instanceof Uint8Array).to.equal(true);
  });

  it('"toBuffer" should convert values to buffer', (done) => {
    const test = {
      function: (input) => {
        return util.toBuffer(input.value);
      },
      validate: (output) => {
        expect(output instanceof Uint8Array).to.equal(true);
      }
    };

    test.data = utilTd.toBuffer.valid;

    globalOrWindow.runTest(test, done);
  });

  it('"toBuffer" should throw error given invalid input', (done) => {
    const test = {
      function: (input) => {
        try { return util.toBuffer(input.value); }
        catch (e) { return e; }
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
      }
    };

    test.data = utilTd.toBuffer.invalid;

    globalOrWindow.runTest(test, done);
  });

  it('"isHexPrefixed" should return boolean if string starts with "0x"', () => {
    expect(util.isHexPrefixed('0xsomething')).to.equal(true);
  });

  it('"stripHexPrefix" should remove "0x" from a given string', () => {
    expect(util.stripHexPrefix('0xsomething')).to.equal('something');
  });

  it('"zeros" should return a buffer with leading 0s', () => {
    expect(util.zeros(30).toString('hex')).to.equal('000000000000000000000000000000000000000000000000000000000000')
  });

  it('"stripZeros" should trims leading zeros given input', () => {
    expect(util.stripZeros('0000000000000000000000000000000000000000000000000000000000000032'))
      .to.equal('32');
  });

  it('"setLengthLeft" should pad given value with zeros till it has required length in bytes', () => {
    expect(util.setLengthLeft('ABCD', 10, false).toString('hex')).to.equal('00000000000041424344');
  });

  it('"setLengthRight" should pad given value with zeros till it has required length in bytes', () => {
    expect(util.setLengthLeft('ABCD', 10, true).toString('hex')).to.equal('41424344000000000000');
  });
});

describe('GallacticKeys - utils - crypto', function () {
  const util = gallactickeys.utils.util;
  const crypto = gallactickeys.utils.crypto;
  it('should have "hashSeed" function', () => expect(crypto.hashSeed).to.be.a('function'));
  it('should have "hashAddr" function', () => expect(crypto.hashAddr).to.be.a('function'));
  it('should have "sha3" function', () => expect(crypto.sha3).to.be.a('function'));
  it('should have "makeKeyPair" function', () => expect(crypto.makeKeyPair).to.be.a('function'));
  it('should have "deriveKey" function', () => expect(crypto.deriveKey).to.be.a('function'));
  it('should have "pbkdf2Dk" function', () => expect(crypto.pbkdf2Dk).to.be.a('function'));
  it('should have "scryptDk" function', () => expect(crypto.scryptDk).to.be.a('function'))
  it('should have "marshal" function', () => expect(crypto.marshal).to.be.a('function'));
  it('should have "encrypt" function', () => expect(crypto.encrypt).to.be.a('function'));
  it('should have "decrypt" function', () => expect(crypto.decrypt).to.be.a('function'));
  it('should have "getAddressByPubKey" function', () => expect(crypto.getAddressByPubKey).to.be.a('function'));
  it('should have "getAddressByPrivKey" function', () => expect(crypto.getAddressByPrivKey).to.be.a('function'));
  it('should have "getAcAddrByPrivKey" function', () => expect(crypto.getAcAddrByPrivKey).to.be.a('function'));
  it('should have "getVaAddrByPrivKey" function', () => expect(crypto.getVaAddrByPrivKey).to.be.a('function'));
  it('should have "getPubKeyByPrivKey" function', () => expect(crypto.getPubKeyByPrivKey).to.be.a('function'));
  it('should have "encodeAddress" function', () => expect(crypto.encodeAddress).to.be.a('function'));
  it('should have "decodeAddress" function', () => expect(crypto.decodeAddress).to.be.a('function'));
  it('should have "isCipherAvailable" function', () => expect(crypto.isCipherAvailable).to.be.a('function'));
  it('should have "makeKeyPairFromSeed" function', () => expect(crypto.makeKeyPairFromSeed).to.be.a('function'));
  it('should have "createMac" function', () => expect(crypto.createMac).to.be.a('function'));
  it('should have "isAddress" function', () => expect(crypto.isAddress).to.be.a('function'));
  it('should have "isTmAddress" function', () => expect(crypto.isTmAddress).to.be.a('function'));
  it('should have "isAcAddress" function', () => expect(crypto.isAcAddress).to.be.a('function'));
  it('should have "isVaAddress" function', () => expect(crypto.isVaAddress).to.be.a('function'));
  it('should have "generateSalt" function', () => expect(crypto.generateSalt).to.be.a('function'));
  it('should have "generateIv" function', () => expect(crypto.generateIv).to.be.a('function'));

  it('"hashSeed" should return 32 bytes of hex string given a mnemonic', function () {
    let seed = 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
    expect(util.isSeedHash(crypto.hashSeed(seed))).to.equal(true);
  });

  it('"hashAddr" should return hashed', function () {
    let seed = 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
    expect(crypto.hashAddr(crypto.hashSeed(seed)) instanceof Uint8Array).to.equal(true);
  });

  it('"sha3" should return hashed string', function () {
    let seed = 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
    let result = '0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e';
    expect(crypto.sha3(seed)).to.equal(result);
  });

  it('"makeKeyPair" should return a key pair object given a seed hash', function () {
    var makeKeyPairObj = crypto.makeKeyPair(utilTd.seedHash.valid);
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
        expect(output instanceof Error).to.equal(true);
      }
    };
    test.data = utilTd.seedHash.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"deriveKey" should return secret key in buffer format given password', function (done) {
    this.timeout(60000)
    const test = {
      function: (input) => {
        return crypto.deriveKey(input.password, input.salt, input.option);
      },
      validate: (output) => {
        if (typeof window !== undefined) {
          expect(typeof output).to.equal('object');
        } else {
          expect(Buffer.isBuffer(output)).to.equal(true)
        }
      }
    };

    test.data = utilTd.deriveKey.valid;
    globalOrWindow.runTest(test, done);
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
    var address = crypto.getAddressByPubKey(utilTd.keys.publicKey.valid);
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
        expect(output instanceof Error).to.equal(true);
      }
    };

    test.data = utilTd.keys.publicKey.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"getAddressByPrivKey" should return a 40-byte address, given a valid Private Key (64-bytes Hex String)', function (done) {
    var address = crypto.getAddressByPrivKey(utilTd.keys.privateKey.valid);
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
        expect(output instanceof Error).to.equal(true);
      }
    };

    test.data = utilTd.keys.privateKey.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"encodeAddress" should return the encoded address based on given address and option', function (done) {
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

  it('"decodeAddress" should return the decoded address given encoded address', function (done) {
    const test = {
      function: (input) => {
        return crypto.decodeAddress(input.address);
      },
      validate: (output) => { }
    };

    test.data = utilTd.decodeAddress.valid;
    globalOrWindow.runTest(test, done);
  })

  it('"isCipherAvailable" should return true, provided a valid cipher name', function (done) {
    var cipher = crypto.isCipherAvailable(utilTd.cipher.valid);
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

    test.data = utilTd.cipher.invalid;
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
    test.data = utilTd.makeKeyPairFromSeed.valid;
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
        expect(output instanceof Error).to.equal(true);
      }
    }
    test.data = utilTd.makeKeyPairFromSeed.invalid;
    globalOrWindow.runTest(test, done)

  });

  it('"createMac" should return Hex string of mac given derivedKey and cipherText', function () {
    let data = {
      derivedKey: crypto.generateIv(16),
      ciphertext: 'someciphertexthere'
    };

    expect(crypto.createMac(data.derivedKey, data.ciphertext)).to.be.a('string');
  });

  it('"isAddress" should return boolean value based on given address', function(done) {
    const test = {
      function: (input) => {
        return crypto.isAddress(input.address);
      },
      validate: (output) => {
        expect(output).to.equal(true);
      }
    };

    test.data = utilTd.isAddress.valid;
    globalOrWindow.runTest(test, done);
  });

  it('"isAddress" should throw an error based on given invalid address', function(done) {
    const test = {
      function: (input) => {
        try { return crypto.isAddress(input.address); }
        catch (e) { return e; }
      }
    };

    test.data = utilTd.isAddress.valid;
    globalOrWindow.runTest(test, done);
  });

  it('"isTmAddress" should return boolean value based on given address', function(done) {
    const test = {
      function: (input) => {
        return crypto.isTmAddress(input.address);
      },
      validate: (output) => {
        expect(output).to.equal(true);
      }
    };

    test.data = utilTd.isTmAddress.valid;
    globalOrWindow.runTest(test, done);
  });

  it('"isTmAddress" should throw an error based on given invalid tm address', function(done) {
    const test = {
      function: (input) => {
        try { return crypto.isTmAddress(input.address); }
        catch (e) { return e; }
      }
    };

    test.data = utilTd.isTmAddress.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"isAcAddress" should return boolean value based on given address', function(done) {
    const test = {
      function: (input) => {
        return crypto.isAcAddress(input.address);
      },
      validate: (output) => {
        expect(output).to.equal(true);
      }
    };

    test.data = utilTd.isAcAddress.valid;
    globalOrWindow.runTest(test, done);
  });

  it('"isAcAddress" should throw an error based on given invalid ac address', function(done) {
    const test = {
      function: (input) => {
        try { return crypto.isAcAddress(input.address); }
        catch (e) { return e; }
      }
    };

    test.data = utilTd.isAcAddress.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('"isVaAddress" should return boolean value based on given address', function(done) {
    const test = {
      function: (input) => {
        return crypto.isVaAddress(input.address);
      },
      validate: (output) => {
        expect(output).to.equal(true);
      }
    };

    test.data = utilTd.isVaAddress.valid;
    globalOrWindow.runTest(test, done);
  });

  it('"isVaAddress" should return false or error based on given invalid va address', function(done) {
    const test = {
      function: (input) => {
        try { return crypto.isVaAddress(input.address); }
        catch (e) { return e; }
      }
    };

    test.data = utilTd.isVaAddress.invalid;
    globalOrWindow.runTest(test, done);
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
    test.data = utilTd.sizeGenerateSalt.valid;
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
      validate: (output) => {}
    }
    test.data = utilTd.sizeGenerateSalt.invalid;
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
    test.data = utilTd.sizeGenerateIv.valid;
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
      validate: (output) => { }
    }
    test.data = utilTd.sizeGenerateIv.invalid;
    globalOrWindow.runTest(test, done)
  });
});