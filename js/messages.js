import * as utils from './utils.js';

const overlay = document.querySelector(`body`);

const onErrorMessageBtnCloseClick = ()=> {
  removeErrorMessage();
};

const onSuccessMessageBtnCloseClick = ()=> {
  removeSuccessMessage();
};

const onErrorMessageCloseClick = (evt)=> {
  if (evt.target === document.querySelector(`.error`)) {
    removeErrorMessage();
  }
};

const onSuccessMessageCloseClick = (evt)=> {
  if (evt.target === document.querySelector(`.success`)) {
    removeSuccessMessage();
  }
};

const onErrorMessageCloseKeyDown = (evt)=> {
  utils.isEscEvent(evt, removeErrorMessage);
};

const onSuccessMessageCloseKeyDown = (evt) => {
  utils.isEscEvent(evt, removeSuccessMessage);
};

const removeErrorMessage = () => {
  const message = document.querySelector(`.error`);
  const messageBtnClose = message.querySelector(`.error__button`);
  message.remove();

  messageBtnClose.removeEventListener(`click`, onErrorMessageBtnCloseClick);
  document.removeEventListener(`click`, onErrorMessageCloseClick);
  document.removeEventListener(`keydown`, onErrorMessageCloseKeyDown);
};

const removeSuccessMessage = () => {
  const message = document.querySelector(`.success`);
  const messageBtnClose = message.querySelector(`.success__button`);
  message.remove();

  messageBtnClose.removeEventListener(`click`, onErrorMessageBtnCloseClick);
  document.removeEventListener(`click`, onSuccessMessageCloseClick);
  document.removeEventListener(`keydown`, onSuccessMessageCloseKeyDown);
};

const renderErrorMessage = (message) => {
  const template = utils.getTemplateClone(`#error`, `.error`);
  const templateMessage = template.cloneNode(true);
  const templateBtn = templateMessage.querySelector(`.error__button`);
  templateMessage.querySelector(`.error__title`).textContent = message;

  templateBtn.addEventListener(`click`, onErrorMessageBtnCloseClick);
  document.addEventListener(`click`, onErrorMessageCloseClick);
  document.addEventListener(`keydown`, onErrorMessageCloseKeyDown);

  overlay.appendChild(templateMessage);
};

const renderSuccessMessage = () => {
  const template = utils.getTemplateClone(`#success`, `.success`);
  const templateMessage = template.cloneNode(true);
  const templateBtn = templateMessage.querySelector(`.success__button`);

  templateBtn.addEventListener(`click`, onSuccessMessageBtnCloseClick);
  document.addEventListener(`click`, onSuccessMessageCloseClick);
  document.addEventListener(`keydown`, onSuccessMessageCloseKeyDown);

  overlay.appendChild(templateMessage);
};

const showError = (message)=> renderErrorMessage(message);

const showSuccess = ()=> renderSuccessMessage();

export {showError, showSuccess};
