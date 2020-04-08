'use strict';

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

// gallery.js
const renderPicture = (image) =>{
  const picturesTemplate = document.querySelector(`#picture`).content;
  const picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector(`.picture__img`).src = image.url;
  picturesElement.querySelector(`.picture__likes`).textContent = image.likes;
  picturesElement.querySelector(`.picture__comments`).textContent = image.comments.length;

  return picturesElement;
};

const renderPicturesList = (arrayPictures) => {
  const picturesList = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();

  arrayPictures.forEach((el) => fragment.appendChild(renderPicture(el)));

  picturesList.appendChild(fragment);
};

renderPicturesList(dataMocks);

// utils.js
var addClassName = function (element, className) {
  element.classList.add(className);
};

var removeClassName = function (element, className) {
  element.classList.remove(className);
};

var removeChilds = function (element) {
  element.innerHTML = ``;
};

var createDOMElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);

  return element;
};

// preview.js
var galleryOverlay = document.querySelector(`body`);
var bigPicture = document.querySelector(`.big-picture`);
var usersMessages = bigPicture.querySelector(`.social__comments`);
var messagesCounter = bigPicture.querySelector(`.social__comment-count`);
var messagesLoader = bigPicture.querySelector(`.comments-loader`);

var createMessage = function (comment) {
  var userMessage = createDOMElement(`li`, `social__comment`);
  var userMessageText = createDOMElement(`p`, `social__text`);
  var userMessagePicture = createDOMElement(`img`, `social__picture`);

  userMessageText.textContent = comment.message;

  userMessagePicture.width = 35;
  userMessagePicture.height = 35;
  userMessagePicture.alt = `Аватар автора фотографии`;
  userMessagePicture.src = comment.avatar;

  userMessage.appendChild(userMessagePicture);
  userMessage.appendChild(userMessageText);

  return userMessage;
};

var renderMessagesList = function (array) {
  removeChilds(usersMessages);
  var fragment = document.createDocumentFragment();
  array.forEach(function (el) {
    fragment.appendChild(createMessage(el));
  });
  usersMessages.appendChild(fragment);
};

var renderPreviewPicture = function (arrayPictures, pictureIndex) {
  var pictureUrl = bigPicture.querySelector(`.big-picture__img img`);
  var pictureLikes = bigPicture.querySelector(`.likes-count`);
  var pictureMessagesCounter = bigPicture.querySelector(`.comments-count`);
  var pictureDescription = bigPicture.querySelector(`.social__caption`);

  pictureUrl.src = arrayPictures[pictureIndex].url;
  pictureLikes.textContent = arrayPictures[pictureIndex].likes;
  pictureMessagesCounter.textContent = arrayPictures[pictureIndex].comments.length;
  pictureDescription.textContent = arrayPictures[pictureIndex].description;
}

var openBigPicture = function (arrayPictures, pictureIndex) {
  renderPreviewPicture(arrayPictures, pictureIndex);
  renderMessagesList(arrayPictures[pictureIndex].comments);

  addClassName(messagesCounter, `hidden`);
  addClassName(messagesLoader, `hidden`);

  addClassName(galleryOverlay, `modal-open`);
  removeClassName(bigPicture, `hidden`);
};

openBigPicture(dataMocks, 0);
