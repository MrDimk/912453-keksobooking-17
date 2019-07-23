'use strict';

(function () {
  // Import
  var getRandomArrayElement = window.utils.getRandomArrayElement;

  var enumAppartmentType = ['palace', 'flat', 'house', 'bungalo'];
  var PINS_COUNT = 8;
  var MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

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
          x: Math.round(Math.random() * window.map.mapBlock.offsetWidth),
          y: Math.round(
              Math.random() *
              (window.map.settings.PINS_COORD_Y_MAX - window.map.settings.PINS_COORD_Y_MIN) +
              window.map.settings.PINS_COORD_Y_MIN
          )
        }
      };
    }
    return mockPinsArray;
  }

  window.data = {
    getMockAdsData: getMockAdsData,
    MIN_PRICE: MIN_PRICE
  };
})();

// EOF
