import generateMocksData from './data.js';
import renderPhotos from './gallery.js';
import uploadPhoto from './editor.js';

const dataMocks = generateMocksData();
renderPhotos(dataMocks);
uploadPhoto();
