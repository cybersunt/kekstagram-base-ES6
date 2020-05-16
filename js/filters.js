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
    checkUseFilter(currentFilter);
  }
};

const getCurrentFilterValue = (filter) => filter.MIN + (filter.MAX - filter.MIN) * currentFilterValue;

const setDefaultSettings = () => {
  pictureZoomingValue.value = constants.SCALE_PERCENTS + `%`;
  editingWindowFilters.style = null;
  utils.addClassName(effectsLevel, `hidden`);
};

const checkUseFilter = (filterName) => {
  const switchFilters = {
    'chrome': `grayscale(${getCurrentFilterValue(settingsEffects.chrome)})`,
    'sepia': `sepia(${getCurrentFilterValue(settingsEffects.sepia)})`,
    'marvin': `invert(${getCurrentFilterValue(settingsEffects.marvin)}%)`,
    'phobos': `blur(${getCurrentFilterValue(settingsEffects.phobos)}px)`,
    'heat': `brightness(${getCurrentFilterValue(settingsEffects.heat)})`
  };

  if (filterName !== constants.DEFAULT_FILTER_NAME) {
    editingWindowFilters.style.filter = switchFilters[filterName];
  } else {
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
    }
    if (toggleSliderCoord > LimitMovementX.max) {
      toggleSliderCoord = LimitMovementX.max;
    }

    toggleSlider.style.left = toggleSliderCoord + `px`;
    sliderBarFill.style.width = toggleSliderCoord + `px`;

    currentFilterValue = toggleSliderCoord / (LimitMovementX.max - LimitMovementX.min);
    checkUseFilter(currentFilter);
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
