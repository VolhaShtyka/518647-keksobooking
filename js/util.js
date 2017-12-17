'use strict';

(function () {
  window.util = {
    getRandomValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    renderElements: function (elementsList, parentElement) {
      var fragment = document.createDocumentFragment();
      elementsList.forEach(function (element) {
        fragment.appendChild(element);
      });
      parentElement.appendChild(fragment);
    }
  };
})();
