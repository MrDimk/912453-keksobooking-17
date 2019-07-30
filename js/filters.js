'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var displayedPinsNumber = 5;
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Типы фильтров и функции-обработчики для каждого из них
  var filterTypes = {
    'number': function (data) {
      return data.slice(0, Math.min(displayedPinsNumber, data.length));
    },
    'housing-type': function (data, formElement) {
      return data.filter(function (element) {
        return formElement.value === 'any' || element.offer.type === formElement.value;
      });
    }
  };

  // Применение фильтров - для каждого элемента формы ищем по имени обработчик,
  // если не находим - массив с данными не модифицируем
  function apply() {
    var result = window.data.adsDataArray.slice();
    Array.from(filtersForm).forEach(function (formElement) {
      try {
        result = filterTypes[formElement.name](result, formElement);
      } catch (error) {
        // тут можно поругаться в консоли что поле фильтра нам не знакомо, но это не понравится Трэвису
        // console.log('Нет опработчика фильтра для поля:' + formElement.name);
      }
    });
    window.map.removePinsFromMap();
    window.map.appendPinsFromDataArray(filterTypes['number'](result)); // фильтр по количеству может быть легко добавлен в форму
  }

  filtersForm.addEventListener('change', function (evt) {
    evt.preventDefault();
    apply();
  });

  window.filters = {
    MIN_PRICE: MIN_PRICE,
    apply: apply
  };
})();
