'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var displayedPinsNumber = 5;
  var PRICE_RANGES = {
    low: {from: 0, to: 10000},
    middle: {from: 10000, to: 50000},
    high: {from: 50000, to: Infinity}
  };

  // Типы фильтров и функции-обработчики для каждого из них
  var filterTypes = {
    number: function (data) {
      return data.slice(0, Math.min(displayedPinsNumber, data.length));
    },
    type: function (data, value) {
      return data.filter(function (element) {
        return value === 'any' || element.offer.type === value;
      });
    },
    price: function (data, value) {
      return data.filter(function (element) {
        return (
          value === 'any' ||
          (element.offer.price >= PRICE_RANGES[value].from &&
            element.offer.price < PRICE_RANGES[value].to)
        );
      });
    },
    rooms: function (data, value) {
      return data.filter(function (element) {
        return value === 'any' || element.offer.rooms === Number(value);
      });
    },
    guests: function (data, value) {
      return data.filter(function (element) {
        return value === 'any' || element.offer.guests === Number(value);
      });
    },
    features: function (data, value) {
      if (value.length > 0) {
        return data.filter(function (element) {
          var result = true;
          value.forEach(function (val) {
            if (!element.offer.features.includes(val)) {
              result = false;
            }
          });
          return result;
        });
      } else {
        return data;
      }
    }
  };

  // Применение фильтров - для каждого элемента формы ищем по имени обработчик,
  // если не находим - массив с данными не модифицируем
  function apply() {
    var result = window.data.adsDataArray.slice();
    var filters = new FiltersObject(filtersForm);
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
        try {
          result = filterTypes[key](result, filters[key]);
        } catch (error) {
          // тут можно поругаться в консоли что поле фильтра нам не знакомо, но это не понравится Трэвису
          // console.log('Нет опработчика фильтра для поля:' + formElement.name);
        }
      }
    }

    window.map.removePinsFromMap();
    window.map.appendPinsFromDataArray(filterTypes['number'](result)); // фильтр по количеству может быть легко добавлен в форму
  }

  var FiltersObject = function (form) {
    this.type = form.querySelector('#housing-type').value;
    this.price = form.querySelector('#housing-price').value;
    this.rooms = form.querySelector('#housing-rooms').value;
    this.guests = form.querySelector('#housing-guests').value;
    this.features = (function (formElement) {
      var valuesArray = [];
      Array.from(formElement.elements)
        .filter(function (element) {
          return element.type === 'checkbox' && element.checked === true;
        })
        .forEach(function (element) {
          valuesArray.push(element.value);
        });
      return valuesArray;
    })(form.querySelector('#housing-features'));
  };

  filtersForm.addEventListener('change', function (evt) {
    evt.preventDefault();
    apply();
  });

  window.filters = {
    apply: apply
  };
})();
