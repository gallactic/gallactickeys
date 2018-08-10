'use strict';

var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var gallactickeys = typeof window !== 'undefined' ? window.GallacticKeys : require('../index');

var errorMsg = '';
const util = gallactickeys.utils.util;
const crypto = gallactickeys.utils.crypto;
const seed = {
  valid: 'shadow outside hint dish fortune boss oak album gym all mask there',
  invalid: {
    undefined: undefined,
    empty: '',
    invalidLength1: 'shadow outside hint dish fortune boss oak album gym all mask',
    invalidLength2: 'shadow outside hint dish fortune boss oak album gym all mask there there',
  }
};

const _utilTd = {};
_utilTd.seed = seed;
_utilTd.deriveKey = {
  valid: [
    {
      input: {
        password: 'testPassword',
        salt: 'salt',
        option: { kdf: 'pbkdf2' }
      }
    },
    {
      input: {
        password: 'testPassword',
        salt: 'salt',
        option: {
          kdf: 'pbkdf2',
          c: 2440,
          dklen: 12,
          prf: 'sha256'
        }
      }
    },
    {
      input: {
        password: 'testPassword',
        salt: 'salt',
        option: { kdf: 'scrypt' }
      }
    },
    {
      input: {
        password: 'testPassword',
        salt: 'salt',
        option: { kdf: 'scrypt', n: 2440, r: 6, p: 1, dklen: 12 }
      }
    }
  ]
};
_utilTd.seedHash = {
  valid: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9',
  invalid: [
    {
      // If the seed hash is undefined, it should return error - seed hash is invalid
      input: undefined,
      validate: (output) => {
        errorMsg = 'Seed hash is not a valid Hex String';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      // If the seed hash length is empty, it should return error - seed hash is an invalid Hex String
      input: '',
      validate: (output) => {
        errorMsg = 'Seed hash is not a valid Hex String';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      // If the seed hash length is not even, it should return error - seed hash is an invalid Hex String
      input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100ED809',
      validate: (output) => {
        errorMsg = 'Seed hash is not a valid Hex String';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      // If the seed hash length is not equal to 64 , it should return error - String is an invalid seed hash
      input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100ED',
      validate: (output) => {
        errorMsg = 'String is not a valid seed hash';
        expect(output.message).to.equal(errorMsg);
      }
    }
  ]
};
_utilTd.keys = {
  publicKey: {
    valid: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    invalid: [
      {
        //If Public Key is undefined, it should return an error - Public Key is not a valid Public Key String
        input: undefined,
        validate: (output) => {
          errorMsg = 'Public Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Public Key is empty, it should return an error - Public Key is not a valid Hex String
        input: '',
        validate: (output) => {
          errorMsg = 'Public Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Public Key is not even, it should return an error - Public Key is not a valid Hex String
        input: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1B',
        validate: (output) => {
          errorMsg = 'Public Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Public Key length is not equal to 64, it should return an error - Public Key is not a valid Public Key String
        input: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1',
        validate: (output) => {
          errorMsg = 'given Public Key is not a valid Public Key String';
          expect(output.message).to.equal(errorMsg);
        }
      }
    ],
  },
  privateKey: {
    valid: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    invalid: [
      {
        //If Private Key length is not equal to 128, it should return an error - Private Key is not a valid Private Key String
        input: undefined,
        validate: (output) => {
          errorMsg = 'Private Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Private Key is empty, it should return an error - Private Key is not a valid Hex String
        input: 'Private Key is not a valid Hex String',
        validate: (output) => {
          errorMsg = 'Private Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Private Key is not even, it should return an error - Private Key is not a valid Hex String
        input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1B',
        validate: (output) => {
          errorMsg = 'Private Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Private Key length is not equal to 128, it should return an error - Private Key is not a valid Hex String
        input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BEE',
        validate: (output) => {
          errorMsg = 'Private Key is not a valid Hex String';
          expect(output.message).to.equal(errorMsg);
        }
      }
    ],
  }
}
_utilTd.cipher = {
  valid: 'aes-128-ctr',
  invalid: [
    {
      input: undefined,
      validate: (output) => {
        errorMsg = false;
        expect(output).to.equal(errorMsg);
      }
    },
    {
      input: '',
      validate: (output) => {
        errorMsg = false;
        expect(output).to.equal(errorMsg);
      }
    },
    {
      input: 'aes-128-ct',
      validate: (output) => {
        errorMsg = false;
        expect(output).to.equal(errorMsg);
      }
    },
    {
      input: 'aes-128-ctrr',
      validate: (output) => {
        errorMsg = false;
        expect(output).to.equal(errorMsg);
      }
    }
  ]
}
_utilTd.makeKeyPairFromSeed = {
  valid: [
    {
      input: {
        buffer: util.strToBuffer(crypto.hashSeed(seed.valid, {
          algorithm: 'sha256'
        }))
      },
      validate: (output) => {
        expect(output).to.be.an('object');
      }
    }
  ],
  invalid: [
    {
      input: {
        buffer: util.strToBuffer(seed.invalid.invalidLength1),
      },
      validate: (output) => {
        errorMsg = 'bad seed size'
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: {
        buffer: util.strToBuffer(seed.invalid.invalidLength2),
      },
      validate: (output) => {
        errorMsg = 'bad seed size'
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: {
        buffer: seed.invalid.undefined
      },
      validate: (output) => {
        errorMsg = 'unexpected type, use Uint8Array'
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: {
        buffer: seed.invalid.invalidLength2
      },
      validate: (output) => {
        errorMsg = 'unexpected type, use Uint8Array'
        expect(output.message).to.equal(errorMsg);
      }
    }
  ]
};
_utilTd.sizeGenerateSalt = {
  valid: [
    {
      input: 32,
      validate: (output) => {
        var length = output.length;
        expect(length).to.equal(32);
      }
    },
    {
      input: undefined,
      validate: (output) => {
        var length = output.length;
        expect(length).to.equal(32);
      }
    },
    {
      input: 0,
      validate: (output) => {
        var length = output.length;
        expect(length).to.equal(0);
      }
    }
  ],
  invalid: [
    {
      input: '',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: 'abc',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: '11',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: '#',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: -1,
      validate: (output) => {
        var errorMsg = 'size must be a number >= 0';
        if (typeof window !== 'undefined') {
          errorMsg = 'Invalid typed array length: -1';
        }
        expect(output.message).to.equal(errorMsg);
      }
    }
  ]
}
_utilTd.sizeGenerateIv = {
  valid: [
    {
      input: 32,
      validate: (output) => {
        var length = output.length;
        expect(length).to.equal(32);
      }
    },
    {
      input: undefined,
      validate: (output) => {
        var length = output.length;
        expect(length).to.equal(16);
      }
    },
    {
      input: 0,
      validate: (output) => {
        var length = output.length;
        expect(length).to.equal(0);
      }
    }
  ],
  invalid: [
    {
      input: '',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: 'abc',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: '11',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: '#',
      validate: (output) => {
        if (typeof window !== 'undefined') {
          return;
        }
        var errorMsg = 'size must be a number >= 0';
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: -1,
      validate: (output) => {
        var errorMsg = 'size must be a number >= 0';
        if (typeof window !== 'undefined') {
          errorMsg = 'Invalid typed array length: -1';
        }
        expect(output.message).to.equal(errorMsg);
      },
    }
  ]
}

if (typeof window !== 'undefined' && typeof window._utilTd === 'undefined') {
  window._utilTd = _utilTd;
}
else {
  module.exports = { _utilTd };
}