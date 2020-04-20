'use strict';

(function () {
  const  editingWindow = document.querySelector('.img-upload');
  const  editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  const  pictureZoomingValue = editingWindow.querySelector('.scale__control--value');
  const  filters = editingWindow.querySelector('.effects');
  const  toggleSlider = editingWindow.querySelector('.effect-level__pin');
  const  effectsLevel = editingWindow.querySelector('.effect-level');
  // const  sliderBar = editingWindow.querySelector('.effect-level__line');
  // const  sliderBarFill = editingWindow.querySelector('.effect-level__depth');

  // let  currentFilterValue = 1;
  let  currentFilter = 'none';

  const  settingsEffects = {
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

  const setFilter = (evt) => {
    if (evt.target.checked) {
      currentFilter = evt.target.value;
      editingWindowFilters.className = `effects__preview--` + currentFilter;
      window.utils.removeClassName(effectsLevel, `hidden`);
      setFilterSaturation(window.constants.DEFAULT_FILTER_VALUE);
    }
  };

  const getCurrentFilterValue = (filter, filterValue) => (filter.MAX - filter.MIN) * filterValue;

  const setDefaultSettings = () => {
    pictureZoomingValue.value = SCALE_PERCENTS + `%`;
    editingWindowFilters.style = null;
    window.utils.addClassName(effectsLevel, `hidden`);
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

  const applyEffect = () => {
    filters.addEventListener(`click`, setFilter);
    toggleSlider.addEventListener(`mouseup`, setFilterSaturation);
  };

  const cancelEffect = () => {
    filters.removeEventListener(`click`, setFilter);
    toggleSlider.removeEventListener(`mouseup`, setFilterSaturation);
  };

  window.filters = {
    applyEffect: applyEffect,
    cancelEffect: cancelEffect
  };
})();
