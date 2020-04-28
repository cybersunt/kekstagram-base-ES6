import {getOriginalPhotos, saveOriginalPhotos, getCurrentPhotos, savePhotos} from './data.js';
import {load} from './backend.js';
import renderPhotos from './gallery.js';
import uploadPhoto from './editor.js';

function onError(message) {
  console.log(message);
  // window.messages.showError(message);
}

function onSuccess(data) {
  savePhotos(data);
  saveOriginalPhotos(data);
  const photos = getOriginalPhotos();
  renderPhotos(photos);
  uploadPhoto();
}

load('https://javascript.pages.academy/kekstagram/dat', 'GET', onSuccess, onError);
