'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PHOTO_PREVIEW = {
    WIDTH: 70,
    HEIGHT: 70
  };
  var MAX_PHOTOS_TO_UPLOAD = 5;

  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarFileChooser = document.querySelector('#avatar');

  var photoPreviewContainer = document.querySelector('.ad-form__photo-container');
  var photoPreviewSelector = '.ad-form__photo';
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

  // Сброс аватарки до изначального состояния
  function resetAvatarPreview() {
    avatarPreview.src = DEFAULT_AVATAR;
    avatarFileChooser.value = '';
  }

  // Создание пустого контейнера для фото жилья
  function getSinglePhotoBlock() {
    var block = document.createElement('div');
    block.classList.add(photoPreviewSelector.replace('.', ''));

    return block;
  }

  // Загрузка превью фотографий
  function createPhotoPreview(source) {
    var result = getSinglePhotoBlock();
    var imgElement = document.createElement('img');
    imgElement.src = source;
    imgElement.width = PHOTO_PREVIEW.WIDTH;
    imgElement.height = PHOTO_PREVIEW.WIDTH;
    imgElement.alt = 'Фотография жилья';

    result.appendChild(imgElement);

    return result;
  }

  // Удаление предыдущих фото
  function removePhotosPreview() {
    var previews = photoPreviewContainer.querySelectorAll(photoPreviewSelector);
    Array.from(previews).forEach(function (it) {
      it.remove();
    });
  }

  // Сброс фото жилья до изначального состояния
  function resetPhotosPreview() {
    removePhotosPreview();
    photoPreviewContainer.appendChild(getSinglePhotoBlock());
    photosFileChooser.value = '';
  }

  // Показ превью фотографий - обработчик по выбору файлов
  function onFilesChoose() {
    var files = photosFileChooser.files;
    var count = Math.min(files.length, MAX_PHOTOS_TO_UPLOAD);

    removePhotosPreview();
    for (var i = 0; i < count; i++) {
      if (checkImgFormat(files[i].name)) {
        renderFile(files[i]);
      }
    }

    function renderFile(file) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photoPreviewContainer.appendChild(createPhotoPreview(reader.result));
      });
      reader.readAsDataURL(file);
    }
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
