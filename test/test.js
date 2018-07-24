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

  it('exportAc - should return export key info to keystore "secret-storage" format', function () {
    var testData =
    [{
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
        address: 'acQUFGxsXVPSd6vbAceSkURnWhYhApE9VRe',
        crypto: {
          cipher: 'aes-128-ctr',
          cipherparams: {
            iv: 'd32116e6157fde33fa0c7e0e4001e145'
          },
          mac: '82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe',
          kdf: 'pbkdf2',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256',
            salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
          }
        }
      }
    },
    { // testing without salt and iv provided
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
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
        address: 'acQUFGxsXVPSd6vbAceSkURnWhYhApE9VRe',
        crypto: {
          cipher: 'aes-128-ctr',
          cipherparams: {},
          kdf: 'pbkdf2',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      }
    }];

    testData.forEach(e => {
      let result = gallactickeys.exportAc(
        e.input.password, e.input.privateKey, e.input.salt, e.input.iv, e.input.option
      );

      expect(result.address).to.equal(e.res.address);
      expect(result.crypto.cipher).to.equal(e.res.crypto.cipher);
      if (e.res.crypto.cipherparams.iv)
        expect(result.crypto.cipherparams.iv).to.equal(e.res.crypto.cipherparams.iv);
      if (e.res.crypto.mac)
        expect(result.crypto.mac).to.equal(e.res.crypto.mac);
      expect(result.crypto.kdf).to.equal(e.res.crypto.kdf);
      expect(result.crypto.kdfparams.c).to.equal(e.res.crypto.kdfparams.c);
      expect(result.crypto.kdfparams.dklen).to.equal(e.res.crypto.kdfparams.dklen);
      expect(result.crypto.kdfparams.prf).to.equal(e.res.crypto.kdfparams.prf);
      if (e.res.crypto.kdfparams.salt)
        expect(result.crypto.kdfparams.salt).to.equal(e.res.crypto.kdfparams.salt);
    })
  })

  it('exportVa - should return export key info to keystore "secret-storage" format', function () {
    var testData =
    [{
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
        address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8',
        crypto: {
          cipher: 'aes-128-ctr',
          cipherparams: {
            iv: 'd32116e6157fde33fa0c7e0e4001e145'
          },
          mac: '82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe',
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
      let result = gallactickeys.exportVa(
        e.input.password, e.input.privateKey, e.input.salt, e.input.iv, e.input.option
      );

      expect(result.address).to.equal(e.res.address);
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
    var testData =
    [{
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
            cipherparams: { iv: 'd32116e6157fde33fa0c7e0e4001e145' },
            mac: '82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe',
            kdf: 'pbkdf2',
            kdfparams:
            {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
            }
          }
        }
      },
      res: {
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE'
      }
    },
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'acQUFGxsXVPSd6vbAceSkURnWhYhApE9VRe',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
            cipherparams: { iv: 'd32116e6157fde33fa0c7e0e4001e145' },
            mac: '82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
            }
          }
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
