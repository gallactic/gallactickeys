'use strict'

var tenderKeys = typeof window !== 'undefined' ? window.TenderKeys : require('../index');
var expect = typeof window !== 'undefined' ? window.expect : require('chai').expect;

describe('Tenderkeys', function () {
  it('create - should return expected response', function () {
    var testData = [{
      input: {
        seed: 'shadow outside hint dish fortune boss oak album gym all mask there'
      },
      res: {
        seed: 'shadow outside hint dish fortune boss oak album gym all mask there',
        seedHashed: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9',
        keyPair: {
          publicKey: 'BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE',
          privateKey: '0A0766C934FAFE80E73A088B25406291AA6959B34446D82D2DD698C88100EDD9BD9E00FA32C8D1826EA4436F3817F800D201E0756A14735C4D2F72F30D11B1BE'
        }
      }
    }, {
      input: {
        seed: 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect'
      },
      res: {
        seed: 'vendor oxygen nation vacuum promote excess sick weekend task decrease aware neglect',
        seedHashed: '8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D',
        keyPair: {
          publicKey: '774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08',
          privateKey: '8EAB2233E0DCE2F1337BD491B2EB04CA6C8334B60C1FB0D1A9B6C80CABF1765D774D6DC700FB0BDE7924BA1CA27EDAEC9F51939824BC20300FAA468285AEDE08'
        }
      }
    }]

    testData.forEach(e => {
      let result = tenderKeys.create(e.input);
      expect(result.seed).to.equal(e.res.seed);
      expect(result.seedHashed).to.equal(e.res.seedHashed)
      expect(result.keyPair.publicKey).to.equal(e.res.keyPair.publicKey);
      expect(result.keyPair.privateKey).to.equal(e.res.keyPair.privateKey);
    });
  });
});
