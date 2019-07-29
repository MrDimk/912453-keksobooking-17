'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var adsDataArray;
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Запрашивает по заданному URL данные в формате JSON, вызывает обработчики по обстоятельствам
  function loadPins(url, onSuccess, onFail) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function (evt) {
      evt.preventDefault();
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onFail(xhr.status);
      }
    });
    xhr.send();
  }

  function onAdsDataLoad(loadedDataArray) {
    window.data.adsDataArray = loadedDataArray.slice();
    window.filters.applyFilters(loadedDataArray);
  }

  function onLoadFail(status) {
    window.utils.showError(
        'Что-то пошло не так' + (status ? ', пришел ответ со статусом: ' + status : ''),
        function () {
          window.data.loadPins(
              window.data.URL,
              window.map.appendPinsFromDataArray,
              window.data.onLoadFail
          );
        },
        'Попробуй еще разок'
    );
  }

  window.data = {
    MIN_PRICE: MIN_PRICE,
    loadPins: loadPins,
    adsDataArray: adsDataArray,
    onAdsDataLoad: onAdsDataLoad,
    onLoadFail: onLoadFail
  };
})();

// EOF
