'use strict';

(function () {

  var MAX_PHOTO_COUNT = 3;

  var mapElementTemplate = document.querySelector('template').content.querySelector('article.map__card');

  var setPhotos = function (element, photos) {
    var picturesContainer = element.querySelector('.popup__pictures');
    var template = picturesContainer.querySelector('li');
    photos.slice(0, MAX_PHOTO_COUNT).forEach(function (picture) {
      var cloneElement = template.cloneNode(true);
      var img = cloneElement.querySelector('img');
      img.src = picture;
      img.style.maxHeight = '30%';
      img.style.maxWidth = '30%';
      cloneElement.style.display = 'inline';
      picturesContainer.appendChild(cloneElement);
    });
    picturesContainer.removeChild(template);
  };

  var createElement = function (hotel) {
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
    setPhotos(hotelElement, hotel.offer.photos);
    hotel.offer.features.forEach(function (feature) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + feature;
      hotelElement.appendChild(li);
    });
    hotelElement.querySelector('.popup__avatar').src = hotel.author.avatar;

    return hotelElement;
  };

  window.showCard = function (pin) {
    pin.classList.add('map__pin--active');
    var hotelElement = [createElement(window.data.getHotel(pin.querySelector('img').getAttribute('src')))];
    window.util.renderElements(hotelElement, window.map.containerElement);
  };
})();
