'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Возвращает массив mock-объектов, соответствующих по сруктуре данных реальным объявлениям
  function loadPins() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function (evt) {
      evt.preventDefault();
      switch (xhr.status) {
        case 200:
          window.map.appendPinsFromDataArray(xhr.response);
          break;
        default:
          window.utils.showError(
              'Что-то пошло не так, пришел ответ со статусом: ' + xhr.status,
              loadPins,
              'Попробуй еще разок'
          );
      }
    });
    xhr.send();
  }

  window.data = {
    MIN_PRICE: MIN_PRICE,
    loadPins: loadPins
  };
})();

// EOF
