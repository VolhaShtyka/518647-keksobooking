'use strict';

(function () {

  var mapPinMainElement = document.querySelector('.map__pin--main');

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
    var pin;
    if (evt.target.tagName === 'IMG') {
      pin = evt.target.parentElement;
    } else {
      pin = evt.target;
    }

    if (pin !== null && pin !== mapPinMainElement && pin.classList.contains('map__pin')) {
      removeActivePopupElement();
      window.showCard(pin);

      var popupCloseElement = document.querySelector('.popup__close');
      popupCloseElement.addEventListener('click', removeActivePopupElement);
      popupCloseElement.addEventListener('keydown', dialogCloseEnterPressHandler);
      document.addEventListener('keydown', dialogEscPressHandler);
    }
  };

})();
