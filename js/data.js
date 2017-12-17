'use strict';

(function () {

  var loadHandler = function (hotels) {
    window.data.hotels = hotels;
  };

  window.backend.load(loadHandler);

  window.data = {
    hotels: [],
    getHotel: function (avatarSrc) {
      return window.data.hotels.find(function (hotel) {
        return (hotel.author.avatar === avatarSrc);
      });
    }
  };
})();
