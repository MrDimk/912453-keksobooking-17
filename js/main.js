'use strict';

(function () {
  // Объявляем все переменные и константы
  var PINS_COUNT = 8;
  var PINS_COORD_Y_MIN = 130;
  var PINS_COORD_Y_MAX = 630;
  var mapBlock = document.querySelector('.map'); // Блок с картой
  var mapPins = document.querySelector('.map__pins'); // родительский элемент для всех пинов на карте
  var pinTemplate = document //
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var enumAppartmentType = ['palace', 'flat', 'house', 'bungalo'];

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

  mapBlock.classList.remove('map--faded'); // Визуально переводим карту в активное состояние
  appendPinsFromDataArray(getMockAdsData()); // Выводим пины на карту
})();

// EOF
