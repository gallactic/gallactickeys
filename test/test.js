'use strict'

var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var globalOrWindow = (typeof window !== 'undefined' ? window : global);
/**
 * Helper function too do test in a waterfall sequence manner for
 * this handle asynchronous tests that returns promise or synchronous test
 * @param {Array} test [An array of object that contains "function", "data"]
 * @param {Function} test.function [A function that executes the test. it take test.input]
 * @param {Object} test.data.input [An object that contains test input value]
 * @param {Function} test.data.validate [A validator function to validate the test]
 * @param {Function} done [a callback to report mocha that the running test is completed]
 * @param {Integer} count [a counter value of running test]
 */
globalOrWindow.runTest = function (test, done, count = 0) {
  if (test.data.length === count) {
    return done();
  }

  let beforeTest = test.before ? test.before() : null;
  let res = beforeTest && typeof beforeTest.then === 'function' ?
    beforeTest.then(() => test.function(test.data[count].input)) :
    test.function(test.data[count].input);
  if (res.then && typeof res.then === 'function') {
    res
      .then(output => {
        test.validate(output);
        if (test.data[count].validate) {
          test.data[count].validate(output);
        }
        globalOrWindow.runTest(test, done, ++count);
      })
      .catch(done);
  } else {
    test.validate(res);
    if (test.data[count].validate) {
      test.data[count].validate(res);
    }
    globalOrWindow.runTest(test, done, ++count);
  }
};

describe('GallacticKeys', function () {
  this.timeout(5000);
  it('create - should return expected response', function () {
    var testData = [{
      input: {
        seed: 'shadow outside hint dish fortune boss oak album gym all mask there'
      },
      res: {
        seed: 'shadow outside hint dish fortune boss oak album gym all mask there',
        seedHashed: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9',
        keyPair: {
          publicKey: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
          privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE'
        }
      }
    }, {
      input: {
        seed: 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
      },
      res: {
        seed: 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect',
        seedHashed: '8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D',
        keyPair: {
          publicKey: '774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08',
          privateKey: '8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08'
        }
      }
    }, {
      input: {},
      res: {
        keyPair: {}
      }
    }]

    testData.forEach(e => {
      let result = gallactickeys.create(e.input);
      expect(result.seed).to.equal(e.res.seed || result.seed);
      expect(result.seedHashed).to.equal(e.res.seedHashed || result.seedHashed)
      expect(result.keyPair.publicKey).to.equal(e.res.keyPair.publicKey || result.keyPair.publicKey);
      expect(result.keyPair.privateKey).to.equal(e.res.keyPair.privateKey || result.keyPair.privateKey);
    });
  });

  it('export - should return export key info to keystore "secret-storage" format', function () {
    var testData = [{
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      res: {
        address: '008aeeda4d805471df9b2a5b0f38a0c3bcba786b',
        crypto: {
          cipher: 'aes-128-ctr',
          cipherparams: {
            iv: 'd32116e6157fde33fa0c7e0e4001e145'
          },
          mac: 'ed9d66f2c1ade5fdaa4516cc5839c6533e3395afcad028941e87dd7a3bbd6851',
          kdf: 'pbkdf2',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256',
            salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
          }
        }
      }
    }];

    testData.forEach(e => {
      let result = gallactickeys.export(e.input.password, e.input.privateKey, e.input.salt, e.input.iv, e.input.option);

      expect(result.crypto.cipher).to.equal(e.res.crypto.cipher);
      expect(result.crypto.cipherparams.iv).to.equal(e.res.crypto.cipherparams.iv);
      expect(result.crypto.mac).to.equal(e.res.crypto.mac);
      expect(result.crypto.kdf).to.equal(e.res.crypto.kdf);
      expect(result.crypto.kdfparams.c).to.equal(e.res.crypto.kdfparams.c);
      expect(result.crypto.kdfparams.dklen).to.equal(e.res.crypto.kdfparams.dklen);
      expect(result.crypto.kdfparams.prf).to.equal(e.res.crypto.kdfparams.prf);
      expect(result.crypto.kdfparams.salt).to.equal(e.res.crypto.kdfparams.salt);
    })
  })

  it('recover - should return the "plain-text" format of the private key', function () {
    var testData = [{
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: '6CE3E09C9D1234AD74BFDF57E20DB4F07A56E1',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          },
          id: 'uuid.v4()',
          version: 3
        }
      },
      res: {
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE'
      }
    }];

    testData.forEach(e => {
      let result = gallactickeys.recover(e.input.password, e.input.keyObject);
      expect(result).to.equal(e.res.privateKey);
    })
  });
});
