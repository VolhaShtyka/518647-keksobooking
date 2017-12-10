'use strict';

(function () {

  var MAX_HEIGHT_PIN_ON_MAP = 130;
  var MIN_HEIGHT_PIN_ON_MAP = 660;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');

  var startCoords = {
    x: mapPinMainElement.offsetLeft - mapPinMainElement.offsetWidth / 2,
    y: mapPinMainElement.offsetTop - mapPinMainElement.offsetHeight
  };

  var setAddressCoordinatesValue = function (x, y) {
    if (y > MAX_HEIGHT_PIN_ON_MAP && y < MIN_HEIGHT_PIN_ON_MAP) {
      mapPinMainElement.style.top = y + 'px';
      mapPinMainElement.style.left = x + 'px';
      addressElement.value = 'x: ' + x + ', y: ' + y;
    }
  };

  var pinMainElementMouseDownHandler = function (evt) {
    evt.preventDefault();
    mapElement.classList.remove('map--faded');

    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    document.addEventListener('mousemove', pinMainElementMouseMoveHandler);
    document.addEventListener('mouseup', pinMainElementMouseUpHandler);
  };

  var pinMainElementMouseMoveHandler = function (evt) {
    evt.preventDefault();

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    var y = mapPinMainElement.offsetTop - shift.y;
    var x = mapPinMainElement.offsetLeft - shift.x;
    setAddressCoordinatesValue(x, y);
  };

  var hotelsPinsElements = function () {
    hotelsPinsElements = [];
    for (var i = 0; i < window.data.hotels.length; i++) {
      hotelsPinsElements[i] = window.pin.createHotelPinElement(window.data.hotels[i]);
    }
    return hotelsPinsElements;
  };

  var isFirstClickBoolean = true;

  var setMapActiveOnFirstClick = function (isFirstClick) {
    if (isFirstClick) {
      window.util.renderElements(hotelsPinsElements(), window.pin.hotelsPinsContainerElement);
      window.form.setElementsFormDisabled(false);
    }
  };

  var pinMainElementMouseUpHandler = function (evt) {
    evt.preventDefault();

    setMapActiveOnFirstClick(isFirstClickBoolean);
    isFirstClickBoolean = false;
    document.removeEventListener('mousemove', pinMainElementMouseMoveHandler);
    document.removeEventListener('mouseup', pinMainElementMouseUpHandler);
  };

  mapPinMainElement.addEventListener('mousedown', pinMainElementMouseDownHandler);

  window.map = {
    mapElement: document.querySelector('.map')
  };
})();
