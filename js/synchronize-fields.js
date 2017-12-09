'use strict';

(function () {
  window.synchronizeFields = function (elementOne, elementTwo, elementOneValues, elementTwoValues, synchronizeAction) {
    for (var i = 0; i < elementOneValues.length; i++) {
      if (elementOneValues[i] === elementOne.value) {
        synchronizeAction(elementTwo, elementTwoValues[i]);
      }
    }
  };
})();

