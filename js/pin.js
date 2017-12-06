'use strict';

(function () {

  var hotelsPinsContainerElement = window.map.mapElement.querySelector('.map__pins');
  var mapPinMainElement = window.map.mapElement.querySelector('.map__pin--main');

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

  var pinMainMouseupHandler = function () {
    window.map.mapElement.classList.remove('map--faded');
    window.util.renderElements(hotelsPinsElements(), hotelsPinsContainerElement);
    window.map.noticeFormElement.classList.remove('notice__form--disabled');
    window.map.setElementsFormDisabled(false);

    var addressElement = document.querySelector('#address');
    addressElement.value = mapPinMainElement.offsetLeft + ' ' + mapPinMainElement.offsetTop;
    mapPinMainElement.removeEventListener('mouseup', pinMainMouseupHandler);
  };

  var dialogEnterPressHandler = function (evt) {
    window.util.isEnterPressed(evt, window.openPopupHotelDialog);
  };

  mapPinMainElement.addEventListener('mouseup', pinMainMouseupHandler);
  hotelsPinsContainerElement.addEventListener('click', window.openPopupHotelDialog);
  hotelsPinsContainerElement.addEventListener('keydown', dialogEnterPressHandler);

})();
