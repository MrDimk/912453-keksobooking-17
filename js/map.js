'use strict';

(function () {
  // Переменные и константы
  var PINS_COORD_Y_MIN = 130;
  var PINS_COORD_Y_MAX = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 60 + 22;
  var OFFER_TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var mapBlock = document.querySelector('.map'); // Блок с картой
  var mapPins = document.querySelector('.map__pins'); // родительский элемент для всех пинов на карте
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
    mapFilterFields.forEach(window.utils.enableElement);
    window.utils.enableElement(mapFeaturesFieldset);
  }

  // Деактивирует карту
  function deactivateMap() {
    mapBlock.classList.add('map--faded');
    mapFilterFields.forEach(window.utils.disableElement);
    window.utils.disableElement(mapFeaturesFieldset);
  }

  // Объявляем класс для карточки
  var Card = function (dataObj) {
    var newCardNode = cardTemplate.cloneNode(true);
    newCardNode.querySelector('.popup__avatar').src = dataObj.author.avatar;
    newCardNode.querySelector('.popup__title').textContent = dataObj.offer.title;
    newCardNode.querySelector('.popup__text--address').textContent = dataObj.offer.title;
    newCardNode.querySelector('.popup__text--price').textContent = dataObj.offer.price;
    newCardNode.querySelector('.popup__type').textContent = OFFER_TYPES[dataObj.offer.type];
    newCardNode.querySelector('.popup__text--capacity').textContent =
      window.utils.roomsToString(dataObj.offer.rooms) + ' для ' + window.utils.guestsToString(dataObj.offer.guests);
    newCardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
    newCardNode.querySelector('.popup__description').textContent = dataObj.offer.description;

    var features = newCardNode.querySelector('.popup__features');
    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }
    dataObj.offer.features.forEach(function (value) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + value);
      features.appendChild(listItem);
    });

    var photos = newCardNode.querySelector('.popup__photos');
    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }
    dataObj.offer.photos.forEach(function (value) {
      var imgItem = document.createElement('img');
      imgItem.classList.add('popup__photo');
      imgItem.width = '45';
      imgItem.height = '40';
      imgItem.alt = 'Фотография жилья';
      imgItem.src = value;
      photos.appendChild(imgItem);
    });

    var cardDocumentFragment = document.createDocumentFragment();
    cardDocumentFragment.appendChild(newCardNode);
    this.cardNode = newCardNode;
    this.data = dataObj;
    mapBlock.insertBefore(cardDocumentFragment, mapBlock.querySelector('.map__filters-container'));
  };

  Card.prototype.hide = function () {
    this.cardNode.classList.add('hidden');
  };

  Card.prototype.show = function () {
    this.cardNode.classList.remove('hidden');
  };

  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    getCurrentMainPinPosition: getCurrentMainPinPosition,
    appendPinsFromDataArray: appendPinsFromDataArray,
    removePinsFromMap: removePinsFromMap,
    Card: Card,
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
