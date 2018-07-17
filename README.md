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
  seed: 'shadow outside hint dish fortune boss oak album gym all mask there' // optional
};

var dk = gallactickeys.create(option);
/**
dk = {
  seed: 'shadow outside hint dish fortune boss oak album gym all mask there',
  seedHashed: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9',
  salt: 'F87D36EFA63A3157D32BDAE855F0D6C97D80102B8567209BCFE6F5C45BB85E8B',
  iv: 'D71125645283D034855A2F44605E510C',
  keyPair: {
    publicKey: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
    privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE'
  }
}
*/
```
## Key Export
You will need to specify a password and (optionally) a key derivation function. if unspecified, PBKDF2-SHA256 will be used to derive the AES secret key. NOTE: right now it only support PBKDF2-SHA256.


```js
let opt = {
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
}

let keystore = gallactickeys.export(option.password, option.privateKey, option.salt, option.iv, option.option);

/**
keystore = {
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
*/
```

## Hashing rounds



## Tests
Unit tests are in the ```test``` directory and can be run with mocha:
```
npm test
```

The command will help run webpack generate new minified file under dist folder. inside the test folder, there's ```test.html``` that will trigger to run ```mocha``` if opened using a browser for browser testing. Otherwise, you can run ```mocha``` to start the test
```
mocha
```
