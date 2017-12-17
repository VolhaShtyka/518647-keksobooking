'use strict';

(function () {

  var pinElementTemplate = document.querySelector('template').content.querySelector('button.map__pin');
  var containerElement = document.querySelector('.map__pins');

  var pinEnterPressHandler = function (evt) {
    window.keyboard.isEnterPressed(evt, window.openPopup);
  };

  var pinClickHandler = function (evt) {
    window.openPopup(evt);
  };

  containerElement.addEventListener('click', pinClickHandler);
  containerElement.addEventListener('keydown', pinEnterPressHandler);

  window.pin = {
    containerElement: containerElement,
    createElement: function (hotel) {
      var pinElement = pinElementTemplate.cloneNode(true);
      pinElement.style.left = hotel.location.x + 'px';
      pinElement.style.top = hotel.location.y + 'px';
      pinElement.querySelector('img').src = hotel.author.avatar;
      return pinElement;
    }
  };
})();
