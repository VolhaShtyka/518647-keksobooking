'use strict';

(function () {
  var formSubmitElement = document.querySelector('.form__submit');

  var formSubmitHandler = function (evt) {
    var addressElement = document.querySelector('#address');
    if (addressElement.value === '') {
      evt.preventDefault();
      formSubmitElement.disabled = true;
    }
  };

  formSubmitElement.addEventListener('click', formSubmitHandler);
})();

(function () {
  var arrivalTimeElement = document.querySelector('#timein');
  var departureTimeElement = document.querySelector('#timeout');

  var timeElementSelectHandler = function (evt) {
    var currentValue = evt.target.value;
    arrivalTimeElement.value = currentValue;
    departureTimeElement.value = currentValue;
  };

  arrivalTimeElement.addEventListener('click', timeElementSelectHandler);
  departureTimeElement.addEventListener('click', timeElementSelectHandler);
})();

(function () {
  var houseTypeElement = document.querySelector('#type');
  var price = document.querySelector('#price');
  var typeElementSelectHandler = function (evt) {
    var currentValue = evt.target.value;
    if (currentValue === 'flat') {
      price.minLength = 1000;
    } else if (currentValue === 'house') {
      price.minLength = 5000;
    } else if (currentValue === 'palace') {
      price.minLength = 10000;
    }
  };

  houseTypeElement.addEventListener('click', typeElementSelectHandler);
})();

(function () {
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
