'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data'; // адрес для загрузки данных
  var URL_SEND = 'https://js.dump.academy/keksobooking'; // адрес для отправки данных

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

  function send(formData, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'ultipart/form-data';
    xhr.open('POST', URL_SEND);
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
    xhr.send(formData);
  }

  window.backend = {
    load: load,
    send: send
  };
})();

// EOF
