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

  window.utils = {
    getRandomArrayElement: getRandomArrayElement,
    enableElement: enableElement,
    disableElement: disableElement,
    settings: {
      isPageActive: isPageActive
    }
  };
})();

// EOF
