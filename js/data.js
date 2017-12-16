'use strict';

(function () {

//  var HOTELS_COUNT = 8;

  var loadHandler = function (hotels) {
  //  for (var i = 0; i < HOTELS_COUNT; i++) {
    window.data.hotels = hotels;
  //  }
  };

  var errorHandler = function (message) {
    var errorDialog = document.createElement('div');
    errorDialog.style = 'z-index: 100; margin: 70% 20%; text-align: center; background-color: #FFD2D2;';
    errorDialog.style.color = 'blue';
    errorDialog.style.textShadow = '5px 5px 1px white';
    errorDialog.style.position = 'absolute';
    errorDialog.style.width = '50%';
    errorDialog.style.fontSize = '2em';

    errorDialog.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorDialog);
  };

  window.backend.load(loadHandler, errorHandler);

  window.data = {
    hotels: [],

    errorHandler: function (message) {
      errorHandler(message);
    },

    findHotelFromPinElement: function (authorAvatarSrc) {
      var hotel;
      for (var i = 0; i < window.data.hotels.length; i++) {
        if (window.data.hotels[i].author.avatar === authorAvatarSrc) {
          hotel = window.data.hotels[i];
          break;
        }
      }
      return hotel;
    }
  };
})();
