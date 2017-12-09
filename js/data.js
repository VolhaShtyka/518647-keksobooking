'use strict';

(function () {

  var HOTELS_COUNT = 8;
  var HOTEL_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
  var HOTEL_CHECK_TIMES = ['12:00', '13:00', '14:00'];

  window.data = {
    HOTEL_TYPES: HOTEL_TYPES,
    HOTEL_CHECK_TIMES: HOTEL_CHECK_TIMES,

    hotels: function () {
      var similarHotels = [];
      for (var i = 0; i < HOTELS_COUNT; i++) {
        var locationX = window.util.getRandomNumber(300, 900);
        var locationY = window.util.getRandomNumber(100, 500);
        similarHotels[i] = {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': HOTEL_TITLES[i],
            'address': locationX + ' ' + locationY,
            'price': window.util.getRandomNumber(1000, 1000000),
            'type': window.util.getRandomValue(HOTEL_TYPES),
            'rooms': window.util.getRandomNumber(1, 5),
            'guests': window.util.getRandomNumber(1, 15),
            'checkin': window.util.getRandomValue(HOTEL_CHECK_TIMES),
            'checkout': window.util.getRandomValue(HOTEL_CHECK_TIMES),
            'features': window.util.getRandomArray(HOTEL_FEATURES),
            'description': [],
            'photos': []
          },
          'location': {
            'x': locationX,
            'y': locationY
          }
        };
      }
      return similarHotels;
    },

    findHotelFromPinElement: function (authorAvatarSrc) {
      var hotel;
      for (var i = 0; i < window.data.hotels().length; i++) {
        if (window.data.hotels()[i].author.avatar === authorAvatarSrc) {
          hotel = window.data.hotels()[i];
          break;
        }
      }
      return hotel;
    }
  };
})();
