'use strict';

// const
const KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

var SCALE_PERCENTS = 100;
var SCALE_STEP_RESIZE = 0.25;
var SCALE_MIN_ZOOM = 0.25;
var SCALE_MAX_ZOOM = 1;

var DEFAULT_FILTER_VALUE = 0.2;
var DEFAULT_EFFECT_LEVEL = '100%';
var DEFAULT_FILTER_NAME = 'none';

var INVALID_QUATITY_HASHTAGS = 'Вы можете добавить максимум 5 хэш-тегов';
var INVALID_SIMILAR_HASHTAGS = 'Хэш-теги должны быть уникальными, невзирая на регистр';
var INVALID_HASHTAG = 'Хэш-тэг должен начинаться с # и состоять только из букв и цифр. Между хэш-тегами должен быть пробел';
var HASHTAGS_STATUS_OK = 'правильно';
var MAX_COUNT_HASHTAGS = 5;

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
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector(`.big-picture`);
const usersMessages = bigPicture.querySelector(`.social__comments`);
const messagesCounter = bigPicture.querySelector(`.social__comment-count`);
const messagesLoader = bigPicture.querySelector(`.comments-loader`);
const closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

// gallery.js
const renderPicture = (image, pictureIndex) =>{
  const picturesTemplate = document.querySelector(`#picture`).content;
  const picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector(`.picture__img`).src = image.url;
  picturesElement.querySelector(`.picture__likes`).textContent = image.likes;
  picturesElement.querySelector(`.picture__comments`).textContent = image.comments.length;
  picturesElement.querySelector('.picture img').dataset.id = pictureIndex;

  return picturesElement;
};

