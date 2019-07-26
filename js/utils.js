'use strict';

(function () {
  // Флаги и состояния
  var isPageActive = false;

  // Возвращает случайный элемент массива
  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Разблокирует элемент формы
  var enableElement = function (element) {
    element.removeAttribute('disabled');
  };

  // Блокирует элемент формы
  var disableElement = function (element) {
    element.setAttribute('disabled');
  };

  function showError(message, onButtonPress, buttonText) {
    var errorBlock = document.createDocumentFragment();
    var mainBlock = document.querySelector('main');
    errorBlock.appendChild(document.querySelector('#error').content.cloneNode(true));
    errorBlock.querySelector('.error__message').innerText = message;
    var button = errorBlock.querySelector('.error__button');
    button.innerText = buttonText;
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      mainBlock.removeChild(mainBlock.querySelector('.error'));
      onButtonPress();
    });
    mainBlock.appendChild(errorBlock);
  }

  window.utils = {
    getRandomArrayElement: getRandomArrayElement,
    enableElement: enableElement,
    disableElement: disableElement,
    showError: showError,
    settings: {
      isPageActive: isPageActive
    }
  };
})();

// EOF
