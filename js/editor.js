import * as backend from './backend.js';
import * as messages from './messages.js';
import * as constants from './constants.js';
import * as utils from './utils.js';
import * as picture from './picture.js';
import * as form from './form.js';
import * as filters from './filters.js';
import * as scale from './scale.js';

const galleryOverlay = document.querySelector(`body`);

const editingWindow = document.querySelector(`.img-upload`);
const fileUploadButton = editingWindow.querySelector(`.img-upload__input`);
const previewWindow = editingWindow.querySelector(`.img-upload__overlay`);
const effectsLevel = editingWindow.querySelector(`.effect-level`);
const closePreviewWindowBtn = editingWindow.querySelector(`.img-upload__cancel`);
const editingForm = editingWindow.querySelector(`.img-upload__form`);
const submitPhotoBtn = editingWindow.querySelector(`.img-upload__submit`);
const editingWindowFilters = editingWindow.querySelector(`.img-upload__preview img`);
const pictureZoomingValue = editingWindow.querySelector(`.scale__control--value`);
const editingWindowHashtags = editingWindow.querySelector(`.text__hashtags`);
const editingWindowComment = editingWindow.querySelector(`.text__description`);

const onEditingWindowKeyDown = (evt)=> {
  if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
    utils.isEscEvent(evt, closeEditingWindow);
  }
};

const resetSettings = () => {
  editingWindowComment.value = ``;
  editingWindowHashtags.value = ``;
  editingWindowFilters.style = null;
  editingWindowFilters.className = `effects__preview--none`;
  pictureZoomingValue.value = constants.SCALE_PERCENTS + `%`;
  utils.addClassName(effectsLevel, `hidden`);
};

const openEditingWindow = ()=> {
  resetSettings();
  // dom manipulation
  utils.addClassName(galleryOverlay, `modal-open`);
  utils.removeClassName(previewWindow, `hidden`);
  utils.addClassName(effectsLevel, `hidden`)

  picture.uploadFile();

  // event handlers
  form.initValidation();
  filters.applyEffect();
  scale.addZoomPhoto();

  closePreviewWindowBtn.addEventListener(`click`, closeEditingWindow);
  editingForm.addEventListener(`submit`, sendData);
  submitPhotoBtn.addEventListener(`submit`, closeEditingWindow);
  document.addEventListener(`keydown`, onEditingWindowKeyDown);
};

const closeEditingWindow = ()=> {
  // dom manipulation
  fileUploadButton.value = ``;
  utils.addClassName(previewWindow, `hidden`);
  utils.removeClassName(galleryOverlay, `modal-open`);

  // event handlers
  form.breakValidation();
  filters.cancelEffect();
  scale.removeZoomPhoto();

  closePreviewWindowBtn.removeEventListener(`click`, closeEditingWindow);
  editingForm.removeEventListener(`submit`, sendData);
  submitPhotoBtn.removeEventListener(`submit`, closeEditingWindow);
  document.removeEventListener(`keydown`, onEditingWindowKeyDown);
};

const onSuccess = () => {
  closeEditingWindow();
  messages.showSuccess();
};

const onError = (message) => {
  closeEditingWindow();
  messages.showError(message);
};

const sendData = (evt) => {
  evt.preventDefault();
  backend.upload(new FormData(editingForm), `https://javascript.pages.academy/kekstagram/`, `POST`, onSuccess, onError);
};

const uploadPhoto = () => fileUploadButton.addEventListener(`change`, openEditingWindow);

export {uploadPhoto};
