'use strict';

(function () {
  const dataMocks = window.data.generateMocksData();
  window.gallery.renderPhotos(dataMocks);
  window.editor.uploadPhoto();
})();
