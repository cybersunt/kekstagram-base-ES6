'use strict';

(function () {
  const galleryOverlay = document.querySelector('body');

  const editingWindow = document.querySelector('.img-upload');
  const fileUploadButton = editingWindow.querySelector('.img-upload__input');
  const previewWindow = editingWindow.querySelector('.img-upload__overlay');
  const effectsLevel = editingWindow.querySelector('.effect-level');
  const closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
  const submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');
  const editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  const pictureZoomingValue = editingWindow.querySelector('.scale__control--value');
  const editingWindowHashtags = editingWindow.querySelector('.text__hashtags');
  const editingWindowComment = editingWindow.querySelector('.text__description');

  const resetSettings = () => {
    editingWindowComment.value = ``;
    editingWindowHashtags.value = ``;
    editingWindowFilters.style = null;
    editingWindowFilters.className = `effects__preview--none`;
    pictureZoomingValue.value = window.constants.SCALE_PERCENTS + `%`;
    window.utils.addClassName(effectsLevel, `hidden`);
  };

  const openEditingWindow = ()=> {
    resetSettings();
    // dom manipulation
    window.utils.addClassName(galleryOverlay, `modal-open`);
    window.utils.removeClassName(previewWindow, `hidden`);
    window.utils.addClassName(effectsLevel, `hidden`);

    // event handlers
    window.form.initValidation();
    window.filters.applyEffect();
    window.scale.addZoomPhoto();

    closePreviewWindowBtn.addEventListener(`click`, closeEditingWindow);
    submitPhotoBtn.addEventListener(`submit`, closeEditingWindow);
    document.addEventListener(`keydown`, onEditingWindowKeyDown);
  };

  const closeEditingWindow = ()=> {
    // dom manipulation
    fileUploadButton.value = ``;
    window.utils.addClassName(previewWindow, `hidden`);
    window.utils.removeClassName(galleryOverlay, `modal-open`);

    // event handlers
    window.form.breakValidation();
    window.filters.cancelEffect();
    window.scale.removeZoomPhoto();

    closePreviewWindowBtn.removeEventListener(`click`, closeEditingWindow);
    submitPhotoBtn.removeEventListener(`submit`, closeEditingWindow);
    document.removeEventListener(`keydown`, onEditingWindowKeyDown);
  };

  const onEditingWindowKeyDown = ()=> {
    if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
      if (evt.keyCode === window.constants.KEYCODE_ESC) {
        closeEditingWindow();
      }
    }
  };

  const uploadPhoto = () => fileUploadButton.addEventListener('change', openEditingWindow);

  window.editor = {
    uploadPhoto: uploadPhoto
  };
})();
