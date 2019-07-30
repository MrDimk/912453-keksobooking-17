'use strict';

(function () {
  var adsDataArray;

  function onAdsDataLoad(loadedDataArray) {
    window.data.adsDataArray = loadedDataArray;
    window.filters.apply();
  }

  function onLoadFail(status) {
    window.utils.showError(
        'Что-то пошло не так' + (status ? ', пришел ответ со статусом: ' + status : ''),
        function () {
          window.backend.load(window.data.onAdsDataLoad, window.data.onLoadFail);
        },
        'Попробуй еще разок'
    );
  }

  window.data = {
    adsDataArray: adsDataArray,
    onAdsDataLoad: onAdsDataLoad,
    onLoadFail: onLoadFail
  };
})();

// EOF
