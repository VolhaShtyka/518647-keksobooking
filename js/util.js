'use strict';

(function () {

  var KEY_CODE_ESCAPE = 27;
  var KEY_CODE_ENTER = 13;

  window.util = {
    isEscapePressed: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        action(evt);
      }
    },

    isEnterPressed: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action(evt);
      }
    },

    getRandomValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getRandomArray: function (arr) {
      var newArrLength = window.util.getRandomNumber(1, arr.length);
      var newArray = [];
      for (var i = 0; i < newArrLength; i++) {
        var newValue = window.util.getRandomValue(arr);
        if (!newArray.includes(newValue)) {
          newArray[i] = newValue;
        }
      }
      return newArray;
    },
    renderElements: function (elementsList, elementForRender) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < elementsList.length; i++) {
        fragment.appendChild(elementsList[i]);
      }
      elementForRender.appendChild(fragment);
    }
  };
})();
