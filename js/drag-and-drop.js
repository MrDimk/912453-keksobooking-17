'use strict';

(function () {
  var pin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var MIN_X = 0;
  var MIN_Y = window.main.PINS_COORD_Y_MIN;
  var MAX_X = map.offsetWidth;
  var MAX_Y = map.offsetHeight;

  window.addEventListener('resize', function (evt) {
    evt.preventDefault();
    window.dragAndDrop.maxX = map.offsetWidth;
  });

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      if (!window.main.isPageActive) {
        window.main.enableForms(); // Активируем формы
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

      if (resultX + (window.main.MAIN_PIN_WIDTH / 2) < MIN_X || resultX + (window.main.MAIN_PIN_WIDTH / 2) > MAX_X) {
        resultX = pin.offsetLeft;
      }

      if (resultY + window.main.MAIN_PIN_HEIGHT < MIN_Y || resultY + window.main.MAIN_PIN_HEIGHT > MAX_Y) {
        resultY = pin.offsetTop;
      }

      pin.style.top = resultY + 'px';
      pin.style.left = resultX + 'px';

      window.main.setMainPinAddress(window.main.getCurrentMainPinPosition());
    };

    var onMouseUp = function (upEvt) {
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
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

// EOF
