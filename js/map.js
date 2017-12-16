'use strict';

(function () {

  var MAX_HEIGHT_PIN_ON_MAP = 130;
  var MIN_HEIGHT_PIN_ON_MAP = 660;
  var HOTELS_PINS_COUNT = 5;

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

  var removePinsElements = function () {
    var allHotelsPins = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.prototype.forEach.call(allHotelsPins, function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var createHotelsPinsElements = function (hotels) {
    var hotelsPinsElements = [];
    hotels.slice(0, HOTELS_PINS_COUNT).forEach(function (item) {
      hotelsPinsElements.push(window.pin.createHotelPinElement(item));
    });
    return hotelsPinsElements;
  };

  var isFirstClickBoolean = true;

  var renderHotelsPins = function (hotels) {
    removePinsElements();
    window.util.renderElements(createHotelsPinsElements(hotels), window.pin.hotelsPinsContainerElement);
  };

  var setMapActiveOnFirstClick = function (isFirstClick) {
    if (isFirstClick) {
      renderHotelsPins(window.data.hotels);
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
    mapElement: document.querySelector('.map'),
    renderHotelsPins: function (hotels) {
      renderHotelsPins(hotels);
    }
  };
})();
