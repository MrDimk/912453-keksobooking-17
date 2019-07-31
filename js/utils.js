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
    errorBlock.querySelector('.error__message').textContent = message;
    var button = errorBlock.querySelector('.error__button');
    button.textContent = buttonText;
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      mainBlock.removeChild(mainBlock.querySelector('.error'));
      onButtonPress();
    });
    mainBlock.appendChild(errorBlock);
  }

  function roomsToString(rooms) {
    if (rooms === 1) {
      return '1 комната';
    } else if (rooms < 5) {
      return rooms + ' комнаты';
    } else {
      return rooms + ' комнат';
    }
  }

  function guestsToString(guests) {
    if (guests === 1) {
      return '1 гостя';
    } else {
      return guests + ' гостей';
    }
  }

  window.utils = {
    getRandomArrayElement: getRandomArrayElement,
    enableElement: enableElement,
    disableElement: disableElement,
    showError: showError,
    roomsToString: roomsToString,
    guestsToString: guestsToString,
    settings: {
      isPageActive: isPageActive
    }
  };
})();

// EOF
