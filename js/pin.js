'use strict';

(function () {


  var hotelPinElementTemplate = document.querySelector('template').content.querySelector('button.map__pin');

  var createHotelPinElement = function (hotel) {
    var hotelPinElement = hotelPinElementTemplate.cloneNode(true);
    hotelPinElement.style.left = hotel.location.x + 'px';
    hotelPinElement.style.top = hotel.location.y + 'px';
    hotelPinElement.querySelector('img').src = hotel.author.avatar;
    return hotelPinElement;
  };

  var dialogEnterPressHandler = function (evt) {
    window.util.isEnterPressed(evt, window.openPopupHotelDialog);
  };

  var dialogClickHandler = function (evt) {
    window.openPopupHotelDialog(evt);
  };

  var hotelsPinsContainerElement = document.querySelector('.map__pins');

  hotelsPinsContainerElement.addEventListener('click', dialogClickHandler);
  hotelsPinsContainerElement.addEventListener('keydown', dialogEnterPressHandler);

  window.pin = {
    hotelsPinsContainerElement: hotelsPinsContainerElement,

    createHotelPinElement: function (hotel) {
      return createHotelPinElement(hotel);
    }
  };

})();
