import * as constants from './constants.js';

const addClassName = (element, className) => element.classList.add(className);

const removeClassName = (element, className) => element.classList.remove(className);

const removeChilds = (element) => {
  element.innerHTML = ``;
};

const createDOMElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const getTemplateClone = (template, innerSelector) => {
  const templateElement = document.querySelector(template);
  let elementToClone = templateElement.querySelector(innerSelector);
  if (`content` in templateElement) {
    elementToClone = templateElement.content.querySelector(innerSelector);
  }
  return elementToClone;
};

const isEscEvent = (evt, action) => {
  if (evt.keyCode === constants.KEYCODE_ESC) {
    action();
  }
};

const isEnterEvent = (evt, action, array) => {
  if (evt.keyCode === constants.KEYCODE_ENTER) {
    action(array);
  }
};

export {addClassName, removeClassName, removeChilds, createDOMElement, getTemplateClone, isEscEvent, isEnterEvent};
