'use strict';

// const
var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

var SCALE_PERCENTS = 100;

var DEFAULT_FILTER_VALUE = 1;
var DEFAULT_EFFECT_LEVEL = '100%';
var DEFAULT_FILTER_NAME = 'none';

// utils.js
const addClassName = (element, className) => element.classList.add(className);

const removeClassName = (element, className) => element.classList.remove(className);

const removeChilds = (element) => {
  element.innerHTML = ``;
};

const createDOMElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);

  return element;
};

// data.js
const DataPictures = {
  COUNT_PHOTOS: 25,

  MIN_LIKES: 15,
  MAX_LIKES: 200,

  MIN_AVATAR_NUM: 1,
  MAX_AVATAR_NUM: 6,

  MESSAGES: [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ],

  USER_NAMES: [`Артем`, `Игорь`, `Марина`, `Динара`, `Вадим`, `Сергей`]
};

const generateSrcImage = () => {
  const numberImage = getRandomNumber(DataPictures.MIN_AVATAR_NUM, DataPictures.MAX_AVATAR_NUM);
  return `img/avatar-${numberImage}.svg`;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const getRandomElement = (array) => {
  const randomIndex = getRandomNumber(1, array.length - 1);
  const randomElement = array[randomIndex];
  return randomElement;
};

const generateMessages = () => {
  const messages = [];

  const countComments = getRandomNumber(DataPictures.MIN_AVATAR_NUM, DataPictures.MAX_AVATAR_NUM - 1);

  for (let i = 0; i < countComments; i++) {
    messages.push({
      avatar: generateSrcImage(DataPictures.MIN_AVATAR_NUM, DataPictures.MAX_AVATAR_NUM),
      name: getRandomElement(DataPictures.USER_NAMES),
      message: getRandomElement(DataPictures.MESSAGES)
    });
  }

  return messages;
};

const generateMocksData = ()=> {
  const notes = [];

  for (let i = 1; i < DataPictures.COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: `photos/${i}.jpg`,
      likes: getRandomNumber(DataPictures.MIN_LIKES, DataPictures.MAX_LIKES),
      comments: generateMessages(),
      description: getRandomElement(DataPictures.MESSAGES)
    });
  }

  return notes;
};

const dataMocks = generateMocksData();

// variables
const galleryOverlay = document.querySelector(`body`);
var pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector(`.big-picture`);
const usersMessages = bigPicture.querySelector(`.social__comments`);
const messagesCounter = bigPicture.querySelector(`.social__comment-count`);
const messagesLoader = bigPicture.querySelector(`.comments-loader`);
var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

// gallery.js
const renderPicture = (image, pictureIndex) =>{
  const picturesTemplate = document.querySelector(`#picture`).content;
  const picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector(`.picture__img`).src = image.url;
  picturesElement.querySelector(`.picture__likes`).textContent = image.likes;
  picturesElement.querySelector(`.picture__comments`).textContent = image.comments.length;
  picturesElement.querySelector('.picture img').setAttribute('data-id', pictureIndex);

  return picturesElement;
};

const renderPicturesList = (arrayPictures) => {
  const picturesList = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();

  arrayPictures.forEach((el, index) => fragment.appendChild(renderPicture(el, index)));

  pictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var pictureNumber = evt.target.dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  pictures.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('picture')) {
      var pictureNumber = evt.target.querySelector('img').dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  picturesList.appendChild(fragment);
};

renderPicturesList(dataMocks);

// preview.js
const createMessage = (comment) => {
  const userMessage = createDOMElement(`li`, `social__comment`);
  const userMessageText = createDOMElement(`p`, `social__text`);
  const userMessagePicture = createDOMElement(`img`, `social__picture`);

  userMessageText.textContent = comment.message;

  userMessagePicture.width = 35;
  userMessagePicture.height = 35;
  userMessagePicture.alt = `Аватар автора фотографии`;
  userMessagePicture.src = comment.avatar;

  userMessage.appendChild(userMessagePicture);
  userMessage.appendChild(userMessageText);

  return userMessage;
};

const renderMessagesList = (array) => {
  removeChilds(usersMessages);
  const fragment = document.createDocumentFragment();
  array.forEach(function (el) {
    fragment.appendChild(createMessage(el));
  });
  usersMessages.appendChild(fragment);
};

const renderPreviewPicture = (arrayPictures, pictureIndex) => {
  const pictureUrl = bigPicture.querySelector(`.big-picture__img img`);
  const pictureLikes = bigPicture.querySelector(`.likes-count`);
  const pictureMessagesCounter = bigPicture.querySelector(`.comments-count`);
  const pictureDescription = bigPicture.querySelector(`.social__caption`);
  pictureUrl.src = arrayPictures[pictureIndex].url;
  pictureLikes.textContent = arrayPictures[pictureIndex].likes;
  pictureMessagesCounter.textContent = arrayPictures[pictureIndex].comments.length;
  pictureDescription.textContent = arrayPictures[pictureIndex].description;
};

