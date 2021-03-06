'use strict';

(function () {
  // Import
  var pin = window.map.mapPinMain;
  var map = window.map.mapBlock;
  var MIN_X = 0;
  var MIN_Y = window.map.settings.PINS_COORD_Y_MIN;
  var MAIN_PIN_WIDTH = window.map.settings.MAIN_PIN_WIDTH;
  var MAIN_PIN_HEIGHT = window.map.settings.MAIN_PIN_HEIGHT;
  var enableForms = window.addForm.enableForms;
  var activateMap = window.map.activateMap;

  var MAX_X = map.offsetWidth;
  var MAX_Y = map.offsetHeight;

  window.addEventListener('resize', function (evt) {
    evt.preventDefault();
    MAX_X = window.map.mapBlock.offsetWidth;
  });

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      if (!window.utils.settings.isPageActive) {
        window.backend.load(window.data.onAdsDataLoad, window.data.onLoadFail);
        activateMap();
        enableForms();
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var resultX = pin.offsetLeft - shift.x;
      var resultY = pin.offsetTop - shift.y;

      if (resultX + (MAIN_PIN_WIDTH / 2) < MIN_X || resultX + (MAIN_PIN_WIDTH / 2) > MAX_X) {
        resultX = pin.offsetLeft;
      }

      if (resultY + MAIN_PIN_HEIGHT < MIN_Y || resultY + MAIN_PIN_HEIGHT > MAX_Y) {
        resultY = pin.offsetTop;
      }

      pin.style.top = resultY + 'px';
      pin.style.left = resultX + 'px';

      window.addForm.setMainPinAddress(window.map.getCurrentMainPinPosition());
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

// EOF
