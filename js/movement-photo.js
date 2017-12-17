'use strict';

(function () {

  var dropZones = document.querySelectorAll('.drop-zone');
  document.querySelector('.form__photo-container').setAttribute('dropzone', 'move');

  var currentElement;

  var setCurrentCellBackground = function (color) {
    currentElement.style.backgroundColor = color;
  };

  var elementDragOverHandler = function (evt) {
    evt.preventDefault();
    return false;
  };

  var createImageElement = function (e) {
    var img = document.createElement('img');
    img.src = e.target.result;
    img.style.maxHeight = '200px';
    img.style.maxWidth = '200px';
    img.style.display = 'inline';
    img.draggable = 'true';
    img.addEventListener('dragstart', imageDragStartHandler);
    img.addEventListener('dragover', imageDragOverHandler);
    img.addEventListener('drop', imageDragDropHandler);
    currentElement.parentElement.appendChild(img);
  };

  var elementDragDropHandler = function (evt) {
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = (function () {
      return function (e) {
        if (currentElement.parentElement.querySelector('#avatar') !== null) {
          currentElement.parentElement.querySelector('img').src = e.target.result;
        } else {
          createImageElement(e);
        }
      };
    })(file);
    reader.readAsDataURL(file);
    setCurrentCellBackground('');
  };

  var elementDragEnterHandler = function (evt) {
    currentElement = evt.target;
    setCurrentCellBackground('yellow');
    evt.preventDefault();
  };

  var elementDragLeaveHandler = function (evt) {
    currentElement = evt.target;
    setCurrentCellBackground('');
    evt.preventDefault();
  };

  var artifact = null;

  var imageDragStartHandler = function (evt) {
    if (evt.target.tagName === 'IMG') {
      artifact = evt.target;
      evt.dataTransfer.setData('text/plain', 'evt.target.alt');
    }
  };

  var imageDragOverHandler = function (evt) {
    evt.preventDefault();
    return false;
  };

  var imageDragDropHandler = function (evt) {
    var currentCell = evt.target;
    currentCell.parentElement.insertBefore(artifact, currentCell);
    evt.preventDefault();
  };

  dropZones.forEach(function (zone) {
    zone.addEventListener('dragover', elementDragOverHandler);
    zone.addEventListener('drop', elementDragDropHandler);
    zone.addEventListener('dragenter', elementDragEnterHandler);
    zone.addEventListener('dragleave', elementDragLeaveHandler);
  });
})();

