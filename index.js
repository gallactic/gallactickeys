var GallacticKeys = require('./lib/gallactickeys.js');

if (typeof windows !== 'undefined' && typeof window.GallacticKeys === 'undefined') {
  window.GallacticKeys = GallacticKeys;
}

module.exports = GallacticKeys;
