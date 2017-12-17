'use strict';

(function () {
  window.synchronizeFields = function (currentElement, elementToSynchronize, currentElementValues, synchronizeElementValues, synchronizeAction) {
    var synchronizeIndex = currentElementValues.indexOf(currentElement.value);
    synchronizeAction(elementToSynchronize, synchronizeElementValues[synchronizeIndex]);
  };
})();

