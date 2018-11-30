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

_utilTd.toBuffer = {
  valid: [
    {
      input: { value: 20 }
    },
    {
      input: { value: '20' }
    },
    {
      input: { value: null }
    },
    {
      input: { value: undefined }
    }
  ],
  invalid: [
    {
      input: { value: new ArrayBuffer() }
    },
    {
      input: { value: new Uint8Array() }
    }
  ]
}

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

_utilTd.marshal = {
  valid: [
    {
      input: {
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        type: 1,
        opt: { kdf: 'pbkdf2' }
      }
    }
  ]
}

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
          errorMsg = 'given Public Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Public Key is empty, it should return an error
        input: '',
        validate: (output) => {
          errorMsg = 'given Public Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Public Key is not even, it should return an error
        input: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1B',
        validate: (output) => {
          errorMsg = 'given Public Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Public Key length is not equal to 64, it should return an error - Public Key is not a valid Public Key String
        input: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1',
        validate: (output) => {
          errorMsg = 'given Public Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      }
    ]
  },
  privateKey: {
    valid: [
      {
        input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        validate: (output) => {
          expect(typeof output).to.be.a('string')
        }
      },
      {
        input: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        validate: (output) => {
          expect(typeof output).to.be.a('string')
        }
      }
    ],
    invalid: [
      {
        //If Private Key length is not equal to 128, it should return an error - Private Key is not a valid Private Key String
        input: undefined,
        validate: (output) => {
          errorMsg = 'given Private Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Private Key is empty, it should return an error
        input: 'Private Key is not a valid Hex String',
        validate: (output) => {
          errorMsg = 'given Private Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Private Key is not even, it should return an error
        input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1B',
        validate: (output) => {
          errorMsg = 'given Private Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      },
      {
        //If Private Key length is not equal to 128, it should return an error
        input: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BEE',
        validate: (output) => {
          errorMsg = 'given Private Key string is invalid! unable to proceed';
          expect(output.message).to.equal(errorMsg);
        }
      }
    ]
  }
};

_utilTd.bs58Encode = {
  valid: [
    {
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
    }
  ]
}

_utilTd.bs58Decode = {
  valid: [
    {
      input: {
        address: 'acHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds'
      },
      validate: (output) => {
        expect(output).to.equal('6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC');
      }
    },
    {
      input: {
        address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8'
      },
      validate: (output) => {
        expect(output).to.equal('B26CE3E09C9D1234AD74BFDF57E20DB4F07A56E1');
      }
    }
  ]
};

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
};

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
        buffer: util.strToBuffer(seed.invalid.invalidLength1)
      },
      validate: (output) => {
        errorMsg = 'bad seed size'
        expect(output.message).to.equal(errorMsg);
      }
    },
    {
      input: {
        buffer: util.strToBuffer(seed.invalid.invalidLength2)
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

_utilTd.isAddress = {
  valid: [
    {
      input: {
        address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8'
      }
    },
    {
      input: {
        address: 'acHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds'
      }
    },
    {
      input: {
        address: 'B26CE3E09C9D1234AD74BFDF57E20DB4F07A56E1'
      }
    }
  ],
  invalid: [
    // random string 40 characters
    {
      input: {
        address: 'somethingelsethathasthirtytofourtycharcs'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // random stirng 35 characters
    {
      input: {
        address: 'somethingelsethathasthirtytofourtyc'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // modifying "the last character" of a valid ac address
    {
      input: {
        address: 'B26CE3E09C9D1234AD74BFDF57E20DB4F07A56EZ'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Invalid Checksum');
      }
    },
    // modifying "the first 2 characters" of a valid ac address
    {
      input: {
        address: 'vaHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Invalid Checksum');
      }
    }
  ]
};

_utilTd.isTmAddress = {
  valid: [
    {
      input: {
        address: 'B26CE3E09C9D1234AD74BFDF57E20DB4F07A56E1'
      }
    },
    {
      input: {
        address: '6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC'
      }
    }
  ],
  invalid: [
    // random string 40 characters
    {
      input: {
        address: 'somethingelsethathasthirtytofourtycharcs'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Address is not a valid Hex String');
      }
    },
    // random stirng 35 characters
    {
      input: {
        address: 'somethingelsethathasthirtytofourtyc'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Address is not a valid Hex String');
      }
    },
    // modifying "the last character" of a valid tm address
    {
      input: {
        address: 'B26CE3E09C9D1234AD74BFDF57E20DB4F07A56EZ'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Address is not a valid Hex String');
      }
    },
    // a valid ac address
    {
      input: {
        address: 'acHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Address is not a valid Hex String');
      }
    },
    // modifying "the first 2 characters" of a valid ac address
    {
      input: {
        address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Address is not a valid Hex String');
      }
    }
  ]
};

_utilTd.isAcAddress = {
  valid: [
    {
      input: {
        address: 'acHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds'
      }
    }
  ],
  invalid: [
    // random string 40 characters
    {
      input: {
        address: 'somethingelsethathasthirtytofourtycharcs'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // random stirng 35 characters
    {
      input: {
        address: 'somethingelsethathasthirtyfourtycca'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // modifying "the last character" of a valid ac address
    {
      input: {
        address: 'acHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVdd'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Invalid Checksum! Unable to decode.');
      }
    },
    // modifying "the first 2 characters" of a valid ac address
    {
      input: {
        address: 'vaHx3dYGX9pB7xPFZA58ZMcN4kYEooJMVds'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // given any va address should return false
    {
      input: {
        address: 'vaBdTQnKWstzbP9rrMCvPP4rxqLU3PDvKHM'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    {
      input: {
        address: 'acsomethingwiththirtyfivecharacters'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Invalid Checksum! Unable to decode.');
      }
    }
  ]
};

_utilTd.isVaAddress = {
  valid: [
    {
      input: {
        address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8'
      }
    }
  ],
  invalid: [
    // random string 40 characters
    {
      input: {
        address: 'somethingelsethathasthirtytofourtycharcs'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // random stirng 35 characters
    {
      input: {
        address: 'somethingelsethathasthirtyfourtyc'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    // modifying "the last character" of a valid va address
    {
      input: {
        address: 'vaTCD3Uigtb4EnMrV453z5H8g5LBxtWn6QQ'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Invalid Checksum! Unable to decode.');
      }
    },
    // modifying "the first 2 characters" of a valid va address
    {
      input: {
        address: 'acTCD3Uigtb4EnMrV453z5H8g5LBxtWn6Q8'
      },
      validate: (output) => {
        expect(output).to.equal(false);
      }
    },
    {
      input: {
        address: 'vasomethingwiththirtyfivecharacters'
      },
      validate: (output) => {
        expect(output instanceof Error).to.equal(true);
        expect(output.message).to.equal('Invalid Checksum! Unable to decode.');
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
};

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
      }
    }
  ]
};

if (typeof window !== 'undefined' && typeof window._utilTd === 'undefined') {
  window._utilTd = _utilTd;
}
else {
  module.exports = { _utilTd };
}