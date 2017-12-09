'use strict';

(function () {
  var MIN_PRICES = [1000, 5000, 10000];

  window.map.setElementsFormDisabled(true);

  var arrivalTimeElement = document.querySelector('#timein');
  var departureTimeElement = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var timeElementSelectHandler = function (evt) {
    window.synchronizeFields(evt.target, departureTimeElement, window.data.HOTEL_CHECK_TIMES, window.data.HOTEL_CHECK_TIMES, syncValues);
  };

  arrivalTimeElement.addEventListener('click', timeElementSelectHandler);
  departureTimeElement.addEventListener('click', timeElementSelectHandler);


  var houseTypeElement = document.querySelector('#type');
  var price = document.querySelector('#price');
  price.defaultValue = 1000;

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var typeElementSelectHandler = function (evt) {
    window.synchronizeFields(evt.target, price, window.data.HOTEL_TYPES, MIN_PRICES, syncValueWithMin);
  };

  houseTypeElement.addEventListener('click', typeElementSelectHandler);


  var roomNumberElement = document.querySelector('#room_number');
  var capacityGuestsElement = document.querySelectorAll('#capacity option');

  var capacitySelectHandler = function (evt) {
    var currentValue = evt.target.value;

    for (var i = 0; i < capacityGuestsElement.length; i++) {
      capacityGuestsElement[i].hidden = true;
      capacityGuestsElement[i].selected = false;
      if ((currentValue === '100') && (capacityGuestsElement[i].value === '0')) {
        capacityGuestsElement[i].hidden = false;
        capacityGuestsElement[i].selected = true;
      }
      if (capacityGuestsElement[i].value === currentValue) {
        capacityGuestsElement[i].hidden = false;
        capacityGuestsElement[i].selected = true;
      }
    }
  };

  roomNumberElement.addEventListener('click', capacitySelectHandler);

})();
