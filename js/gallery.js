'use strict';

(function () {
  const renderPicture = (image, pictureIndex) =>{
    const picturesTemplate = document.querySelector(`#picture`).content;
    const picturesElement = picturesTemplate.cloneNode(true);

    picturesElement.querySelector(`.picture__img`).src = image.url;
    picturesElement.querySelector(`.picture__likes`).textContent = image.likes;
    picturesElement.querySelector(`.picture__comments`).textContent = image.comments.length;
    picturesElement.querySelector(`.picture img`).dataset.id = pictureIndex;

    return picturesElement;
  };

  const renderPhotos = (arrayPictures) => {
    const picturesList = document.querySelector(`.pictures`);
    const fragment = document.createDocumentFragment();

    arrayPictures.forEach((el, index) => fragment.appendChild(renderPicture(el, index)));

    window.preview.showPhoto(arrayPictures);

    picturesList.appendChild(fragment);
  };

  window.gallery = {
    renderPhotos: renderPhotos
  };
})();
