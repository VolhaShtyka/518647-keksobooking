'use strict';

(function () {
  var MIN_PRICES = [1000, 0, 5000, 10000];
  var HOTEL_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var HOTEL_CHECK_TIMES = ['12:00', '13:00', '14:00'];

  var arrivalTimeElement = document.querySelector('#timein');
  var departureTimeElement = document.querySelector('#timeout');
  var noticeFormElement = document.querySelector('.notice__form');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var timeElementSelectHandler = function (evt) {
    var syncField = evt.target === departureTimeElement ? arrivalTimeElement : departureTimeElement;
    window.synchronizeFields(evt.target, syncField, HOTEL_CHECK_TIMES, HOTEL_CHECK_TIMES, syncValues);
  };

  arrivalTimeElement.addEventListener('change', timeElementSelectHandler);
  departureTimeElement.addEventListener('change', timeElementSelectHandler);


  var houseTypeElement = document.querySelector('#type');
  var price = document.querySelector('#price');

  var setFormValuesDefult = function () {
    noticeFormElement.reset();
    price.defaultValue = 1000;
  };

  setFormValuesDefult();

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  var typeElementSelectHandler = function (evt) {
    window.synchronizeFields(evt.target, price, HOTEL_TYPES, MIN_PRICES, syncValueWithMin);
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

  var loadHandler = function () {
    setFormValuesDefult();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(noticeFormElement), loadHandler);
    evt.preventDefault();
  };

  roomNumberElement.addEventListener('click', capacitySelectHandler);
  noticeFormElement.addEventListener('submit', formSubmitHandler);

  window.setFormDisabled = function (isDisable) {
    var fieldsetsElements = noticeFormElement.querySelectorAll('fieldset');
    if (!isDisable) {
      noticeFormElement.classList.remove('notice__form--disabled');
    }
    for (var i = 0; i < fieldsetsElements.length; i++) {
      fieldsetsElements[i].disabled = isDisable;
    }
  };
})();
