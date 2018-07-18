module.exports = {
  crypto: {
    encoding: 'hex',
    algorithm: 'sha256',
    typeEd25519: '01',
    pubkeyPrefix: '0120',
    saltSize: 32, // in bytes,
    ivSize: 16, // in bytes
    encryption: {
      cipher: 'aes-128-ctr',
    },
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