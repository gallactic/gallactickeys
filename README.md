# tenderkeys.js
A module for creating and importing Galactic keys. This provides a simple way to generate galactic key.
Tenderkeys uses the key derivation functions (PBKDF2-SHA256), symmetric ciphers (AES-128-CTR), and message authentication code. You can export the generated key to file, copy it to you data directory's keystore and start using it.

## Installation
```npm install tenderkeys.js```

## Usage:
To use tenderkeys in Node.js, just ```require``` it:

```js
var tenderkeys = require('tenderkeys.js');
```

A minified, browserified file ```dist/bundle.js``` is included for use in the browser. Including this file simply attaches ```TenderKeys``` object to ```window```:

```<sciprt src="dist/bundle.js" type="text/javascript"></script>```

## Key Creation
Generate a random private key, as well as the salt used by the key derivation function and the initialization vector used to AES-128-CTR encrypt the key. ```create``` is synchronous.

```js
var tenderkeys = require('./index');
var options = {
  seed: 'shadow outside hint dish fortune boss oak album gym all mask there' // optional
};

var dk = tenderKeys.create(option);
// RESULT
// {
//   seed: 'shadow outside hint dish fortune boss oak album gym all mask there',
//   seedHashed: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9',
//   salt: <Buffer ...>,
//   iv: <Buffer ...>,
//   keyPair: {
//     publicKey: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
//     privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE'
//   }
// }




