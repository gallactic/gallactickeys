global.constant = {
  crypto: {
    encoding: 'hex',
    algorithm: 'sha256',
    saltSize: 32, // in bytes,
    ivSize: 16, // in bytes
    kdf: { // key derivation function
      pbkdf2: {
        c: 65536,
        dklen: 64,
        hash: 'sha256',
        prf: 'hmac-sha256'
      }
    }
  },
  keyPair: {
    addressLength: 40, // 20 bytes
    publicKeyLength: 64, // 32 bytes
    privateKeyLength: 128, // 64 bytes
    seedHashLength: 64 // 32 bytes
  }
}