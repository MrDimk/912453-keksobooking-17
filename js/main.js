'use strict';

(function () {
  // Переменные и константы
  var PINS_COUNT = 8;
  window.main = {
    PINS_COORD_Y_MIN: 130,
    PINS_COORD_Y_MAX: 630,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 60 + 22
  };
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
  window.main.isPageActive = false;

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
          y: Math.round(Math.random() * (window.main.PINS_COORD_Y_MAX - window.main.PINS_COORD_Y_MIN) + window.main.PINS_COORD_Y_MIN)
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
  window.main.enableForms = function () {
    mapBlock.classList.remove('map--faded');
    addForm.classList.remove('ad-form--disabled');
    mapFilterFields.forEach(enableElement);
    enableElement(mapFeaturesFieldset);
    enableElement(addFormHeader);
    addFormElements.forEach(enableElement);
    appendPinsFromDataArray(getMockAdsData()); // Выводим пины на карту
    window.main.isPageActive = true;
  };

  // Блокирует формы
  window.main.disableForms = function () {
    mapBlock.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    mapFilterFields.forEach(disableElement);
    disableElement(mapFeaturesFieldset);
    disableElement(addFormHeader);
    addFormElements.forEach(disableElement);
    window.main.isPageActive = false;
  };

  // Возвращает строку с текущими координатами пина в формате "left, top"
  window.main.getCurrentMainPinPosition = function () {
    var coordX = mapPinMain.offsetLeft + window.main.MAIN_PIN_WIDTH / 2;
    var coordY = mapPinMain.offsetTop + window.main.MAIN_PIN_HEIGHT;
    return coordX + ', ' + coordY;
  };

  // Записывает текущие координаты главной метки в поле "Адрес" формы
  window.main.setMainPinAddress = function (address) {
    addressField.value = address;
  };

  // Устанавливает минимальную стоимость жилья
  function setMinPriceByType() {
    priceField.setAttribute('min', MIN_PRICE[typeField.value]);
  }

  // Обработчики событий

  function onTypeChange(evt) {
    evt.preventDefault();
    setMinPriceByType();
  }

  function onTimeoutChange(evt) {
    evt.preventDefault();
    timeinField.value = evt.target.value;
  }

  function onTimeinChange(evt) {
    evt.preventDefault();
    timeoutField.value = evt.target.value;
  }

  // Назначаем обработчики элементам
  typeField.addEventListener('change', onTypeChange);
  timeinField.addEventListener('change', onTimeinChange);
  timeoutField.addEventListener('change', onTimeoutChange);

  // Инициализация формы
  setMinPriceByType(); // Устанавливаем ограничение стоимости жилья
  addressField.value = window.main.getCurrentMainPinPosition(); // Заполняем поле адреса координатами середины главной метки
})();

// EOF
