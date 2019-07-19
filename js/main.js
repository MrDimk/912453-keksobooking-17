'use strict';

(function () {
  // Переменные и константы
  var PINS_COUNT = 8;
  var PINS_COORD_Y_MIN = 130;
  var PINS_COORD_Y_MAX = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 60 + 22;
  var MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var mapBlock = document.querySelector('.map'); // Блок с картой
  var mapPins = document.querySelector('.map__pins'); // родительский элемент для всех пинов на карте
  var pinTemplate = document //
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var enumAppartmentType = ['palace', 'flat', 'house', 'bungalo'];

  // Формы и элементы форм
  var mapPinMain = document.querySelector('.map__pin--main');
  var addForm = document.querySelector('.ad-form');
  var mapFilterFields = document.querySelectorAll('.map__filter');
  var mapFeaturesFieldset = document.querySelector('.map__features');
  var addFormHeader = document.querySelector('.ad-form-header');
  var addFormElements = document.querySelectorAll('.ad-form__element');
  var addressField = document.querySelector('#address');
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var timeinField = document.querySelector('#timein');
  var timeoutField = document.querySelector('#timeout');

  // Флаги и состояния
  var isPageActive = false;

  // Возвращает случайный элемент массива
  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Возвращает массив mock-объектов, соответствующих по сруктуре данных реальным объявлениям
  function getMockAdsData() {
    var mockPinsArray = [];
    // массив с данными заполняем mock-объектами
    for (var i = 0; i < PINS_COUNT; i++) {
      mockPinsArray[i] = {
        author: {
          avatar: 'img/avatars/user' + '0' + Math.ceil(Math.random() * 8) + '.png'
        },
        offer: {
          type: getRandomArrayElement(enumAppartmentType),
          title: 'Заголовок объявления' // свойства с заголовком нет в Задании, но по смыслу оно д.б. тут
        },
        location: {
          x: Math.round(Math.random() * mapBlock.offsetWidth),
          y: Math.round(Math.random() * (PINS_COORD_Y_MAX - PINS_COORD_Y_MIN) + PINS_COORD_Y_MIN)
        }
      };
    }
    return mockPinsArray;
  }

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

  // Разблокирует элемент формы
  var enableElement = function (element) {
    element.removeAttribute('disabled');
  };

  // Блокирует элемент формы
  var disableElement = function (element) {
    element.setAttribute('disabled');
  };

  // Разблокирует формы
  function enableForms() {
    mapBlock.classList.remove('map--faded');
    addForm.classList.remove('ad-form--disabled');
    mapFilterFields.forEach(enableElement);
    enableElement(mapFeaturesFieldset);
    enableElement(addFormHeader);
    addFormElements.forEach(enableElement);
    isPageActive = true;
  }

  // Блокирует формы
  function disableForms() {
    mapBlock.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    mapFilterFields.forEach(disableElement);
    disableElement(mapFeaturesFieldset);
    disableElement(addFormHeader);
    addFormElements.forEach(disableElement);
    isPageActive = false;
  }

  // Возвращает строку с текущими координатами пина в формате "left, top"
  function getCurrentMainPinPosition() {
    var coordX = mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2;
    var coordY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
    return coordX + ', ' + coordY;
  }

  // Обработчики событий
  function onMainPinClick(evt) {
    evt.preventDefault();
    if (!isPageActive) {
      enableForms(); // Активируем формы
      appendPinsFromDataArray(getMockAdsData()); // Выводим пины на карту
    }
  }

  function onMainPinMouseUp(evt) {
    evt.preventDefault();
    addressField.value = getCurrentMainPinPosition();
  }

  function onTypeChange(evt) {
    evt.preventDefault();
    setMinPriceByType();
  }

  function onTimeinTimeoutChange(evt) {
    evt.preventDefault();
    timeinField.value = evt.target.value;
    timeoutField.value = evt.target.value;
  }

  // Устанавливает минимальную стоимость жилья
  function setMinPriceByType() {
    var type = typeField.value;
    priceField.setAttribute('min', MIN_PRICE[type]);
  }

  if (isPageActive) {
    disableForms(); // Пока вхолостую, чтобы линтер не ругался
  }

  setMinPriceByType();

  // Назначаем обработчики элементам
  mapPinMain.addEventListener('click', onMainPinClick);
  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
  typeField.addEventListener('change', onTypeChange);
  timeinField.addEventListener('change', onTimeinTimeoutChange);
  timeoutField.addEventListener('change', onTimeinTimeoutChange);

  addressField.value = getCurrentMainPinPosition(); // Заполняем поле адреса координатами середины главной метки
})();

// EOF
