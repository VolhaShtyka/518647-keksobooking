'use strict';

(function () {

  var mapPinMainElement = document.querySelector('.map__pin--main');

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

  var removeActiveBehaivorFromAllPins = function () {
    var hotelsPinsActiveElements = document.querySelectorAll('.map__pin--active');
    for (var i = 0; i < hotelsPinsActiveElements.length; i++) {
      hotelsPinsActiveElements[i].classList.remove('map__pin--active');
    }
  };

  var removeActivePopupElement = function () {
    var popupHotelElement = document.querySelector('.map__card.popup');
    if (popupHotelElement !== null) {
      popupHotelElement.remove();
      removeActiveBehaivorFromAllPins();
      document.removeEventListener('keydown', dialogCloseEnterPressHandler);
      document.removeEventListener('click', dialogEscPressHandler);
    }
  };

  var dialogCloseEnterPressHandler = function (evt) {
    window.util.isEnterPressed(evt, removeActivePopupElement);
  };

  var dialogEscPressHandler = function (evt) {
    window.util.isEscapePressed(evt, removeActivePopupElement);
  };

  window.openPopupHotelDialog = function (evt) {
    var targetElement;
    if (evt.target.tagName === 'IMG') {
      targetElement = evt.target.parentElement;
    } else {
      targetElement = evt.target;
    }

    if (targetElement !== null && targetElement !== mapPinMainElement && targetElement.classList.contains('map__pin')) {
      removeActivePopupElement();
      targetElement.classList.add('map__pin--active');
      var hotelElement = [createHotelElement(window.data.findHotelFromPinElement(targetElement.querySelector('img').getAttribute('src')))];
      window.util.renderElements(hotelElement, window.map.mapElement);

      var popupCloseElement = document.querySelector('.popup__close');
      popupCloseElement.addEventListener('click', removeActivePopupElement);
      popupCloseElement.addEventListener('keydown', dialogCloseEnterPressHandler);
      document.addEventListener('keydown', dialogEscPressHandler);
    }
  };

})();
