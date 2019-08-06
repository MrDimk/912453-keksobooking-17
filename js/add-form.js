'use strict';

(function () {
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var MAX_PRICE = 1000000;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  // Формы и элементы форм
  var addForm = document.querySelector('.ad-form');
  var addFormHeader = addForm.querySelector('.ad-form-header');
  var addFormElements = addForm.querySelectorAll('.ad-form__element');
  var addressField = addForm.querySelector('#address');
  var priceField = addForm.querySelector('#price');
  var titleField = addForm.querySelector('#title');
  var typeField = addForm.querySelector('#type');
  var timeinField = addForm.querySelector('#timein');
  var timeoutField = addForm.querySelector('#timeout');
  var roomsField = addForm.querySelector('#room_number');
  var guestsField = addForm.querySelector('#capacity');
  var formResetBtn = addForm.querySelector('.ad-form__reset');

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
    window.utils.settings.isPageActive = false;
  }

  // Записывает текущие координаты главной метки в поле "Адрес" формы
  function setMainPinAddress(address) {
    addressField.value = address;
  }

  // Обработчики событий
  function onTypeChange(evt) {
    evt.preventDefault();
    priceField.setAttribute('min', MIN_PRICE[typeField.value]);
    priceField.setAttribute('placeholder', 'от ' + MIN_PRICE[typeField.value]);
  }

  function onPriceChenge(evt) {
    evt.preventDefault();
    if (priceField.value < MIN_PRICE[typeField.value]) {
      priceField.setCustomValidity(
          'Для данного типа жилья цена не может быть ниже ' + MIN_PRICE[typeField.value] + ' рублей'
      );
    }
    priceField.setCustomValidity('');
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

  // Функции проверки на валидность
  function isTitleValid() {
    return titleField.value.length >= MIN_TITLE_LENGTH && titleField.value.length <= MAX_TITLE_LENGTH;
  }

  function isAddressValid() {
    return addressField.value === window.map.getCurrentMainPinPosition();
  }

  function isСapacityValid() {
    var message = '';
    if (Number(roomsField.value) < Number(guestsField.value) && Number(guestsField.value) !== 0) {
      message =
        'Столько комнат не достаточно для ' + window.utils.guestsToString(guestsField.value);
    }
    if ((Number(roomsField.value) === 100) ^ (Number(guestsField.value) === 0)) {
      message = 'Вариант 100 комнат - не для гостей';
    }
    roomsField.setCustomValidity(message);
    return !message;
  }

  function isPricingValid() {
    return Number(priceField.value) >= MIN_PRICE[typeField.value] &&
      Number(priceField.value) <= MAX_PRICE;
  }

  function isFormValid() {
    return isTitleValid() && isAddressValid() && isСapacityValid() && isPricingValid();
  }

  function onSubmit(evt) {
    evt.preventDefault();
    if (isFormValid()) {
      window.backend.send(new FormData(addForm), onSendSuccess, onSendError);
    }
  }

  function onRestetBtnClick(evt) {
    evt.preventDefault();
    window.map.resetMap();
    addForm.reset();
    disableForms();
  }

  function onSendSuccess() {
    addForm.reset();
    setMainPinAddress(window.map.getCurrentMainPinPosition());
    window.map.resetMap(); // удалить метки и карточку
    window.utils.showSuccessMessage(); // показать сообщение об успехе
  }

  function onSendError() {
    window.utils.showError('Ошибка отправки формы'); // сообщегие об ошибке
  }

  // Назначаем обработчики элементам
  typeField.addEventListener('change', onTypeChange);
  priceField.addEventListener('change', onPriceChenge);
  timeinField.addEventListener('change', onTimeinChange);
  timeoutField.addEventListener('change', onTimeoutChange);
  roomsField.addEventListener('change', onRoomsChange);
  guestsField.addEventListener('change', onGuestsChange);
  addForm.addEventListener('submit', onSubmit);
  formResetBtn.addEventListener('click', onRestetBtnClick);

  // Инициализация формы
  setMainPinAddress(window.map.getCurrentMainPinPosition()); // Заполняем поле адреса координатами середины главной метки

  // Экспорт
  window.addForm = {
    enableForms: enableForms,
    setMainPinAddress: setMainPinAddress
  };
})();

// EOF
