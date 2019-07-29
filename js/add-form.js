'use strict';

(function () {
  // Import
  var MIN_PRICE = window.filters.MIN_PRICE;
  var enableElement = window.utils.enableElement;
  var disableElement = window.utils.disableElement;

  // Формы и элементы форм
  var addForm = document.querySelector('.ad-form');
  var addFormHeader = document.querySelector('.ad-form-header');
  var addFormElements = document.querySelectorAll('.ad-form__element');
  var addressField = document.querySelector('#address');
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var timeinField = document.querySelector('#timein');
  var timeoutField = document.querySelector('#timeout');

  // Разблокирует формы
  function enableForms() {
    addForm.classList.remove('ad-form--disabled');
    enableElement(addFormHeader);
    addFormElements.forEach(enableElement);
    window.utils.settings.isPageActive = true;
  }

  // Блокирует формы
  function disableForms() {
    addForm.classList.add('ad-form--disabled');
    disableElement(addFormHeader);
    addFormElements.forEach(disableElement);
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

  // Назначаем обработчики элементам
  typeField.addEventListener('change', onTypeChange);
  timeinField.addEventListener('change', onTimeinChange);
  timeoutField.addEventListener('change', onTimeoutChange);

  // Инициализация формы
  setMinPriceByType(); // Устанавливаем ограничение стоимости жилья
  addressField.value = window.map.getCurrentMainPinPosition(); // Заполняем поле адреса координатами середины главной метки

  // Экспорт
  window.addForm = {
    enableForms: enableForms,
    disableForms: disableForms,
    setMainPinAddress: setMainPinAddress
  };
})();

// EOF
