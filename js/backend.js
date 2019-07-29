'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data'; // адрес для загрузки данных

  function load(onSuccess, onError) {
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
          onError(xhr.status);
      }
    });
    xhr.send();
  }

  window.backend = {
    load: load
  };
})();

// EOF
