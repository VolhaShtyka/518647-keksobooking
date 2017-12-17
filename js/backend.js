'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var errorHandler = function (message) {
    var errorDialog = document.createElement('div');
    errorDialog.style = 'z-index: 100; margin: 70% 20%; text-align: center; background-color: #FFD2D2;';
    errorDialog.style.color = 'blue';
    errorDialog.style.textShadow = '5px 5px 1px white';
    errorDialog.style.position = 'absolute';
    errorDialog.style.width = '50%';
    errorDialog.style.fontSize = '2em';
    errorDialog.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorDialog);
  };

  var setup = function (loadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case window.StatusCode.OK:
          loadHandler(xhr.response);
          break;
        case window.StatusCode.REDIRECT:
          error = 'Перенаправление';
          break;
        case window.StatusCode.REQUEST_ERROR:
          error = 'Неверный запрос';
          break;
        case window.StatusCode.AUTHORIZATION_ERROR:
          error = 'Пользователь не авторизован';
          break;
        case window.StatusCode.FILE_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case window.StatusCode.SERVER_ERROR:
          error = 'Ошибка сервера';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;
    return xhr;
  };

  window.backend = {
    load: function (loadHandler) {
      var xhr = setup(loadHandler, errorHandler);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, loadHandler) {
      var xhr = setup(loadHandler, errorHandler);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
