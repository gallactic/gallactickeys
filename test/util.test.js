'use strict'

var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;

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
  it('should have "hashSeed" function', () => expect(crypto.hashSeed).to.be.a('function'))
  it('should have "makeKeyPair" function', () => expect(crypto.makeKeyPair).to.be.a('function'))
  it('should have "deriveKey" function', () => expect(crypto.deriveKey).to.be.a('function'))
  it('should have "marshal" function', () => expect(crypto.marshal).to.be.a('function'))
  it('should have "encrypt" function', () => expect(crypto.encrypt).to.be.a('function'))
  it('should have "decrypt" function', () => expect(crypto.decrypt).to.be.a('function'))
  it('should have "getAddressByPubKey" function', () => expect(crypto.getAddressByPubKey).to.be.a('function'))
  it('should have "getAddressByPrivKey" function', () => expect(crypto.getAddressByPrivKey).to.be.a('function'))
  it('should have "getAddressByPrivKey" function', () => expect(crypto.getAddressByPrivKey).to.be.a('function'))
  it('should have "isCipherAvailable" function', () => expect(crypto.isCipherAvailable).to.be.a('function'))
  it('should have "makeKeyPairFromSeed" function', () => expect(crypto.makeKeyPairFromSeed).to.be.a('function'))
  it('should have "createMac" function', () => expect(crypto.createMac).to.be.a('function'))
  it('should have "generateSalt" function', () => expect(crypto.generateSalt).to.be.a('function'))
  it('should have "generateIv" function', () => expect(crypto.generateIv).to.be.a('function'))

  it('"hashSeed" should return 32 bytes of hex string given a mnemonic', function () {
    let seed = 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
    expect(util.isSeedHash(crypto.hashSeed(seed))).to.equal(true);
  })
  it('"makeKeyPair" should return a key pair object given a seed')
  it('"deriveKey" should return secret key given password', function () {
    expect(typeof crypto.deriveKey('password', 'somesalt', { kdf: 'pbkdf2' }))
      .to.equal('object');
  })
  it('"marshal" should return a keystore object given derivedKey, privatekey, salt and iv', function () {
    let data = {
      derivedKey: crypto.generateIv(16),
      privateKey: '8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08',
      iv: crypto.generateSalt(16),
      salt: crypto.generateIv(16),
      opt: { kdf: 'pbkdf2' }
    }
    expect(crypto.marshal(data.derivedKey, data.privateKey, data.salt, data.iv, data.opt))
      .to.be.an('object');
  })
  it('"encrypt" should return encryption buffer given text, key and iv', function () {
    let data = {
      text: 'some text here',
      key: crypto.generateIv(16),
      iv: crypto.generateSalt(16)
    }
    expect(typeof crypto.encrypt(data.text, data.key, data.iv))
      .to.equal('object');
  })
  it('"decrypt" should return private key buffer given ciphertext, key, iv and algorithm', function () {
    let data = {
      ciphertext: 'cipheredtexthere',
      key: crypto.generateIv(16), // the use of generateIv here is just to create random bytes
      iv: crypto.generateSalt(16)
    }
    expect(typeof crypto.decrypt(data.ciphertext, data.key, data.iv))
      .to.equal('object');
  })
  it('"getAddressByPubKey" should return ')
  it('"getAddressByPrivKey" should return ')
  it('"getAddressByPrivKey" should return ')
  it('"isCipherAvailable" should return ')
  it('"makeKeyPairFromSeed" should return ')
  it('"createMac" should return Hex string of mac given derivedKey and cipherText', function () {
    let data = {
      derivedKey: crypto.generateIv(16),
      ciphertext: 'someciphertexthere'
    };

    expect(crypto.createMac(data.derivedKey, data.ciphertext)).to.be.a('string');
  })
  it('"generateSalt" should return ')
  it('"generateIv" should return ')
});