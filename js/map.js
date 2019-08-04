'use strict';

(function () {
  // Переменные и константы
  var DEFAULT_MAIN_PIN_COORDS = {
    x: '602',
    y: '375'
  };
  var PINS_COORD_Y_MIN = 130;
  var PINS_COORD_Y_MAX = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 60 + 22;
  var OFFER_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var activeCard;

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

    // Обрабатываем событие focus чтобы исключить повторную отрисовку той же карточки + сделать доступным навигацию по Tab
    newPinNode.addEventListener('focus', function (evt) {
      evt.preventDefault();
      onPinClick(pinData); // делегируем на общий обработчик с данными конкретного объявления
    });
    return newPinNode;
  }

  function hideCard() {
    if (activeCard) {
      activeCard.remove();
    }
  }

  function onPinClick(data) {
    hideCard();
    activeCard = createCard(data);
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

  function setMainPinPosition(x, y) {
    mapPinMain.style.left = x + 'px';
    mapPinMain.style.top = y + 'px';
  }

  function resetMap() {
    removePinsFromMap();
    setMainPinPosition(DEFAULT_MAIN_PIN_COORDS.x, DEFAULT_MAIN_PIN_COORDS.y);
    if (activeCard) {
      activeCard.remove();
    }
    deactivateMap();
    window.utils.settings.isPageActive = false;
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
  function createCard(dataObj) {
    var newCardNode = cardTemplate.cloneNode(true);
    newCardNode.querySelector('.popup__avatar').src = dataObj.author.avatar;
    newCardNode.querySelector('.popup__title').textContent = dataObj.offer.title;
    newCardNode.querySelector('.popup__text--address').textContent = dataObj.offer.title;
    newCardNode.querySelector('.popup__text--price').textContent = dataObj.offer.price;
    newCardNode.querySelector('.popup__type').textContent = OFFER_TYPES[dataObj.offer.type];
    newCardNode.querySelector('.popup__text--capacity').textContent =
      window.utils.roomsToString(dataObj.offer.rooms) +
      ' для ' +
      window.utils.guestsToString(dataObj.offer.guests);
    newCardNode.querySelector('.popup__text--time').textContent =
      'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
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

    newCardNode.querySelector('button.popup__close').addEventListener('click', function (evt) {
      evt.preventDefault();
      newCardNode.remove();
    });

    function onEscPress(evt) {
      if (evt.keyCode === window.utils.ESC_KEY) {
        evt.preventDefault();
        closeCard();
      }
    }

    window.addEventListener('keydown', onEscPress);

    var closeCard = function () {
      window.removeEventListener('keydown', onEscPress);
      newCardNode.remove();
    };

    mapBlock.insertBefore(newCardNode, mapBlock.querySelector('.map__filters-container'));
    return newCardNode;
  }

  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    getCurrentMainPinPosition: getCurrentMainPinPosition,
    appendPinsFromDataArray: appendPinsFromDataArray,
    removePinsFromMap: removePinsFromMap,
    createCard: createCard,
    mapBlock: mapBlock,
    mapPinMain: mapPinMain,
    resetMap: resetMap,
    hideCard: hideCard,
    settings: {
      PINS_COORD_Y_MIN: PINS_COORD_Y_MIN,
      PINS_COORD_Y_MAX: PINS_COORD_Y_MAX,
      MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
      MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT
    }
  };
})();

// EOF
