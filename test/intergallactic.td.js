'use strict'

var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var glOrExport = (typeof window !== 'undefined' ? window : module.exports);
var errorMsg;

glOrExport.igcTd = {};
glOrExport.igcTd.create = {
  valid: [
    /*** should return a key account based on given seed ***/
    {
      input: {
        seed: 'shadow outside hint dish fortune boss oak album gym all mask there'
      },
      validate: (output) => {
        expect(output.seed).to.equal('shadow outside hint dish fortune boss oak album gym all mask there')
      }
    },
    /*** should return a key account even without seed option ***/
    {
      input: {
        seed: ''
      },
      validate: (output) => { }
    },
    /*** should return a key account even without seed option ***/
    {
      input: {
        seed: undefined
      },
      validate: (output) => { }
    }
  ],
  invalid: [
    // NVTC - /*** Should not return a response on provision of seed that has != 12 characters ***/
    // {
    //   input: {
    //     seed: 'shadow outside hint dish fortune boss oak album gym all mask'
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef: Please provide appropriate error message';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should not return a response on provision of seed that has != 12 characters ***/
    // {
    //   input: {
    //     seed: 'shadow outside hint dish fortune boss oak album gym all mask there mask'
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef: Please provide appropriate error message';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // }
  ]
};
glOrExport.igcTd.export = {
  valid: [
    {
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    /*** Should be able to export when salt is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
      }
    },
    /*** Should be able to export when iv is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when option.cipher is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when option.kdfparams object is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-ctr'
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when option.kdfparams.c is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-ctr',
          kdfparams: {
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when option.kdfparams.dklen is not provided ***/
    {
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
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when option.kdfparams.prf is not provided ***/
    {
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
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when salt is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: undefined,
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - should be valid and not returning error /*** Should throw an error message when salt is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: '',
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when iv is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: undefined,
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when iv is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: '',
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
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - by default, libary will take default value /*** Should throw an error message when option object is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {}
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(65536);
        expect(output.crypto.kdfparams.dklen).to.equal(64);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdf is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: undefined,
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdf is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: '',
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.cipher is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: undefined,
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.cipher is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: '',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams object is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-ctr',
          kdfparams: {}
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(65536);
        expect(output.crypto.kdfparams.dklen).to.equal(64);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.c is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: undefined,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(65536);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.c is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: null,
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: null,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(65536);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.dklen is undefined ***/
    {
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
            dklen: undefined,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.dklen is null ***/
    {
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
            dklen: null,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.dklen is invalid ***/
    {
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
            dklen: 33,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(33);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.prf is undefined ***/
    {
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
            prf: undefined
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV /*** Should throw an error message when option.kdfparams.prf is empty ***/
    {
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
            prf: ''
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.ciphertext.length).to.equal(128);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    }
  ],
  invalid: [
    /*** Should throw an error message when an empty object is passed as a parameter ***/
    {
      input: {},
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when password is not provided ***/
    {
      input: {
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when privateKey is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC - /*** Should throw an error message when option object is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    //     salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
    //     iv: 'd32116e6157fde33fa0c7e0e4001e145',
    //   },
    //   validate: (output) => {
    //     errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when option.kdf is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    //     salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
    //     iv: 'd32116e6157fde33fa0c7e0e4001e145',
    //     option: {
    //       cipher: 'aes-128-ctr',
    //       kdfparams: {
    //         c: 262144,
    //         dklen: 32,
    //         prf: 'hmac-sha256'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when password is undefined ***/
    {
      input: {
        password: undefined,
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when password is empty ***/
    {
      input: {
        password: '',
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC - /*** Should throw an error message when password is invalid ***/
    // {
    //   input: {
    //     password: '1231314',
    //     privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    //     salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
    //     iv: 'd32116e6157fde33fa0c7e0e4001e145',
    //     option: {
    //       kdf: 'pbkdf2',
    //       cipher: 'aes-128-ctr',
    //       kdfparams: {
    //         c: 262144,
    //         dklen: 32,
    //         prf: 'hmac-sha256'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef: Please provide appropriate error message';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when private key is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: undefined,
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when private key is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '',
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password, privateKey and type provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when private key is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1FFFF',
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
      validate: (output) => {
        errorMsg = 'given Private Key is not a valid Private Key string';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when private key is not 128 characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1',
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
      validate: (output) => {
        errorMsg = 'given Private Key is not a valid Private Key string';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC - it is a valid salt /*** Should throw an error message when salt is invalid ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    //     salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0be',
    //     iv: 'd32116e6157fde33fa0c7e0e4001e145',
    //     option: {
    //       kdf: 'pbkdf2',
    //       cipher: 'aes-128-ctr',
    //       kdfparams: {
    //         c: 262144,
    //         dklen: 32,
    //         prf: 'hmac-sha256'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef: Please provide appropriate error message';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - salt does not necessary 64 bytes /*** Should throw an error message when salt is not 64 characters long ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    //     salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0b',
    //     iv: 'd32116e6157fde33fa0c7e0e4001e145',
    //     option: {
    //       kdf: 'pbkdf2',
    //       cipher: 'aes-128-ctr',
    //       kdfparams: {
    //         c: 262144,
    //         dklen: 32,
    //         prf: 'hmac-sha256'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef: Please provide appropriate error message';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when iv has invalid length***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e1zz',
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
      validate: (output) => {
        errorMsg = 'Invalid IV length';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when iv is not 32 characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e14',
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
      validate: (output) => {
        errorMsg = 'Invalid IV length';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdf is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf3',
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.cipher is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-cts',
          kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'aes-128-cts is not available';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdfparams.c is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'pbkdf2',
          cipher: 'aes-128-ctr',
          kdfparams: {
            c: 'zzzzz',
            dklen: 32,
            prf: 'hmac-sha256'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Iterations not a number';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdfparams.prf is invalid ***/
    {
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
            prf: 'invalid'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Bad digest name';
        expect(output.message).to.equal(errorMsg);
      }
    }
  ]
};
glOrExport.igcTd.recover = {
  valid: [
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
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
      validate: (output) => {
        expect(output).to.equal('0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE');
        expect(output.length).to.equal(128);
      }
    }
  ],
  invalid: [
    /*** Should throw an error message when an empty object is passed as parameter ***/
    {
      input: {},
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password and keyObject is provided'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when password is not provided ***/
    {
      input: {
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password and keyObject is provided'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when password is undefined ***/
    {
      input: {
        password: undefined,
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password and keyObject is provided'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when password is empty ***/
    {
      input: {
        password: '',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
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
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password and keyObject is provided'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when password is invalid ***/
    {
      input: {
        password: 'invalidPassword',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
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
      validate: (output) => {
        errorMsg = 'message authentication code mismatch'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when key object is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
      },
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password and keyObject is provided'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when empty key object is provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {}
      },
      validate: (output) => {
        errorMsg = 'Missing parameter! Make sure password and keyObject is provided';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC /*** Should throw an error message when keyObject.address is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       },
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto object is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          version: 3
        }
      },
      validate: (output) => {
        errorMsg = 'Invalid keystore crypto object';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.cipher is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
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
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Cipher method is invalid. Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.cipherparams object is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Cannot read property \'iv\' of undefined';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.cipherparams object is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {},
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {

        errorMsg = 'Input string is not a valid string';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.ciphertext is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object contains invalid cipher text value. Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // TBC /*** Should throw an error message when keyObject.crypto.kdf is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
    //         cipherparams: {
    //           iv: 'd32116e6157fde33fa0c7e0e4001e145'
    //         },
    //         mac: '82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
    //         }
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto.kdfparams object is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Cannot read property \'salt\' of undefined';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams object is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {},
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'PBKDF2 only supported with HMAC-SHA256';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.c is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.dklen is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           // dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, please provide appropriate error message';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto.kdfparams.prf is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'PBKDF2 only supported with HMAC-SHA256';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.salt is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Must provide password and salt to derive a key'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.mac is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object has invalid/empty "mac" value, Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC - /*** Should throw an error message when keyObject.id is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       },

    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.version is not provided ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       },
    //       id: 'uuid.v4()',
    //       // version: 3
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.address is undefined ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: undefined,
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.address is empty ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: '',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.address is invalid ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: '6CE3E09C9D1234AD74BFDF57E20DB4F07A56EE',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.address is not 38 characters long ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: '6CE3E09C9D1234AD74BFDF57E20DB4F07A56E',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.crypto.cipher is undefined ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: undefined,
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.crypto.cipher is empty ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: '',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.crypto.cipher is invalid ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-cts',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'aes-128-cts is not available'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto.cipherparams.iv is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: undefined
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
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Input string is not a valid string';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.cipherparams.iv is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: ''
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
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Input string is not a valid string';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC - /*** Should throw an error message when keyObject.crypto.cipherparams is invalid ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bd'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // TBC - /*** Should throw an error message when keyObject.crypto.cipherparams.iv is not 32 characters long ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36b'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'Invalid IV length'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto.ciphertext is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: undefined,
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object contains invalid cipher text value. Unable to proceed'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.ciphertext is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object contains invalid cipher text value. Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.ciphertext is invalid ***/
    // NVTC - {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cd',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'Keystore object contains invalid cipher text value. Unable to proceed';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto.ciphertext is not 128 characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90c',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Can\'t convert input to UTF-16: invalid length';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // TBC - /*** Should throw an error message when keyObject.crypto.kdf is undefined ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         ciphertext: '42bd22c6d3310e5d62ada2c44ef9b7634a85984ef4404be3af881eb9e6ad5847745b14d4d59a61324f3177e5ff9c33c2cd538a8cc084950eed1c2b341867892d',
    //         cipherparams: {
    //           iv: 'd32116e6157fde33fa0c7e0e4001e145'
    //         },
    //         mac: '82d5f18afaa6e7d0b555e87fd6096c594a0f1069875522db85ff523ebd38dabe',
    //         kdf: undefined,
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
    //         }
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now'//@Josef, can the error message be a little more specific?
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // TBC - /*** Should throw an error message when keyObject.crypto.kdf is empty ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: '',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now';
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    /*** Should throw an error message when keyObject.crypto.kdf is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf3',
            kdfparams: {
              c: 262144,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'KDF method is not available yet. Please use pbkdf2 for now';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.c is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: undefined,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.c is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: null,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.c is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262145,
              dklen: 32,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.dklen is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: undefined,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.dklen is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: null,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when using different keyObject.crypto.kdfparams.dklen ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
          crypto: {
            cipher: 'aes-128-ctr',
            cipherparams: {
              iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
            },
            ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
            kdf: 'pbkdf2',
            kdfparams: {
              c: 262144,
              dklen: 33,
              prf: 'hmac-sha256',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.prf is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              prf: undefined,
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'PBKDF2 only supported with HMAC-SHA256';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.prf is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              prf: '',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'PBKDF2 only supported with HMAC-SHA256';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.prf is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              prf: 'hmac-sha255',
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'PBKDF2 only supported with HMAC-SHA256';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.salt is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              salt: undefined
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Must provide password and salt to derive a key'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.salt is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              salt: ''
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Must provide password and salt to derive a key'
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.salt is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d44'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.kdfparams.salt is not 64 characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
              salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d4'
            },
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.mac is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
            mac: undefined
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object has invalid/empty "mac" value, Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.mac is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
            mac: ''
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object has invalid/empty "mac" value, Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.mac is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab9'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'message authentication code mismatch';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when keyObject.crypto.mac is not 64 characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
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
            mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Keystore object has invalid/empty "mac" value, Unable to proceed';
        expect(output.message).to.equal(errorMsg);
      }
    },
    // NVTC - /*** Should throw an error message when keyObject.id is undefined ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.id is empty ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.id is invalid ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.version is undefined ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.version is null ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // },
    // NVTC - /*** Should throw an error message when keyObject.version is invalid ***/
    // {
    //   input: {
    //     password: 'gallaaaaaactic',
    //     keyObject: {
    //       address: 'vaZVTNthTQ9nromHQN4KYwjLFTr44ns8FZs',
    //       crypto: {
    //         cipher: 'aes-128-ctr',
    //         cipherparams: {
    //           iv: '6bab7fb495ad8c20ee7e18e2717b36bc'
    //         },
    //         ciphertext: '99cc42176f687fbe24950fb9a5734243be11bf7ee5cc955c94448b19f286707fc9f0607d333594571c343f9888ab0325472ac8b2f70608dd2484d6309c8a90cc',
    //         kdf: 'pbkdf2',
    //         kdfparams: {
    //           c: 262144,
    //           dklen: 32,
    //           prf: 'hmac-sha256',
    //           salt: 'cbbac76f1f35e9e17c319cbf7cfa5285eb6d0183f02503aeb961ad2ac2d71d43'
    //         },
    //         mac: '8147da4a969511e9ff9a662d8caaf82ac469c6b948edcb562e184d8b10a34ab8'
    //       }
    //     }
    //   },
    //   validate: (output) => {
    //     errorMsg = '@Josef, Please provide appropriate error message'
    //     expect(output.message).to.equal(errorMsg);
    //   }
    // }
  ]
};