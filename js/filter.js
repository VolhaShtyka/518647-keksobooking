'use strict';

(function () {

  var mapFiltersElement = document.querySelector('.map__filters');

  var getPriceDescription = function (price) {
    if (price < 10000) {
      return 'low';
    } else if (price > 50000) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var checkFeatures = function (hotel) {
    var contains = true;
    window.filter.filterCriteria.features.forEach(function (item) {
      if (!hotel.offer.features.includes(item)) {
        contains = false;
      }
    });
    return contains;
  };

  var applyFilter = function () {
    var arrr = window.data.hotels.filter(function (hotel) {
      if (window.filter.filterCriteria.type !== 'any' && hotel.offer.type !== window.filter.filterCriteria.type) {
        return false;
      }
      if (window.filter.filterCriteria.price !== 'any' && getPriceDescription(hotel.offer.price) !== window.filter.filterCriteria.price) {
        return false;
      }
      if (window.filter.filterCriteria.rooms !== 'any' && hotel.offer.rooms !== parseInt(window.filter.filterCriteria.rooms, 10)) {
        return false;
      }
      if (window.filter.filterCriteria.guests !== 'any' && hotel.offer.guests !== parseInt(window.filter.filterCriteria.guests, 10)) {
        return false;
      }
      return checkFeatures(hotel);
    });
    return arrr;
  };

  var setCurrentFilter = function (currentEl) {
    switch (currentEl.id) {
      case 'housing-type': window.filter.filterCriteria.type = currentEl.querySelector('option:checked').value;
        break;
      case 'housing-price': window.filter.filterCriteria.price = currentEl.querySelector('option:checked').value;
        break;
      case 'housing-rooms': window.filter.filterCriteria.rooms = currentEl.querySelector('option:checked').value;
        break;
      case 'housing-guests': window.filter.filterCriteria.guests = currentEl.querySelector('option:checked').value;
        break;
    }
  };

  var setCurrentFeaturesFilter = function (currentEl) {
    if (currentEl.checked) {
      window.filter.filterCriteria.features.push(currentEl.value);
    } else {
      var index = window.filter.filterCriteria.features.indexOf(currentEl.value);
      window.filter.filterCriteria.features.splice(index, 1);
    }
  };

  var filterChangeHandler = function (evt) {
    if (evt.target.name === 'features') {
      setCurrentFeaturesFilter(evt.target);
    } else {
      setCurrentFilter(evt.target);
    }
    window.debounce(window.map.renderPins(applyFilter()));
  };

  mapFiltersElement.addEventListener('change', filterChangeHandler);

  window.filter = {
    filterCriteria: {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
      features: []
    }
  };
})();
