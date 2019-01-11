'use strict'

var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var globalOrWindow = (typeof window !== 'undefined' ? window : global);
var igcTd = (typeof window !== 'undefined' ? window : require('./gallactic.td'))._gcTd;

const length = {
  publicKey: 51,
  privateKey: 95,
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
  if (!test.function || !test.data) {
    throw new Error('"runTest" require test function and data in order to run the test');
  }

  if (test.data.length === count) {
    return done();
  }

  if (typeof process !== 'undefined') {
    process.stdout.write(`Testing case number: ${count}\r`);
  }

  let beforeTest = test.before ? test.before(test.data[count].input) : null;
  let res = beforeTest && typeof beforeTest.then === 'function' ?
    beforeTest.then(() => test.function(test.data[count].input)) :
    test.function(test.data[count].input);

  if (res && typeof res.then === 'function') {
    res
      .then(output => {
        if (test.validate) test.validate(res);
        if (test.data[count].validate) {
          test.data[count].validate(output, test.data[count].input, count);
        }
        globalOrWindow.runTest(test, done, ++count);
      })
      .catch(e => {
        console.log(`   Testing case number: ${count}`);
        done(e);
      });
  } else {
    try {
      if (test.validate) test.validate(res, test.data[count].input, count);
      if (test.data[count].validate) {
        test.data[count].validate(res, test.data[count].input, count);
      }
      globalOrWindow.runTest(test, done, ++count);
    } catch (e) {
      console.log(`   Testing case number: ${count}`);
      done(e);
    }
  }
};

describe('GallacticKeys', function () {
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
    test.data = igcTd.create.valid;

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
    test.data = igcTd.create.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('exportAc - should return export key info to keystore "secret-storage" format', function (done) {
    this.timeout(60000);

    let test = {
      function: (input) => {
        let result = gallactickeys.exportAc(input.password, input.privateKey, input.salt, input.iv, input.option);
        return result;
      },
      validate: (output) => {
        expect(output.address).to.exist;
        expect(output.crypto).to.exist;
        expect(output.crypto.cipher).to.exist;
        expect(output.crypto.ciphertext).to.exist;
        expect(output.crypto.cipherparams).to.exist;
        expect(output.crypto.cipherparams.iv).to.exist;
        expect(output.crypto.mac).to.exist;
        expect(output.crypto.kdf).to.exist;
        expect(output.crypto.kdfparams).to.exist;
        expect(output.crypto.kdfparams.dklen).to.exist;
        expect(output.crypto.kdfparams.salt).to.exist;
        if (output.crypto.kdf==='pbkdf2') {
          expect(output.crypto.kdfparams.c).to.exist;
          expect(output.crypto.kdfparams.prf).to.exist;
        }
        else {
          expect(output.crypto.kdfparams.n).to.exist;
          expect(output.crypto.kdfparams.r).to.exist;
          expect(output.crypto.kdfparams.p).to.exist;
        }

        expect(output.address).to.be.a('string');
        expect(output.crypto).to.be.an('object');
        expect(output.crypto.cipher).to.be.a('string');
        expect(output.crypto.ciphertext).to.be.a('string');
        expect(output.crypto.cipherparams.iv).to.be.a('string');
        expect(output.crypto.mac).to.be.a('string');
        expect(output.crypto.kdfparams).to.be.an('object');
        expect(output.crypto.kdfparams.dklen).to.be.a('number');
        expect(output.crypto.kdfparams.salt).to.be.a('string');
        expect(output.crypto.kdfparams).to.be.an('object');
        if (output.crypto.kdf==='pbkdf2'){
          expect(output.crypto.kdfparams.c).to.be.a('number');
          expect(output.crypto.kdfparams.prf).to.be.a('string');
        }
        else if (output.crypto.kdf==='scrypt'){
          expect(output.crypto.kdfparams.n).to.be.a('number');
          expect(output.crypto.kdfparams.r).to.be.a('number');
          expect(output.crypto.kdfparams.p).to.be.a('number');
        }
        expect(output.crypto.kdfparams.dklen).to.be.a('number');
        expect(output.crypto.kdfparams.salt).to.be.a('string');
      }
    };
    test.data = igcTd.export.valid;
    globalOrWindow.runTest(test, done);
  });

  it('exportAc - should throw an error, provided incorrect parameters as input', function (done) {
    this.timeout(10000);

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
    test.data = igcTd.export.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('exportVa - should return export key info to keystore "secret-storage" format', function (done) {
    this.timeout(60000);

    let test = {
      function: (input) => {
        let result = gallactickeys.exportVa(input.password, input.privateKey, input.salt, input.iv, input.option);
        return result;
      },
      validate: (output) => {

      }
    };
    test.data = igcTd.export.valid;
    globalOrWindow.runTest(test, done);
  });

  it('exportVa - should throw an error, provided incorrect parameters as input', function (done) {
    this.timeout(10000);

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
    test.data = igcTd.export.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('recover - should return the "plain-text" format of the private key', function (done) {
    let test = {
      function: (input) => {
        let result = gallactickeys.recover(input.password, input.keyObject);
        return result;
      },
      validate: (output) => {
        expect(output).to.be.exist;
        expect(output).to.be.a('string');
      }
    }
    test.data = igcTd.recover.valid;
    globalOrWindow.runTest(test, done);
  });

  it('recover - should throw an error, provided incorrect parameters as input', function (done) {
    this.timeout(60000);

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
    test.data = igcTd.recover.invalid;
    globalOrWindow.runTest(test, done);
  });

  it('getAccountByPrivkey - should return the account object with privatekey, public key and address', function (done) {

    const test = {
      function: (input) => {
        let result = gallactickeys.getAccountByPrivkey(input.privateKey);
        return result;
      },
      validate: (output) => {
        expect(output.privateKey).to.exist;
        expect(output).to.be.an('object');
      }
    }
    test.data = igcTd.inspect.valid;
    globalOrWindow.runTest(test, done);
  });

  it('getAccountByPrivkey - should throw an error, provided incorrect privatekey as input', function (done) {

    let test = {
      function: (input) => {
        try {
          let result = gallactickeys.getAccountByPrivkey(input.privateKey);
          return result;
        }
        catch (e) {
          return e;
        }
      },
      validate: (output) => {

      }
    }
    test.data = igcTd.inspect.invalid;
    globalOrWindow.runTest(test, done);
  });
});
