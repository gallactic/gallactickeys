'use strict'

var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;
var errorMsg;
const _gcTd = {};

_gcTd.create = {
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
_gcTd.export = {
  valid: [
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
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
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
    /*** should be valid and not returning error when option.cipher is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');
      }
    },
    //*** should be valid and not returning error  when option.kdfparams object is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
    //*** should be valid and not returning error when option.kdfparams.c is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
    // SBV - should be valid and not returning error when option.kdfparams.dklen is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - should be valid and not returning error when option.kdfparams.prf is not provided ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - should be valid and not returning error when salt is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - should be valid and not returning error when salt is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV when iv is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV when iv is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV - by default, libary will take default value  when option object is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdf is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdf is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.cipher is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.cipher is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams object is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.c is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.c is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.dklen is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.dklen is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.dklen is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.prf is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.prf is empty ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        expect(output.crypto.ciphertext).to.equal('b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a');
        expect(output.crypto.kdf).to.equal('pbkdf2');
        expect(output.crypto.kdfparams.c).to.equal(262144);
        expect(output.crypto.kdfparams.dklen).to.equal(32);
        expect(output.crypto.kdfparams.prf).to.equal('hmac-sha256');
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV when option.kdf type is scrypt
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr'
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('7d58d4a6e5d21a3b2f85be7ed2337ff28607683bf411c8211389988542098b58dd45eb233b6a042351621e57d4c1c78c3dd164ef6c6d223d827fcbd2a483abfd');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('790e5c958dc1a78a5d2e757c8215558e2bb036068f213e2304de4eb3749b074f');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.n is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            n: undefined
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.n is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            n: null
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.r is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            r: undefined
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.r is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            r: null
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.dklen is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            dklen: undefined
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.dklen is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            dklen: null
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.dklen is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            dklen: 33
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        expect(output.crypto.kdfparams.dklen).to.equal(33);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.p is undefined ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            p: undefined
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('7d58d4a6e5d21a3b2f85be7ed2337ff28607683bf411c8211389988542098b58dd45eb233b6a042351621e57d4c1c78c3dd164ef6c6d223d827fcbd2a483abfd');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('790e5c958dc1a78a5d2e757c8215558e2bb036068f213e2304de4eb3749b074f');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
        expect(output.crypto.cipherparams.iv.length).to.equal(32);
        expect(output.crypto.mac.length).to.equal(64);
        expect(output.crypto.kdf.length).to.equal(6);
        expect(output.crypto.kdfparams.salt.length).to.equal(64);
      }
    },
    // SBV  when option.kdfparams.p is null ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            prf: null
          }
        }
      },
      validate: (output) => {
        expect(output.crypto.cipher).to.equal('aes-128-ctr');
        expect(output.crypto.ciphertext).to.equal('7d58d4a6e5d21a3b2f85be7ed2337ff28607683bf411c8211389988542098b58dd45eb233b6a042351621e57d4c1c78c3dd164ef6c6d223d827fcbd2a483abfd');
        expect(output.crypto.cipherparams.iv).to.equal('d32116e6157fde33fa0c7e0e4001e145');
        expect(output.crypto.mac).to.equal('790e5c958dc1a78a5d2e757c8215558e2bb036068f213e2304de4eb3749b074f');
        expect(output.crypto.kdf).to.equal('scrypt');
        // expect(output.crypto.kdfparams.n).to.equal(constant.crypto.kdf.scrypt.n);
        // expect(output.crypto.kdfparams.r).to.equal(constant.crypto.kdf.scrypt.r);
        // expect(output.crypto.kdfparams.p).to.equal(constant.crypto.kdf.scrypt.p);
        // expect(output.crypto.kdfparams.dklen).to.equal(constant.crypto.kdf.scrypt.dklen);
        expect(output.crypto.kdfparams.salt).to.equal('ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd');

        expect(output.address.length).to.equal(35);
        expect(output.crypto.cipher.length).to.equal(11);
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
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
    /*** Should throw an error message when password is undefined ***/
    {
      input: {
        password: undefined,
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
    /*** Should throw an error message when tm private key is less than 128 characters and even number characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '3c7KSMcq37R81N2pTxGzYej74ftCyKU2GHWXBvWbbTcYBozEyzxkZvwacGw8saNVrQ6jdCGa4CkQXGCnepyzVQ3NpYG4i',
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
    /*** Should throw an error message when tm private key is less than 128 characters but odd number characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'CVxtNv192KKTvbq2VxyazhWqmCd1qaWGaTsJFDBdh6TreiPeiaq5JM5uLhKwkEHtM2xK8kjiu8rapa72VxnYkLhvNxLpq8',
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
    /*** Should throw an error message when tm private key is more than 128 characters and even number characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'J3ocB1f458QC7RWgVBUSrsyBruDD4xVWayeieuvRUxCSVMgPxXfBDaFC3aasmHbcR4YDP7nz8T3DSLh9ezi5fWwEr1mH9eDpFK',
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
    /*** Should throw an error message when tm private key is more than 128 characters but odd number characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: '4s2Vp8Q83J5oUHRrGuDZbQnMaxnMrqNQvTt95WfPK7cfrULoSGZDHSf78P7KJHSy4BmgWUpaLMrSUVUg7o9rYPBvtS6Tn8h62',
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
    /*** Should throw an error message when iv has invalid length***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        errorMsg = typeof window !== 'undefined' ? 'invalid iv length 32' : 'Invalid IV length';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when iv is not 32 characters long ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        errorMsg = typeof window !== 'undefined' ? 'invalid iv length 31' : 'Invalid IV length';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdf is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
        errorMsg = 'KDF method is not available yet. Please use pbkdf2 or scrypt for now';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.cipher is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
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
    /*** Should throw an error message when option.kdfparams.n is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            n: 'invalid'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Kdf params (n, r, p and dklen) must be a number type';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdfparams.r is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            r: 'invalid'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Kdf params (n, r, p and dklen) must be a number type';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdfparams.p is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            p: 'invalid'
          }
        }
      },
      validate: (output) => {
        errorMsg = 'Kdf params (n, r, p and dklen) must be a number type';
        expect(output.message).to.equal(errorMsg);
      }
    },
    /*** Should throw an error message when option.kdfparams.dklen is invalid ***/
    {
      input: {
        password: 'gallaaaaaactic',
        privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
        salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
        iv: 'd32116e6157fde33fa0c7e0e4001e145',
        option: {
          kdf: 'scrypt',
          cipher: 'aes-128-ctr',
          kdfparams: {
            dklen: 'invalid'
          }
        }
      },
      validate: (output) => {
        // NOTE: exception for nodejs, as it will throw an error. But in browser
        //       it will not throw an error.
        if (typeof window === 'undefined') {
          errorMsg = 'Kdf params (n, r, p and dklen) must be a number type';
          expect(output.message).to.equal(errorMsg);
        }
      }
    }
  ]
};
_gcTd.recover = {
  valid: [
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'vaM3QzMAwc1LJau9ps6VS2W7kp2PWKp7Qff',
          crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: 'b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c',
            cipherparams: { iv: 'd32116e6157fde33fa0c7e0e4001e145' },
            mac: '27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a',
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
        expect(output).to.equal('skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ');
      }
    },
    {
      input: {
        password: 'gallaaaaaactic',
        keyObject: {
          address: 'acJKTDqKnCoiguTtWRftCRembSEtiJpwzrW',
          crypto:
          {
            cipher: 'aes-128-ctr',
            ciphertext: 'b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c',
            cipherparams: { iv: 'd32116e6157fde33fa0c7e0e4001e145' },
            mac: '27595c4955bc1d5fe7cab1c5446dc37205d7f56d94193083c58333890375a75a',
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
      validate: (output) => {
        expect(output).to.equal('skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ');
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
        errorMsg = 'KDF method is not available yet. Please use pbkdf2 or scrypt for now';
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

if (typeof window !== 'undefined') {
  window._gcTd = _gcTd;
}
else {
  module.exports = { _gcTd };
}