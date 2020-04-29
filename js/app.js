import * as data from './data.js';
import * as backend from './backend.js';
import * as messages from './messages.js';
import * as gallery from './gallery.js';
import * as editor from './editor.js';

const onError = (message) => messages.showError(message);

const onSuccess = (serverData) =>  {
  data.savePhotos(serverData);
  data.saveOriginalPhotos(serverData);
  const photos = getOriginalPhotos();
  gallery.renderPhotos(photos);
  editor.uploadPhoto();
};

backend.load('https://javascript.pages.academy/kekstagram/data', 'GET', onSuccess, onError);
