var TenderKeys = require('./lib/tenderkeys.js');

if (typeof windows !== 'undefined' && typeof window.TenderKeys === 'undefined') {
  window.TenderKeys = TenderKeys;
}

module.exports = TenderKeys;
