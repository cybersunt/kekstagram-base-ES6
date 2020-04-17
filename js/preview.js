'use strict';

(function () {
  const galleryOverlay = document.querySelector('body');
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const usersMessages = bigPicture.querySelector('.social__comments');
  const messagesCounter = bigPicture.querySelector('.social__comment-count');
  const messagesLoader = bigPicture.querySelector('.comments-loader');
  const closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

  const createMessage = (comment) => {
    const userMessage = window.utils.createDOMElement(`li`, `social__comment`);
    const userMessageText = window.utils.createDOMElement(`p`, `social__text`);
    const userMessagePicture = window.utils.createDOMElement(`img`, `social__picture`);

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
    window.utils.removeChilds(usersMessages);
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

    window.utils.addClassName(messagesCounter, `hidden`);
    window.utils.addClassName(messagesLoader, `hidden`);

    window.utils.addClassName(galleryOverlay, `modal-open`);
    window.utils.removeClassName(bigPicture, `hidden`);

    closeBigPictureBtn.addEventListener(`click`, onPictureCloseBtnClick);
    document.addEventListener(`keydown`, onPictureCloseKeyDown);
  };

  const onPictureCloseBtnClick = ()=> closeBigPicture();

  const onPictureCloseKeyDown = (evt) => {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      closeBigPicture();
    }
  };


  const closeBigPicture = ()=> {
    window.utils.removeClassName(galleryOverlay, `modal-open`);
    window.utils.addClassName(bigPicture, `hidden`);
    closeBigPictureBtn.removeEventListener(`click`, onPictureCloseBtnClick);
    document.removeEventListener(`keydown`, onPictureCloseKeyDown);
  };

  const showPhoto = (arrayPictures) => {
    pictures.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`picture__img`)) {
        const pictureNumber = evt.target.dataset.id;
        openBigPicture(arrayPictures, pictureNumber);
      }
    });

    pictures.addEventListener(`keydown`, (evt) => {
      if (evt.target.classList.contains(`picture`)) {
        const pictureNumber = evt.target.querySelector(`img`).dataset.id;
        if (evt.keyCode === window.constants.KEYCODE_ENTER) {
          openBigPicture(arrayPictures, pictureNumber);
        }
      }
    });;
  };

  window.preview = {
    showPhoto: showPhoto
  };
})();
