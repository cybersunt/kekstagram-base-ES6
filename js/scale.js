import * as constants from './constants.js';

let currentZoomValue = 1;

const editingWindow = document.querySelector(`.img-upload`);
const editingWindowFilters = editingWindow.querySelector(`.img-upload__preview img`);

const enlargePictureBtn = editingWindow.querySelector(`.scale__control--bigger`);
const reducePictureBtn = editingWindow.querySelector(`.scale__control--smaller`);
const pictureZoomingValue = editingWindow.querySelector(`.scale__control--value`);

const zoomPicture = (zoomValue) => {
  if (currentZoomValue < zoomValue && currentZoomValue >= constants.SCALE_MIN_ZOOM) {
    currentZoomValue += constants.SCALE_STEP_RESIZE;
  }
  if (currentZoomValue > zoomValue && currentZoomValue <= constants.SCALE_MAX_ZOOM) {
    currentZoomValue -= constants.SCALE_STEP_RESIZE;
  }
  return currentZoomValue;
};

const setScale = (evt) => {
  let valueZoom = null;
  if (evt.target.classList.contains(`scale__control--smaller`)) {
    valueZoom = zoomPicture(constants.SCALE_MIN_ZOOM);
  }

  if (evt.target.classList.contains(`scale__control--bigger`)) {
    valueZoom = zoomPicture(constants.SCALE_MAX_ZOOM);
  }

  pictureZoomingValue.value = valueZoom * constants.SCALE_PERCENTS + `%`;
  editingWindowFilters.style.transform = `scale(` + valueZoom + `)`;
};

const addZoomPhoto = () => {
  enlargePictureBtn.addEventListener(`click`, setScale);
  reducePictureBtn.addEventListener(`click`, setScale);
};

const removeZoomPhoto = () => {
  enlargePictureBtn.removeEventListener(`click`, setScale);
  reducePictureBtn.removeEventListener(`click`, setScale);
};

export {addZoomPhoto, removeZoomPhoto};
