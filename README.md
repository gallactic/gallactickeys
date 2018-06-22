# tenderkeys.js
A module for creating bip39 mnemonic, ed25519  key pair and ripemd160 address for Tendermint and Hyperledger Burrow

## Example:
```js



var TenderKeys = require('./index');
var tenderKeys = new TenderKeys;

var mnemonic = tenderKeys.generateRandomMnemonic();
var seed     =  tenderKeys.generateSeed(mnemonic);
var keyPair  = tenderKeys.generateKeyPair(seed);
var address  = tenderKeys.getAddressFromPubKey(keyPair.publicKey);

console.log("mnemonic    :" + mnemonic);
console.log("private key :" + keyPair.privateKey);
console.log("Public key  :" + keyPair.publicKey);
console.log("address     :" + address);

let data = '{"chain_id":"BurrowChain_2A0FC2-4F8BA9","tx":[1,{"inputs":[{"address":"6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC","amount":1000,"sequence":8}],"outputs":[{"address":"D7572DA8389D0C3AA64FC8709CA853AFE24F4260","amount":1000}]}]}';
let privKey = 'C01E3035C40C2FF009791C36755848F77EA9FAD484E4A38A17355C72A2C5EDB81474C7654BD711B910F48561FCEC85BC5FAE01B1D209CDF6B60D10F141EC7D5B';
let signature = tenderKeys.sign(privKey,data);
console.log("signature :"+signature);
```
## output
```


mnemonic    :beauty embark high upgrade vanish indicate shuffle drum gospel crime denial mixture
private key :831DE5360A51DF4B4E796799AC5B80EE4E6CB580CB3D6BAD863095DE0C01016EE15BD7489B75740F9B40DA3B370692A5165E609E06EC63DAF4C4964982DFB62E
Public key  :E15BD7489B75740F9B40DA3B370692A5165E609E06EC63DAF4C4964982DFB62E
address     :C16E051F8F33B9497A5D48979F700FEBB5AEF7FA

signature :7ad05057b4f94b100a202955881484cdfeb615582da412487b57d0fb79d5148dc955217be07627c19233a923228b0c928a6611085bd659b6bd014be2b734c60c

```



