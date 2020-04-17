'use strict';

(function () {
  const editingWindow = document.querySelector('.img-upload');
  const editingWindowHashtags = editingWindow.querySelector('.text__hashtags');

  const checkHashtagsList = (evt) => {
    const hashtags = getArrayHashtags(evt);

    // Проверяем количество хэштэгов
    if (!checkQuantityHashtags(hashtags)) {
      return window.constants.INVALID_QUATITY_HASHTAGS;
    }

    // проверяем есть ли повторяющиеся хэштэги
    if (!searchSimilarHashtags(hashtags)) {
      return window.constants.INVALID_SIMILAR_HASHTAGS;
    }

    // Проверяем правильно ли хэштэги написаны
    for (let i = 0; i < hashtags.length; i++) {
      if (!checkHashtag(hashtags[i])) {
        return window.constants.INVALID_HASHTAG;
      }
    }
    // если всё ок
    return window.constants.HASHTAGS_STATUS_OK;
  };

  const getArrayHashtags = (evt) => {
    const hashtagsString = removeExtraSpaces(evt.target.value).toLowerCase();
    return splitString(hashtagsString);
  };

  const splitString = (stringToSplit) => stringToSplit.split(` `);

  const removeExtraSpaces = (string) => string.replace(/\s+/g, ` `).trim();

  const checkQuantityHashtags = (array) => {
    if (array.length > window.constants.MAX_COUNT_HASHTAGS) {
      return false;
    }
    return true;
  };

  const searchSimilarHashtags = (array) => {
    return !(array.some(function (element) {
      return array.indexOf(element) !== array.lastIndexOf(element);
    }));
  };

  const checkHashtag = (hashtag) => {
    const reg = /#([A-Za-z0-9А-Яа-я]{2,19})$/;
    return reg.test(hashtag);
  };

  const validate = ()=> {
    editingWindowHashtags.addEventListener(`input`, function (evt) {
      // сбрасываем статус
      editingWindowHashtags.setCustomValidity(``);

      if (evt.target.value !== ``) {
        // записываем результат валидации
        const validMessage = checkHashtagsList(evt);

        if (validMessage !== window.constants.HASHTAGS_STATUS_OK) {
          // Если не правильно - записываем статус
          editingWindowHashtags.setCustomValidity(validMessage);
        }
      }
    });
  };
  window.form = {
    validate: validate,
  };
})();
