'use strict';

(function () {
  var hotelsPinsElements = function () {
    hotelsPinsElements = [];
    for (var i = 0; i < window.data.hotels.length; i++) {
      hotelsPinsElements[i] = window.pin.createHotelPinElement(window.data.hotels[i]);
    }
    return hotelsPinsElements;
  };

  window.map = {
    mapElement: document.querySelector('.map'),

    noticeFormElement: document.querySelector('.notice__form'),

    setElementsFormDisabled: function (isDisable) {
      var fieldsetsFormElements = window.map.noticeFormElement.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsetsFormElements.length; i++) {
        fieldsetsFormElements[i].disabled = isDisable;
      }
    }
  };
})();
