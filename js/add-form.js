'use strict';

(function () {
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Формы и элементы форм
  var addForm = document.querySelector('.ad-form');
  var addFormHeader = document.querySelector('.ad-form-header');
  var addFormElements = document.querySelectorAll('.ad-form__element');
  var addressField = document.querySelector('#address');
  var priceField = document.querySelector('#price');
  // var titleField = document.querySelector('#title');
  var typeField = document.querySelector('#type');
  var timeinField = document.querySelector('#timein');
  var timeoutField = document.querySelector('#timeout');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');

  // Разблокирует формы
  function enableForms() {
    addForm.classList.remove('ad-form--disabled');
    window.utils.enableElement(addFormHeader);
    addFormElements.forEach(window.utils.enableElement);
    window.utils.settings.isPageActive = true;
  }

  // Блокирует формы
  function disableForms() {
    addForm.classList.add('ad-form--disabled');
    window.utils.disableElement(addFormHeader);
    addFormElements.forEach(window.utils.disableElement);
    window.main.isPageActive = false;
  }

  // Записывает текущие координаты главной метки в поле "Адрес" формы
  function setMainPinAddress(address) {
    addressField.value = address;
  }

  // Устанавливает минимальную стоимость жилья
  function setMinPriceByType() {
    priceField.setAttribute('min', MIN_PRICE[typeField.value]);
  }

  // Обработчики событий
  function onTypeChange(evt) {
    evt.preventDefault();
    setMinPriceByType();
  }

  function onTimeoutChange(evt) {
    evt.preventDefault();
    timeinField.value = evt.target.value;
  }

  function onTimeinChange(evt) {
    evt.preventDefault();
    timeoutField.value = evt.target.value;
  }

  function onRoomsChange(evt) {
    evt.preventDefault();
    isСapacityValid();
  }

  function onGuestsChange(evt) {
    evt.preventDefault();
    isСapacityValid();
  }

  function isСapacityValid() {
    if (Number(roomsField.value) < Number(guestsField.value)) {
      roomsField.setCustomValidity(
          'Столько комнат не достаточно для ' + window.utils.guestsToString(guestsField.value)
      );
      guestsField.setCustomValidity(
          'Столько гостей и только ' + window.utils.roomsToString(roomsField.value) + ', многовато'
      );
      return false;
    }
    if (Number(roomsField.value) === 100 && guestsField.value > 0) {
      guestsField.setCustomValidity('');
      roomsField.setCustomValidity('Данный вариант размещения не для гостей');
      return false;
    }
    if (Number(guestsField.value) === 0 && Number(roomsField.value) !== 100) {
      roomsField.setCustomValidity('');
      guestsField.setCustomValidity('Не для гостей есть специальный варинт размещения');
      return false;
    }
    roomsField.setCustomValidity('');
    guestsField.setCustomValidity('');
    return true;
  }

  function isPricingValid() {
    setMinPriceByType();
    return priceField.validity;
  }

  function isFormValid() {
    return isСapacityValid() && isPricingValid();
  }

  function onSubmit(evt) {
    evt.preventDefault();
    if (isFormValid()) {
      window.backend.send(new FormData(addForm), onSendSuccess, onSendError);
    }
  }

  function onSendSuccess() {
    addForm.reset();
    window.map.resetMap(); // удалить метки и карточку
    window.utils.showSuccessMessage(); // показать сообщение об успехе
  }

  function onSendError() {
    window.utils.showError('Ошибка отправки формы'); // сообщегие об ошибке
  }

  // Назначаем обработчики элементам
  typeField.addEventListener('change', onTypeChange);
  timeinField.addEventListener('change', onTimeinChange);
  timeoutField.addEventListener('change', onTimeoutChange);
  roomsField.addEventListener('change', onRoomsChange);
  guestsField.addEventListener('change', onGuestsChange);
  addForm.addEventListener('submit', onSubmit);

  // Инициализация формы
  setMainPinAddress(window.map.getCurrentMainPinPosition()); // Заполняем поле адреса координатами середины главной метки

  // Экспорт
  window.addForm = {
    enableForms: enableForms,
    disableForms: disableForms,
    setMainPinAddress: setMainPinAddress
  };
})();

// EOF
