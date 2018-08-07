'use strict'

var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var globalOrWindow = (typeof window !== 'undefined' ? window : global);
var testData = (typeof window !== 'undefined' ? window : require('./intergallactic.td')).igcTd;

const length = {
  publicKey: 64,
  privateKey: 128,
  seedHashed: 64,
  salt: 64,
  iv: 32,
  seed: 12
};

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
  process.stdout.write(`Testing case number: ${count}\r`);

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

  it('create - should return expected response', function (done) {
    const test = {
      function: (input) => {
        let result = gallactickeys.create(input);
        return result;
      },
      validate: (output) => {
        expect(output.seed).to.exist;
        expect(output.seedHashed).to.exist;
        expect(output.keyPair).to.exist;
        expect(output.keyPair.publicKey).to.exist;
        expect(output.keyPair.privateKey).to.exist;
        expect(output.salt).to.exist;
        expect(output.iv).to.exist;

        expect(output.seedHashed.length).to.equal(length.seedHashed);
        expect(output.keyPair.publicKey.length).to.equal(length.publicKey);
        expect(output.keyPair.privateKey.length).to.equal(length.privateKey);
        expect(output.salt.length).to.equal(length.salt);
        expect(output.iv.length).to.equal(length.iv);

        expect(output.seed.split(' ').length).to.equal(length.seed);
      }
    };
    test.data = testData.create.valid;

    globalOrWindow.runTest(test, done);
  });

  it('create - should throw an error, provided a seed with word count NOT EQUAL TO 12', function (done) {
    let test = {
      function: (input) => {
        try {
          let result = gallactickeys.create(input);
          return result;
        }
        catch (e) {
          return e;
        }
      },
      validate: (output) => {

      }

    };
    test.data = testData.create.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('exportAc - should return export key info to keystore "secret-storage" format', function (done) {
    this.timeout(10000);

    let test = {
      function: (input) => {
        let result = gallactickeys.exportAc(input.password, input.privateKey, input.salt, input.iv, input.option);
        return result;
      },
      validate: (output) => {
        expect(output.address).to.exist.and.be.a('string');
        expect(output.crypto).to.exist.and.be.an('object');
        expect(output.crypto.cipher).to.exist.and.be.a('string');
        expect(output.crypto.ciphertext).to.exist.and.be.a('string');
        expect(output.crypto.cipherparams).to.exist;
        expect(output.crypto.cipherparams.iv).to.exist.and.be.a('string');
        expect(output.crypto.mac).to.exist.and.be.a('string');
        expect(output.crypto.kdf).to.exist;
        expect(output.crypto.kdfparams).to.exist.and.be.an('object');
        expect(output.crypto.kdfparams.c).to.exist.and.be.a('number');
        expect(output.crypto.kdfparams.dklen).to.exist.and.be.a('number');
        expect(output.crypto.kdfparams.prf).to.exist.and.be.a('string');
        expect(output.crypto.kdfparams.salt).to.exist.and.be.a('string');
      }
    };
    test.data = testData.export.valid;
    globalOrWindow.runTest(test, done);
  });

  it('exportAc - should throw an error, provided incorrect parameters as input', function (done) {
    let test = {
      function: (input) => {
        try {
          let result = gallactickeys.exportAc(input.password, input.privateKey, input.salt, input.iv, input.option);
          return result;
        }
        catch (e) {
          return e;
        }
      },
      validate: (output) => {

      }
    };
    test.data = testData.export.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('exportVa - should return export key info to keystore "secret-storage" format', function (done) {
    this.timeout(10000);

    let test = {
      function: (input) => {
        let result = gallactickeys.exportVa(input.password, input.privateKey, input.salt, input.iv, input.option);
        return result;
      },
      validate: (output) => {
        // expect(output.address).to.equal('vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8');
      }
    };
    test.data = testData.export.valid;
    globalOrWindow.runTest(test, done);
  });

  it('exportVa - should throw an error, provided incorrect parameters as input', function (done) {
    let test = {
      function: (input) => {
        try {
          let result = gallactickeys.exportVa(input.password, input.privateKey, input.salt, input.iv, input.option);
          return result;
        }
        catch (e) {
          return e;
        }
      },
      validate: (output) => {

      }
    };
    test.data = testData.export.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('recover - should return the "plain-text" format of the private key', function (done) {
    let test = {
      function: (input) => {
        let result = gallactickeys.recover(input.password, input.keyObject);
        return result;
      },
      validate: (output) => {
        expect(output).to.be.exist.and.be.a('string');
      }
    }
    test.data = testData.recover.valid;
    globalOrWindow.runTest(test, done);
  });

  it('recover - should throw an error, provided incorrect parameters as input', function (done) {
    let test = {
      function: (input) => {
        try {
          let result = gallactickeys.recover(input.password, input.keyObject);
          return result;
        }
        catch (e) {
          return e;
        }
      },
      validate: (output) => {

      }
    }
    test.data = testData.recover.invalid;
    globalOrWindow.runTest(test, done);
  });
});
