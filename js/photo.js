'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PHOTO_PREVIEW = {
    WIDTH: 70,
    HEIGHT: 70
  };
  var MAX_PHOTOS_TO_UPLOAD = 5;
  var photosCounter = 0;

  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarFileChooser = document.querySelector('#avatar');

  var photoPreviewContainer = document.querySelector('.ad-form__photo-container');
  var photoPreviewElement = document.querySelector('.ad-form__photo');
  var photosFileChooser = document.querySelector('#images');

  function checkImgFormat(fileName) {
    return FILE_TYPES.some(function (type) {
      return fileName.toLowerCase().endsWith(type);
    });
  }

  // Показ превью аватарки - обработчик по выбору файла
  function onAvatarChoose() {
    var file = avatarFileChooser.files[0];
    if (checkImgFormat(file.name)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  // Загрузка превью фотографий
  function createPhotoPreview(source) {
    var imgElement = document.createElement('img');
    imgElement.src = source;
    imgElement.width = PHOTO_PREVIEW.WIDTH;
    imgElement.height = PHOTO_PREVIEW.WIDTH;
    imgElement.alt = 'Фотография жилья';
    var result = photoPreviewElement.cloneNode();
    result.appendChild(imgElement);
    return result;
  }

  // Показ превью фотографий - обработчик по выбору файлов
  function onFilesChoose() {
    if (photosCounter === 0) {
      photoPreviewContainer.querySelector('.ad-form__photo').remove();
    }
    var files = photosFileChooser.files;
    Array.from(files).forEach(function (file) {
      if (checkImgFormat(file.name) && photosCounter < MAX_PHOTOS_TO_UPLOAD) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          photoPreviewContainer.appendChild(createPhotoPreview(reader.result));
        });
        reader.readAsDataURL(file);
      }
      photosCounter++;
    });
  }

  function resetAvatarPreview() {
    avatarPreview.src = DEFAULT_AVATAR;
  }

  function resetPhotosPreview() {
    var previews = photoPreviewContainer.querySelectorAll('.ad-form__photo');
    Array.from(previews).forEach(function (it) {
      it.remove();
    });
    photoPreviewContainer.appendChild(photoPreviewElement.cloneNode());
    photosCounter = 0;
  }

  photosFileChooser.setAttribute('multiple', 'true');
  avatarFileChooser.addEventListener('change', onAvatarChoose);
  photosFileChooser.addEventListener('change', onFilesChoose);

  window.photo = {
    resetAvatarPreview: resetAvatarPreview,
    resetPhotosPreview: resetPhotosPreview
  };
})();

// EOF
