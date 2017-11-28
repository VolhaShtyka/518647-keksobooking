'use strict';

var HOTELS_COUNT = 8;
var HOTEL_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
var HOTEL_CHECK_TIMES = ['12:00', '13:00', '14:00'];

var createSimilarHotels = function () {
  var similarHotels = [];
  for (var i = 0; i < HOTELS_COUNT; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    similarHotels[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': HOTEL_TITLES[i],
        'address': locationX + ' ' + locationY,
        'price': getRandomNumber(1000, 1000000),
        'type': getRandomValue(HOTEL_TYPES),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 15),
        'checkin': getRandomValue(HOTEL_CHECK_TIMES),
        'checkout': getRandomValue(HOTEL_CHECK_TIMES),
        'features': getRandomArray(HOTEL_FEATURES),
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
};

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArray = function (arr) {
  var newArrLength = getRandomNumber(1, arr.length);
  var newArray = [];
  for (var i = 0; i < newArrLength; i++) {
    var newValue = getRandomValue(arr);
    if (!newArray.includes(newValue)) {
      newArray[i] = newValue;
    }
  }
  return newArray;
};

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var hotelsPinsElement = mapElement.querySelector('.map__pins');

var hotelPinElementTemplate = document.querySelector('template').content.querySelector('button.map__pin');

var createHotelPinElement = function (hotel) {
  var hotelPinElement = hotelPinElementTemplate.cloneNode(true);
  hotelPinElement.style.left = hotel.location.x + 'px';
  hotelPinElement.style.top = hotel.location.y + 'px';
  hotelPinElement.querySelector('img').src = hotel.author.avatar;
  return hotelPinElement;
};

var hotelsPinsElements = function (hotels) {
  hotelsPinsElements = [];
  for (var i = 0; i < hotels.length; i++) {
    hotelsPinsElements[i] = createHotelPinElement(hotels[i]);
  }
  return hotelsPinsElements;
};

var hotels = createSimilarHotels();

var mapElementTemplate = document.querySelector('template').content.querySelector('article.map__card');

var createHotelElement = function (hotel) {
  var hotelElement = mapElementTemplate.cloneNode(true);
  hotelElement.querySelector('h3').textContent = hotel.offer.title;
  hotelElement.querySelector('p small').textContent = hotel.offer.address;
  hotelElement.querySelector('.popup__price').textContent = hotel.offer.price + ' \u20BD/ночь';
  if (hotel.offer.type === 'flat') {
    hotelElement.querySelector('h4').textContent = 'Квартира';
  } else if (hotel.offer.type === 'house') {
    hotelElement.querySelector('h4').textContent = 'Дом';
  } else {
    hotelElement.querySelector('h4').textContent = 'Бунгало';
  }
  hotelElement.querySelector('p:nth-of-type(n + 3)').textContent = hotel.offer.rooms + (hotel.offer.rooms === 1 ? ' комната для ' : ' комнаты для ') + hotel.offer.guests + ' гостей';
  hotelElement.querySelector('p:nth-of-type(n + 4)').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  hotelElement.querySelector('.popup__features').innerHTML = '';
  for (var i = 0; i < hotel.offer.features.length; i++) {
    var li = document.createElement('li');
    li.className = 'feature feature--' + hotel.offer.features[i];
    hotelElement.appendChild(li);
  }
  hotelElement.querySelector('.popup__avatar').src = hotel.author.avatar;
  return hotelElement;
};

var renderElements = function (elementsList, elementForRender) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elementsList.length; i++) {
    fragment.appendChild(elementsList[i]);
  }
  elementForRender.appendChild(fragment);
};

renderElements(hotelsPinsElements(hotels), hotelsPinsElement);

var hotelsElements = [createHotelElement(hotels[0])];

renderElements(hotelsElements, mapElement);