const openBigPicture = (arrayPictures, pictureIndex) => {
  renderPreviewPicture(arrayPictures, pictureIndex);
  renderMessagesList(arrayPictures[pictureIndex].comments);

  addClassName(messagesCounter, `hidden`);
  addClassName(messagesLoader, `hidden`);

  addClassName(galleryOverlay, `modal-open`);
  removeClassName(bigPicture, `hidden`);

  closeBigPictureBtn.addEventListener('click', onPictureCloseBtnClick);
  document.addEventListener('keydown', onPictureCloseKeyDown);
};

var onPictureCloseBtnClick = function () {
  closeBigPicture();
};

var onPictureCloseKeyDown = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  removeClassName(galleryOverlay, 'modal-open');
  addClassName(bigPicture, 'hidden');
  closeBigPictureBtn.removeEventListener('click', onPictureCloseBtnClick);
  document.removeEventListener('keydown', onPictureCloseKeyDown);
};

// editor.js
var editingWindow = document.querySelector('.img-upload');
var fileUploadButton = editingWindow.querySelector('.img-upload__input');
var previewWindow = editingWindow.querySelector('.img-upload__overlay');

var closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
var submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');

var filters = editingWindow.querySelector('.effects');
var effectsLevel = editingWindow.querySelector('.effect-level');
var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
var toggleSlider = editingWindow.querySelector('.effect-level__pin');
var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

var editingForm = editingWindow.querySelector('.img-upload__form');
var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');
var editingWindowComment = editingWindow.querySelector('.text__description');

var currentFilterValue = 1;
var currentFilter = 'none';

var settingsEffects = {
  chrome: {
    NAME: 'chrome',
    MIN: 0,
    MAX: 1
  },
  sepia: {
    NAME: 'sepia',
    MIN: 0,
    MAX: 1
  },
  marvin: {
    NAME: 'marvin',
    MIN: 0,
    MAX: 100
  },
  phobos: {
    NAME: 'phobos',
    MIN: 0,
    MAX: 3
  },
  heat: {
    NAME: 'heat',
    MIN: 1,
    MAX: 3
  }
};

var resetFilters = function () {
  editingWindowComment.value = '';
  editingWindowHashtags.value = '';
  editingWindowFilters.className = 'effects__preview--none';
  editingWindowFilters.style = null;
};

var setFilter = function (evt) {
  if (evt.target.checked) {
    currentFilter = evt.target.value;
    editingWindowFilters.className = 'effects__preview--' + currentFilter;
    removeClassName(effectsLevel, 'hidden');
    setFilterSaturation(DEFAULT_FILTER_VALUE);
  }
};

var getCurrentFilterValue = function (filter, filterValue) {
  return (filter.MAX - filter.MIN) * filterValue;
};

var setDefaultSettings = function () {
  pictureZoomingValue.value = SCALE_PERCENTS + '%';
  editingWindowFilters.removeAttribute('style');
  addClassName(effectsLevel, 'hidden');
};

var setFilterSaturation = function (filterValue) {
  checkUseFilter(currentFilter, filterValue);
};

var checkUseFilter = function (filterName, filterValue) {
  switch (filterName) {
    case settingsEffects.chrome.NAME:
      editingWindowFilters.style.filter = 'grayscale(' + getCurrentFilterValue(settingsEffects.chrome, filterValue) + ')';
      break;
    case settingsEffects.sepia.NAME:
      editingWindowFilters.style.filter = 'sepia(' + getCurrentFilterValue(settingsEffects.sepia, filterValue) + ')';
      break;
    case settingsEffects.marvin.NAME:
      editingWindowFilters.style.filter = 'invert(' + getCurrentFilterValue(settingsEffects.marvin, filterValue) + '%)';
      break;
    case settingsEffects.phobos.NAME:
      editingWindowFilters.style.filter = 'blur(' + getCurrentFilterValue(settingsEffects.phobos, filterValue) + 'px)';
      break;
    case settingsEffects.heat.NAME:
      editingWindowFilters.style.filter = 'brightness(' + getCurrentFilterValue(settingsEffects.heat, filterValue) + ')';
      break;
    default:
      setDefaultSettings();
  }
};

var openEditingWindow = function () {
  resetFilters();
  addClassName(galleryOverlay, 'modal-open');
  removeClassName(previewWindow, 'hidden');
  addClassName(effectsLevel, 'hidden');

  filters.addEventListener('click', setFilter);
  toggleSlider.addEventListener('mouseup', setFilterSaturation);

  closePreviewWindowBtn.addEventListener('click', closeEditingWindow);
  submitPhotoBtn.addEventListener('submit', closeEditingWindow);
  document.addEventListener('keydown', onEditingWindowKeyDown);
};

var closeEditingWindow = function () {
  addClassName(previewWindow, 'hidden');
  removeClassName(galleryOverlay, 'modal-open');

  filters.removeEventListener('click', setFilter);
  toggleSlider.removeEventListener('mouseup', setFilterSaturation);

  closePreviewWindowBtn.removeEventListener('click', closeEditingWindow);
  submitPhotoBtn.removeEventListener('submit', closeEditingWindow);
  document.removeEventListener('keydown', onEditingWindowKeyDown);
};

var onEditingWindowKeyDown = function () {
  if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
    closeEditingWindow();
  }
};

fileUploadButton.addEventListener('change', openEditingWindow);
