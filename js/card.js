'use strict';

(function () {

  var pinMainElement = document.querySelector('.map__pin--main');

  var removeActiveBehaivor = function () {
    Array.from(document.querySelectorAll('.map__pin--active')).forEach(function (element) {
      element.classList.remove('map__pin--active');
    });
  };

  var hideCard = function () {
    var popupElement = document.querySelector('.map__card.popup');
    if (popupElement !== null) {
      popupElement.remove();
      removeActiveBehaivor();
      document.removeEventListener('keydown', closeButtonEnterPressHandler);
      document.removeEventListener('click', dialogEscPressHandler);
    }
  };

  var closeButtonEnterPressHandler = function (evt) {
    window.keyboard.isEnterPressed(evt, hideCard);
  };

  var dialogEscPressHandler = function (evt) {
    window.keyboard.isEscPressed(evt, hideCard);
  };

  var closeButtonClickHandler = function () {
    hideCard();
  };

  window.openPopup = function (evt) {
    var pinElement = evt.target.tagName === 'IMG' ? evt.target.parentElement : evt.target;
    if (pinElement !== null && pinElement !== pinMainElement && pinElement.classList.contains('map__pin')) {
      hideCard();
      window.showCard(pinElement);
      var closeButtonElement = document.querySelector('.popup__close');
      closeButtonElement.addEventListener('keydown', closeButtonEnterPressHandler);
      closeButtonElement.addEventListener('click', closeButtonClickHandler);
      document.addEventListener('keydown', dialogEscPressHandler);
    }
  };
})();
