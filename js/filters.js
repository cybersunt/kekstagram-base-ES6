import * as constants from './constants.js';
import * as utils from './utils.js';

const editingWindow = document.querySelector(`.img-upload`);
const editingWindowFilters = editingWindow.querySelector(`.img-upload__preview img`);
const pictureZoomingValue = editingWindow.querySelector(`.scale__control--value`);
const filters = editingWindow.querySelector(`.effects`);
const toggleSlider = editingWindow.querySelector(`.effect-level__pin`);
const effectsLevel = editingWindow.querySelector(`.effect-level`);
const sliderBar = editingWindow.querySelector(`.effect-level__line`);
const sliderBarFill = editingWindow.querySelector(`.effect-level__depth`);

let currentFilterValue = 1;
let currentFilter = `none`;

const settingsEffects = {
  chrome: {
    NAME: `chrome`,
    MIN: 0,
    MAX: 1
  },
  sepia: {
    NAME: `sepia`,
    MIN: 0,
    MAX: 1
  },
  marvin: {
    NAME: `marvin`,
    MIN: 0,
    MAX: 100
  },
  phobos: {
    NAME: `phobos`,
    MIN: 0,
    MAX: 3
  },
  heat: {
    NAME: `heat`,
    MIN: 1,
    MAX: 3
  }
};

const setFilter = (evt) => {
  if (evt.target.checked) {
    currentFilter = evt.target.value;
    editingWindowFilters.className = `effects__preview--` + currentFilter;
    toggleSlider.style.left = constants.DEFAULT_EFFECT_LEVEL;
    sliderBarFill.style.width = constants.DEFAULT_EFFECT_LEVEL;
    utils.removeClassName(effectsLevel, `hidden`);
    setFilterSaturation(constants.DEFAULT_FILTER_VALUE);
  }
};

const getCurrentFilterValue = (filter, filterValue) => filter.MIN + (filter.MAX - filter.MIN) * filterValue;

const setDefaultSettings = () => {
  pictureZoomingValue.value = constants.SCALE_PERCENTS + `%`;
  editingWindowFilters.style = null;
  utils.addClassName(effectsLevel, `hidden`);
};

const setFilterSaturation = (filterValue) => checkUseFilter(currentFilter, filterValue);

const checkUseFilter = (filterName, filterValue) => {
  switch (filterName) {
    case settingsEffects.chrome.NAME:
      editingWindowFilters.style.filter = `grayscale(` + getCurrentFilterValue(settingsEffects.chrome, filterValue) + `)`;
      break;
    case settingsEffects.sepia.NAME:
      editingWindowFilters.style.filter = `sepia(` + getCurrentFilterValue(settingsEffects.sepia, filterValue) + `)`;
      break;
    case settingsEffects.marvin.NAME:
      editingWindowFilters.style.filter = `invert(` + getCurrentFilterValue(settingsEffects.marvin, filterValue) + `%)`;
      break;
    case settingsEffects.phobos.NAME:
      editingWindowFilters.style.filter = `blur(` + getCurrentFilterValue(settingsEffects.phobos, filterValue) + `px)`;
      break;
    case settingsEffects.heat.NAME:
      editingWindowFilters.style.filter = `brightness(` + getCurrentFilterValue(settingsEffects.heat, filterValue) + `)`;
      break;
    default:
      setDefaultSettings();
  }
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  const SLIDER_WIDTH = toggleSlider.offsetWidth;

  const LimitMovementX = {
    min: sliderBar.offsetLeft - SLIDER_WIDTH,
    max: sliderBar.offsetLeft + sliderBar.offsetWidth - SLIDER_WIDTH
  };

  let startCoordsX = evt.clientX;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    let shiftSlider = startCoordsX - moveEvt.clientX;

    let toggleSliderCoord = toggleSlider.offsetLeft - shiftSlider;

    startCoordsX = moveEvt.clientX;

    if (toggleSliderCoord < LimitMovementX.min) {
      toggleSliderCoord = LimitMovementX.min;
    } else if (toggleSliderCoord > LimitMovementX.max) {
      toggleSliderCoord = LimitMovementX.max;
    }

    toggleSlider.style.left = toggleSliderCoord + `px`;
    sliderBarFill.style.width = toggleSliderCoord + `px`;

    currentFilterValue = toggleSliderCoord / (LimitMovementX.max - LimitMovementX.min);
    setFilterSaturation(currentFilterValue);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

const applyEffect = () => {
  filters.addEventListener(`click`, setFilter);
  toggleSlider.addEventListener(`mousedown`, onMouseDown);
};

const cancelEffect = () => {
  filters.removeEventListener(`click`, setFilter);
  toggleSlider.removeEventListener(`mousedown`, onMouseDown);
};

export {applyEffect, cancelEffect};
