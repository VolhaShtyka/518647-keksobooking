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

  var hotelsPinsElements = function () {
    hotelsPinsElements = [];
    for (var i = 0; i < window.data.hotels().length; i++) {
      hotelsPinsElements[i] = createHotelPinElement(window.data.hotels()[i]);
    }
    return hotelsPinsElements;
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
