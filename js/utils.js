'use strict';

(function () {
  // Флаги и состояния
  var ESC_KEY = 27;
  var isPageActive = false;
  var DEBOUNCE_TIME = 500;
  var lastTimeout;

  function setDebounse(callback) {
    window.clearTimeout(lastTimeout);
    lastTimeout = setTimeout(function () {
      callback();
    }, DEBOUNCE_TIME);
  }

  // Возвращает случайный элемент массива
  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Разблокирует элемент формы
  function enableElement(element) {
    element.removeAttribute('disabled');
  }

  // Блокирует элемент формы
  function disableElement(element) {
    element.setAttribute('disabled', 'disabled');
  }

  function showError(message, onButtonPress, buttonText) {
    var errorBlock = document.createDocumentFragment();
    var mainBlock = document.querySelector('main');
    errorBlock.appendChild(document.querySelector('#error').content.cloneNode(true));
    errorBlock.querySelector('.error__message').textContent = message;
    var button = errorBlock.querySelector('.error__button');
    button.textContent = buttonText ? buttonText : 'Закрыть';

    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      mainBlock.removeChild(mainBlock.querySelector('.error'));
      if (onButtonPress) {
        onButtonPress();
      }
    });

    mainBlock.appendChild(errorBlock);

    function onEscPress(evt) {
      if (evt.keyCode === ESC_KEY) {
        evt.preventDefault();
        hideMessage();
      }
    }

    window.addEventListener('keydown', onEscPress);

    var hideMessage = function () {
      window.removeEventListener('keydown', onEscPress);
      mainBlock.querySelector('.error').remove();
    };
  }

  function showSuccessMessage() {
    var mainBlock = document.querySelector('main');
    var successBlock = document.querySelector('#success').content.cloneNode(true);
    mainBlock.appendChild(successBlock);

    function onEscPress(evt) {
      if (evt.keyCode === ESC_KEY) {
        evt.preventDefault();
        hideMessage();
      }
    }

    function onClick(evt) {
      evt.preventDefault();
      hideMessage();
    }

    window.addEventListener('keydown', onEscPress);
    window.addEventListener('click', onClick);

    var hideMessage = function () {
      window.removeEventListener('keydown', onEscPress);
      window.removeEventListener('click', onClick);
      mainBlock.querySelector('.success').remove();
    };
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
    ESC_KEY: ESC_KEY,
    setDebounse: setDebounse,
    getRandomArrayElement: getRandomArrayElement,
    enableElement: enableElement,
    disableElement: disableElement,
    showError: showError,
    showSuccessMessage: showSuccessMessage,
    roomsToString: roomsToString,
    guestsToString: guestsToString,
    settings: {
      isPageActive: isPageActive
    }
  };
})();

// EOF
