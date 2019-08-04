'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var displayedPinsNumber = 5;
  var PRICE_RANGES = {
    low: {from: 0, to: 10000},
    middle: {from: 10000, to: 50000},
    high: {from: 50000, to: Infinity}
  };

  function apply() {
    var filters = getFiltersObject();
    var result = window.data.adsDataArray.slice().filter(function (data) {
      return (
        (filters.type === 'any' || data.offer.type === filters.type) &&
        (filters.price === 'any' ||
          (data.offer.price >= PRICE_RANGES[filters.price].from &&
            data.offer.price < PRICE_RANGES[filters.price].to)) &&
        (filters.rooms === 'any' || data.offer.rooms === Number(filters.rooms)) &&
        (filters.guests === 'any' || data.offer.guests === Number(filters.guests)) &&
        (filters.features.length === 0 ||
          filters.features.every(function (val) {
            return data.offer.features.includes(val);
          }))
      );
    });

    window.map.removePinsFromMap();
    window.map.hideCard();

    if (result.length > 0) {
      window.map.appendPinsFromDataArray(
          result.length > 5 ? result.slice(0, displayedPinsNumber) : result
      );
    }
  }

  function getFiltersObject() {
    return {
      type: filtersForm.querySelector('#housing-type').value,
      price: filtersForm.querySelector('#housing-price').value,
      rooms: filtersForm.querySelector('#housing-rooms').value,
      guests: filtersForm.querySelector('#housing-guests').value,
      features: (function (formElement) {
        return Array.from(formElement.querySelectorAll('input:checked')).map(function (element) {
          return element.value;
        });
      })(filtersForm.querySelector('#housing-features'))
    };
  }

  filtersForm.addEventListener('change', function (evt) {
    evt.preventDefault();
    apply();
  });

  window.filters = {
    apply: apply
  };
})();
