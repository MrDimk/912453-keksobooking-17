'use strict';

(function () {
  // Импортируем функции
  var enableElement = window.utils.enableElement;
  var disableElement = window.utils.disableElement;

  // Переменные и константы
  var PINS_COORD_Y_MIN = 130;
  var PINS_COORD_Y_MAX = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 60 + 22;

  var mapBlock = document.querySelector('.map'); // Блок с картой
  var mapPins = document.querySelector('.map__pins'); // родительский элемент для всех пинов на карте
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilterFields = document.querySelectorAll('.map__filter');
  var mapFeaturesFieldset = document.querySelector('.map__features');

  // Создает будущий DOM-элемент из шаблона на основе объекта с данными конкретного объявления
  function getPinItem(pinData) {
    var newPinNode = pinTemplate.cloneNode(true);
    newPinNode.style.left = pinData.location.x + 'px';
    newPinNode.style.top = pinData.location.y + 'px';
    newPinNode.querySelector('img').src = pinData.author.avatar;
    newPinNode.querySelector('img').alt = pinData.offer.title;
    return newPinNode;
  }

  // Добавляет на карту пины на основе данных из массива
  function appendPinsFromDataArray(dataArray) {
    var pinsDocumentFragment = document.createDocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      pinsDocumentFragment.appendChild(getPinItem(dataArray[i]));
    }
    mapPins.appendChild(pinsDocumentFragment);
  }

  function removePinsFromMap() {
    var otherPins = Array.from(mapPins.querySelectorAll('.map__pin')).filter(function (pin) {
      return !pin.classList.contains('map__pin--main');
    });

    otherPins.forEach(function (pin) {
      pin.remove();
    });
  }

  // Возвращает строку с текущими координатами пина в формате "left, top"
  function getCurrentMainPinPosition() {
    var coordX = mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2;
    var coordY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
    return coordX + ', ' + coordY;
  }

  // Активирует карту
  function activateMap() {
    mapBlock.classList.remove('map--faded');
    mapFilterFields.forEach(enableElement);
    enableElement(mapFeaturesFieldset);
  }

  // Деактивирует карту
  function deactivateMap() {
    mapBlock.classList.add('map--faded');
    mapFilterFields.forEach(disableElement);
    disableElement(mapFeaturesFieldset);
  }

  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    getCurrentMainPinPosition: getCurrentMainPinPosition,
    appendPinsFromDataArray: appendPinsFromDataArray,
    removePinsFromMap: removePinsFromMap,
    mapBlock: mapBlock,
    mapPinMain: mapPinMain,
    settings: {
      PINS_COORD_Y_MIN: PINS_COORD_Y_MIN,
      PINS_COORD_Y_MAX: PINS_COORD_Y_MAX,
      MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
      MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT
    }
  };
})();

// EOF
