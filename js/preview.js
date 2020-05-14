import * as constants from './constants.js';
import * as utils from './utils.js';
import * as data from './data.js';

const galleryOverlay = document.querySelector(`body`);
const pictures = document.querySelector(`.pictures`);
const bigPicture = document.querySelector(`.big-picture`);
const usersMessages = bigPicture.querySelector(`.social__comments`);
const messagesCounter = bigPicture.querySelector(`.social__comment-count`);
const messagesLoader = bigPicture.querySelector(`.comments-loader`);
const closeBigPictureBtn = bigPicture.querySelector(`.big-picture__cancel`);

let currentPictureIndex;

const createMessage = (comment) => {
  const userMessage = utils.createDOMElement(`li`, `social__comment`);
  const userMessageText = utils.createDOMElement(`p`, `social__text`);
  const userMessagePicture = utils.createDOMElement(`img`, `social__picture`);

  userMessageText.textContent = comment.message;

  userMessagePicture.width = constants.USER_AVATAR_SIZE;
  userMessagePicture.height = constants.USER_AVATAR_SIZE;
  userMessagePicture.alt = constants.USER_AVATAR_ALT;
  userMessagePicture.src = comment.avatar;

  userMessage.appendChild(userMessagePicture);
  userMessage.appendChild(userMessageText);

  return userMessage;
};

const renderMessagesList = (array) => {
  utils.removeChilds(usersMessages);
  const fragment = document.createDocumentFragment();
  array.forEach(function (el) {
    fragment.appendChild(createMessage(el));
  });
  return fragment;
};

const showMessageList = (pictureIndex) => {
  currentPictureIndex = pictureIndex;
  const photos = data.getCurrentPhotos();
  const messages = photos[currentPictureIndex].comments;
  usersMessages.appendChild(renderMessagesList(messages));
};

const renderPreviewPicture = (pictureIndex) => {
  const photos = data.getCurrentPhotos();
  const pictureUrl = bigPicture.querySelector(`.big-picture__img img`);
  const pictureLikes = bigPicture.querySelector(`.likes-count`);
  const pictureMessagesCounter = bigPicture.querySelector(`.comments-count`);
  const pictureDescription = bigPicture.querySelector(`.social__caption`);

  pictureUrl.src = photos[pictureIndex].url;
  pictureLikes.textContent = photos[pictureIndex].likes;
  pictureMessagesCounter.textContent = photos[pictureIndex].comments.length;
  pictureDescription.textContent = photos[pictureIndex].description;
};

const openBigPicture = (pictureIndex) => {
  renderPreviewPicture(pictureIndex);
  showMessageList(pictureIndex);

  utils.addClassName(messagesCounter, `hidden`);
  utils.addClassName(messagesLoader, `hidden`);

  utils.addClassName(galleryOverlay, `modal-open`);
  utils.removeClassName(bigPicture, `hidden`);

  closeBigPictureBtn.addEventListener(`click`, onPictureCloseBtnClick);
  document.addEventListener(`keydown`, onPictureCloseKeyDown);
};

const onPictureCloseBtnClick = ()=> closeBigPicture();

const onPictureCloseKeyDown = (evt) => utils.isEscEvent(evt, closeBigPicture);

const closeBigPicture = ()=> {
  utils.removeClassName(galleryOverlay, `modal-open`);
  utils.addClassName(bigPicture, `hidden`);
  closeBigPictureBtn.removeEventListener(`click`, onPictureCloseBtnClick);
  document.removeEventListener(`keydown`, onPictureCloseKeyDown);
};

const showPhoto = () => {
  pictures.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`picture__img`)) {
      const pictureNumber = evt.target.dataset.id;
      openBigPicture(pictureNumber);
    }
  });

  pictures.addEventListener(`keydown`, (evt) => {
    if (evt.target.classList.contains(`picture`)) {
      const pictureNumber = evt.target.querySelector(`img`).dataset.id;
      utils.isEnterEvent(evt, openBigPicture, pictureNumber);
    }
  });
};

export {showPhoto};
