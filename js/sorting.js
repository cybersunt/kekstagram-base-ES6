import * as constants from './constants.js';
import * as utils from './utils.js';
import * as data from './data.js';
import * as gallery from './gallery.js';
import {debounce} from './debounce.js';

const sortImages = document.querySelector(`.img-filters`);
const sortButtons = sortImages.querySelectorAll(`.img-filters__button`);
const defaultPhotosButtonSort = sortImages.querySelector(`#filter-default`);
const randomPhotosButtonSort = sortImages.querySelector(`#filter-random`);
const discussedPhotosButtonSort = sortImages.querySelector(`#filter-discussed`);

const getDiscussedPhotos = (photos) => {
  const mappedPhotos = photos.map(function (element, i) {
    return {index: i, value: element.comments.length};
  });

  mappedPhotos.sort(function (a, b) {
    return b.value - a.value;
  });

  const discussedPictures = mappedPhotos.map(function (element) {
    return photos[element.index];
  });

  return discussedPictures;
};

const getSomeRandomPhotos = (photos) => {
  let someRandomPhotos = photos.map(function (element) {
    return [element, Math.random()];
  })
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .map(function (element) {
      return element[0];
    })
    .slice((photos.length - constants.MAX_LENGTH_GALLERY), photos.length);

  return someRandomPhotos;
};

const sortByDefault = (evt) =>  {
  changeActiveButton(evt);

  const photos = data.getOriginalPhotos();
  data.savePhotos(photos);

  gallery.removePhotos();
  gallery.renderPhotos(photos);
};

const sortByDiscussedPhotos = (evt) => {
  changeActiveButton(evt);

  const photos = data.getOriginalPhotos();

  const discussedPhotos = getDiscussedPhotos(photos);
  data.savePhotos(discussedPhotos);

  gallery.removePhotos();
  gallery.renderPhotos(discussedPhotos);
};

const sortBySomeRandomPhotos = (evt) => {
  changeActiveButton(evt);

  const photos = data.getOriginalPhotos();

  const randomPhotos = getSomeRandomPhotos(photos);
  data.savePhotos(randomPhotos);

  gallery.removePhotos();
  gallery.renderPhotos(randomPhotos);
};

const changeActiveButton = (evt) =>  {
  sortButtons.forEach(function (element) {
    utils.removeClassName(element, `img-filters__button--active`);
  });
  utils.addClassName(evt.target, `img-filters__button--active`);
};

const init = () => {
  utils.removeClassName(sortImages, `img-filters--inactive`);

  defaultPhotosButtonSort.addEventListener(`click`, debounce(sortByDefault));
  discussedPhotosButtonSort.addEventListener(`click`, debounce(sortByDiscussedPhotos));
  randomPhotosButtonSort.addEventListener(`click`, debounce(sortBySomeRandomPhotos));
};

export {init};