const renderPicturesList = (arrayPictures) => {
  const picturesList = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();

  arrayPictures.forEach((el, index) => fragment.appendChild(renderPicture(el, index)));

  pictures.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      var pictureNumber = evt.target.dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  pictures.addEventListener('keydown', (evt) => {
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

const onPictureCloseBtnClick = ()=> closeBigPicture();

const onPictureCloseKeyDown = (evt) => {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeBigPicture();
  }
};

const closeBigPicture = ()=> {
  removeClassName(galleryOverlay, 'modal-open');
  addClassName(bigPicture, 'hidden');
  closeBigPictureBtn.removeEventListener('click', onPictureCloseBtnClick);
  document.removeEventListener('keydown', onPictureCloseKeyDown);
};

// editor.js
const editingWindow = document.querySelector('.img-upload');
const fileUploadButton = editingWindow.querySelector('.img-upload__input');
const previewWindow = editingWindow.querySelector('.img-upload__overlay');

const closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
const submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');

var filters = editingWindow.querySelector('.effects');
var effectsLevel = editingWindow.querySelector('.effect-level');
var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
var toggleSlider = editingWindow.querySelector('.effect-level__pin');
var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

// var editingForm = editingWindow.querySelector('.img-upload__form');
const editingWindowHashtags = editingWindow.querySelector('.text__hashtags');
const editingWindowComment = editingWindow.querySelector('.text__description');

// var currentFilterValue = 1;
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
  editingWindowFilters.style = false;
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

var currentZoomValue = 1;

var enlargePictureBtn = editingWindow.querySelector('.scale__control--bigger');
var reducePictureBtn = editingWindow.querySelector('.scale__control--smaller');
var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

var zoomPicture = function (zoomValue) {
  if (currentZoomValue < zoomValue && currentZoomValue >= SCALE_MIN_ZOOM) {
    currentZoomValue += SCALE_STEP_RESIZE;
  }
  if (currentZoomValue > zoomValue && currentZoomValue <= SCALE_MAX_ZOOM) {
    currentZoomValue -= SCALE_STEP_RESIZE;
  }
  return currentZoomValue;
};

var setScale = function (evt) {
  var valueZoom;
  if (evt.target.classList.contains('scale__control--smaller')) {
    valueZoom = zoomPicture(SCALE_MIN_ZOOM);
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    valueZoom = zoomPicture(SCALE_MAX_ZOOM);
  }

  pictureZoomingValue.value = valueZoom * SCALE_PERCENTS + '%';
  editingWindowFilters.style.transform = 'scale(' + valueZoom + ')';
};

var checkHashtagsList = function (evt) {
  var hashtags = getArrayHashtags(evt);

  // Проверяем количество хэштэгов
  if (!checkQuantityHashtags(hashtags)) {
    return INVALID_QUATITY_HASHTAGS;
  }

  // проверяем есть ли повторяющиеся хэштэги
  if (!searchSimilarHashtags(hashtags)) {
    return INVALID_SIMILAR_HASHTAGS;
  }

  // Проверяем правильно ли хэштэги написаны
  for (var i = 0; i < hashtags.length; i++) {
    if (!checkHashtag(hashtags[i])) {
      return NVALID_HASHTAG;
    }
  }
  // если всё ок
  return HASHTAGS_STATUS_OK;
}

var getArrayHashtags = function (evt) {
  var hashtagsString = removeExtraSpaces(evt.target.value).toLowerCase();
  return splitString(hashtagsString);
};

var splitString = function (stringToSplit) {
  return stringToSplit.split(' ');
};

var removeExtraSpaces = function (string) {
  return string.replace(/\s+/g, ' ').trim();
};

var checkQuantityHashtags = function (array) {
  if (array.length > MAX_COUNT_HASHTAGS) {
    return false;
  }
  return true;
};

var searchSimilarHashtags = function (array) {
  return !(array.some(function (element) {
    return array.indexOf(element) !== array.lastIndexOf(element);
  }));
};

var checkHashtag = function (hashtag) {
  var reg = /#([A-Za-z0-9А-Яа-я]{2,19})$/;
  return reg.test(hashtag);
};

var validate = function () {
  editingWindowHashtags.addEventListener('input', function (evt) {
    // сбрасываем статус
    editingWindowHashtags.setCustomValidity('');

    if (evt.target.value !== '') {
      // записываем результат валидации
      var validMessage = checkHashtagsList(evt);

      if (validMessage !== HASHTAGS_STATUS_OK) {
        // Если не правильно - записываем статус
        editingWindowHashtags.setCustomValidity(validMessage);
      }
    }
  });
};

const openEditingWindow = ()=> {
  // dom manipulation
  resetFilters();
  setDefaultSettings();
  addClassName(galleryOverlay, 'modal-open');
  removeClassName(previewWindow, 'hidden');
  addClassName(effectsLevel, 'hidden');

  validate();

  // event handlers
  filters.addEventListener('click', setFilter);
  toggleSlider.addEventListener('mouseup', setFilterSaturation);

  enlargePictureBtn.addEventListener('click', setScale);
  reducePictureBtn.addEventListener('click', setScale);

  closePreviewWindowBtn.addEventListener('click', closeEditingWindow);
  submitPhotoBtn.addEventListener('submit', closeEditingWindow);
  document.addEventListener('keydown', onEditingWindowKeyDown);
};

const closeEditingWindow = ()=> {
  fileUploadButton.value = '';
  // dom manipulation
  addClassName(previewWindow, 'hidden');
  removeClassName(galleryOverlay, 'modal-open');

  // event handlers
  filters.removeEventListener('click', setFilter);
  toggleSlider.removeEventListener('mouseup', setFilterSaturation);

  enlargePictureBtn.removeEventListener('click', setScale);
  reducePictureBtn.removeEventListener('click', setScale);

  closePreviewWindowBtn.removeEventListener('click', closeEditingWindow);
  submitPhotoBtn.removeEventListener('submit', closeEditingWindow);
  document.removeEventListener('keydown', onEditingWindowKeyDown);
};

const onEditingWindowKeyDown = ()=> {
  if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
    closeEditingWindow();
  }
};

fileUploadButton.addEventListener('change', openEditingWindow);
