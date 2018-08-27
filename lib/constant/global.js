module.exports = {
  address: {
    acPrefix: 'ac', // account
    vaPrefix: 'va', // validator
    ctPrefix: 'ct', // contract
    acLength: 35,
    vaLength: 35,
    tmLength: 40 // 20 bytes
  },
  crypto: {
    acAddrPrefix: '12EC', // account
    vaAddrPrefix: '1E2A', // validator
    ctAddrPrefix: '1434', // contract
    privKeyPrefix: '13E9',
    pubKeyPrefix: '0590',
    seedHashEnco: 'hex',
    seedHashAlgo: 'sha256',
    typeEd25519: '01',
    pubkeyPrefix: '0120',
    saltSize: 32, // in bytes,
    ivSize: 16, // in bytes
    encryption: {
      cipher: 'aes-128-ctr'
    },
    kdf: { // key derivation function
      pbkdf2: {
        c: 65536,
        dklen: 64,
        hash: 'sha256',
        prf: 'hmac-sha256'
      },
      scrypt: {
        n: 16384,
        r: 8,
        p: 1,
        dklen: 64
      }
    }
  },
  id: {
    acId: 1,
    vaId: 2,
    privKeyId: 3,
    pubKeyId: 4
  },
  keyPair: {
    publicKeyLength: 64, // 32 bytes
    privateKeyLength: 128, // 64 bytes
    seedHashLength: 64 // 32 bytes
  }
}