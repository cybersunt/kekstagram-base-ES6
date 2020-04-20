'use strict';

(function () {
  window.utils = {
    addClassName: (element, className) => element.classList.add(className),
    removeClassName: (element, className) => element.classList.remove(className),
    removeChilds: (element) => element.innerHTML = '',
    createDOMElement: (tagName, className) => {
      var element = document.createElement(tagName);
      element.classList.add(className);
      return element;
    },
    getTemplateClone: (template, innerSelector) => {
      var templateElement = document.querySelector(template);
      var elementToClone = templateElement.querySelector(innerSelector);
      if ('content' in templateElement) {
        elementToClone = templateElement.content.querySelector(innerSelector);
      }
      return elementToClone;
    },
    isEscEvent: (evt, action) => {
      if (evt.keyCode === window.constants.KEYCODE_ESC) {
        action();
      }
    },
    isEnterEvent: (evt, action, array) => {
      if (evt.keyCode === window.constants.KEYCODE_ENTER) {
        action(array);
      }
    }
  };
})();
