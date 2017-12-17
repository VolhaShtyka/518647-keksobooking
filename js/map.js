'use strict';

(function () {
  var HOTELS_PINS_COUNT = 5;

  window.setFormDisabled(true);

  var removeActiveElements = function () {
    var hotelsPins = window.map.containerElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.prototype.forEach.call(hotelsPins, function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var createElements = function (hotels) {
    var pinsElements = [];
    hotels.slice(0, HOTELS_PINS_COUNT).forEach(function (hotel) {
      pinsElements.push(window.pin.createElement(hotel));
    });
    return pinsElements;
  };

  window.map = {
    containerElement: document.querySelector('.map'),
    renderPins: function (hotels) {
      removeActiveElements();
      window.util.renderElements(createElements(hotels), window.pin.containerElement);
    }
  };
})();
