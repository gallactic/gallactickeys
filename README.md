  [![NPM Version][npm-image]][npm-url]

# GallacticKeys
A module for creating and importing Galactic keys. This provides a simple way to generate galactic key.
GallacticKeys uses the key derivation functions (PBKDF2-SHA256), symmetric ciphers (AES-128-CTR), and message authentication code. You can export the generated key to file, copy it to you data directory's keystore and start using it.

## Installation
```npm install gallactickeys```

## Usage:
To use gallactickeys in Node.js, just ```require``` it:

```js
var gallactickeys = require('gallactickeys');
```

A minified, browserified file ```dist/gallactickeys.min.js``` is included for use in the browser. Including this file simply attaches ```GallacticKeys``` object to ```window```:

```<sciprt src="dist/gallactickeys.min.js" type="text/javascript"></script>```

## Key Creation
Generate a random private key, as well as the salt used by the key derivation function and the initialization vector used to AES-128-CTR encrypt the key. ```create``` is synchronous.

```js
var gallactickeys = require('./index');
var options = {
  seed: 'salad buffalo ribbon pretty chunk trade genius bid sense tent artist lottery' // optional
};

var dk = gallactickeys.create(option);
/**
dk = {
  seed: 'salad buffalo ribbon pretty chunk trade genius bid sense tent artist lottery',
  seedHashed: 'B51CB12FC3CBE2134E890817C58570028D02CF93E9A4DC9646C25C09C77CF6A5',
  keyPair: {
    publicKey: 'pjASdjRJVwmrDpevpcj4WPRC6RnHGpG5ZGeCWVvkDMRUCvScdcZ',
    privateKey: 'skfsX2XY9wmAxpqshKdYgwHsS9vcLVDzNPQLdHjY5XC9BvSiNwjpoTJLmjL75149KECbYLLiCW94PiMe2yJbs4PkP4qihYW'
  },
  salt: 'B2F7F3C021AFB205A5349F803BB2FC346231E1CE0E4A9FCFCC0B86C3C18C48A2',
  iv: '55FBC4CB9FA46233487B424043A50FDE'
}
*/
```
## Key Export
You will need to specify a password and (optionally) a key derivation function. if unspecified, PBKDF2-SHA256 will be used to derive the AES secret key. NOTE: right now it only support PBKDF2-SHA256. There are 2 methods of key export, which are `exportAc` and
`exportVa`.

```js
// exportAc - function

let opt = {
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
}

let keystore = gallactickeys.exportAc(opt.password, opt.privateKey, opt.salt, opt.iv, opt.option);

/**
keystore = {
  address: 'acQDEb2tMmjWb9mj5S1Rw3YbRjKSpwD9x6F',
  crypto: {
    cipher: 'aes-128-ctr',
    ciphertext: 'b745bbf018340f227a6855b094462a0d1f133e024ff96c317da1798e98524a61363aebd118ad4f4fde6acb753874343de0ad9506556f19ad5fcca638ea89c76c',
    cipherparams: {
      iv: 'd32116e6157fde33fa0c7e0e4001e145'
    },
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
*/

// exportVa - function
let opt = {
  password: 'gallaaaaaactic',
  privateKey: 'skqfmiwcQorVqaiycr4m3fpiE6HxhQtBkhb17imvwy7Y9TgyUYKByZee1vzcdofXdRd93E3Zw7frGy7bcqE38HycfhjBHuJ',
  salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd',
  iv: 'd32116e6157fde33fa0c7e0e4001e145',
  option: {
    kdf: 'scrypt',
    cipher: 'aes-128-ctr',
    kdfparams: {
      n: 16384,
      r: 8,
      p: 1,
      dklen: 64,
      salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
    }
  }
}

let keystore = gallactickeys.exportVa(opt.password, opt.privateKey, opt.salt, opt.iv, opt.option);

/**
keystore = {
  address: 'vaSwCMYjXAw8CqCzPsS3AePwb76wd3mAdxd',
  crypto: {
    cipher: 'aes-128-ctr',
    ciphertext: '7d58d4a6e5d21a3b2f85be7ed2337ff28607683bf411c8211389988542098b58dd45eb233b6a042351621e57d4c1c78c3dd164ef6c6d223d827fcbd2a483abfd',
    cipherparams: {
      iv: 'd32116e6157fde33fa0c7e0e4001e145'
    },
    mac: '790e5c958dc1a78a5d2e757c8215558e2bb036068f213e2304de4eb3749b074f',
    kdf: 'scrypt',
    kdfparams: {
      n: 16384,
      r: 8,
      p: 1,
      dklen: 64,
      salt: 'ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd'
    }
  }
}
*/
```

## Tests
Unit tests are in the ```test``` directory and can be run with mocha:
```
npm test
```

The command below will help run webpack generate new minified file under dist folder.

```
npm run browser
```

Also, inside the test folder, there's ```test.html``` that will trigger to run ```mocha``` if opened using a browser for browser testing. Otherwise, you can run ```mocha``` to start the test
```
mocha
```

## License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/gallactickeys.svg
[npm-url]: https://npmjs.org/package/gallactickeys
