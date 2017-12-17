'use strict';

(function () {
  var MAX_HEIGHT_PIN_ON_MAP = 130;
  var MIN_HEIGHT_PIN_ON_MAP = 660;

  var pinMainElement = window.map.containerElement.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');

  var startCoords = {
    x: pinMainElement.offsetLeft,
    y: pinMainElement.offsetTop
  };

  var setAddressCoordinatesValue = function (x, y) {
    if (y > MAX_HEIGHT_PIN_ON_MAP && y < MIN_HEIGHT_PIN_ON_MAP) {
      pinMainElement.style.top = y + 'px';
      pinMainElement.style.left = x + 'px';
      addressElement.value = 'x: ' + x + ', y: ' + y;
    }
  };

  var elementMouseDownHandler = function (evt) {
    evt.preventDefault();
    window.map.containerElement.classList.remove('map--faded');
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
    calculateCurrentLocation(evt);
    document.addEventListener('mousemove', elementMouseMoveHandler);
    document.addEventListener('mouseup', elementMouseUpHandler);
  };

  var calculateCurrentLocation = function (mouse) {
    var shift = {
      x: startCoords.x - mouse.clientX,
      y: startCoords.y - mouse.clientY
    };
    var y = pinMainElement.offsetTop - shift.y;
    var x = pinMainElement.offsetLeft - shift.x;
    setAddressCoordinatesValue(x, y);
  };

  var elementMouseMoveHandler = function (evt) {
    evt.preventDefault();
    calculateCurrentLocation(evt);
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
  };

  var setMapActive = function () {
    window.map.renderPins(window.data.hotels);
    window.setFormDisabled(false);
  };

  var elementMouseUpHandler = function (evt) {
    evt.preventDefault();
    setMapActive();
    document.removeEventListener('mousemove', elementMouseMoveHandler);
    document.removeEventListener('mouseup', elementMouseUpHandler);
  };
  pinMainElement.addEventListener('mousedown', elementMouseDownHandler);
})();
