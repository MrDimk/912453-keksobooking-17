'use strict';

(function () {
  // Объявляем все переменные
  var mapBlock = document.querySelector('.map'); // Блок с картой
  var pinTemplate = document //
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var enumAppartmentType = ['palace', 'flat', 'house', 'bungalo'];
  var adsDataArray = []; // Массив с данными (будем делать из него mock)
  var mapPins = document.querySelector('.map__pins'); // родительский элемент для всех пинов на карте

  // Возвращает случайный элемент массива
  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Возвращает объект-заглушку, соответствующий по сруктуре данных реальному бъявлению
  function getMockAdsData() {
    return {
      author: {
        avatar: 'img/avatars/user' + '0' + Math.ceil(Math.random() * 8) + '.png'
      },
      offer: {
        type: getRandomArrayElement(enumAppartmentType),
        title: 'Заголовок объявления' // свойства с заголовком нет в Задании, но по смыслу оно д.б. тут
      },
      location: {
        x: Math.round(Math.random() * mapBlock.offsetWidth),
        y: Math.round(Math.random() * 500 + 130)
      }
    };
  }

  // Создает будущий DOM-элемент из шаблона на основе объекта с данными конкретного объявления
  function getPinItem(template, pinData) {
    var newPinNode = template.cloneNode(true);
    newPinNode.style.left = pinData.location.x + 'px';
    newPinNode.style.top = pinData.location.y + 'px';
    newPinNode.querySelector('img').src = pinData.author.avatar;
    newPinNode.querySelector('img').alt = pinData.offer.title;
    return newPinNode;
  }

  // В указанный родительский элемент (карту) добавляет Пины на основе данных из массива
  function appendPinsFromDataArray(parent, dataArray) {
    var pinsDocumentFragment = document.createDocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      pinsDocumentFragment.appendChild(getPinItem(pinTemplate, dataArray[i]));
    }
    parent.appendChild(pinsDocumentFragment);
  }

  // массив с данными заполняем mock-объектами
  for (var i = 0; i < 8; i++) {
    adsDataArray[i] = getMockAdsData();
  }


  mapBlock.classList.remove('map--faded'); // Визуально переводим карту в активное состояние
  appendPinsFromDataArray(mapPins, adsDataArray); // Выводим пины на карту
})();

// EOF
