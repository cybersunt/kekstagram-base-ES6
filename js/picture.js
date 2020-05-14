const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const editingWindow = document.querySelector(`.img-upload`);
const fileUploadButton = editingWindow.querySelector(`.img-upload__input`);
const previewPicture = editingWindow.querySelector(`.img-upload__preview img`);

const uploadFile = () => {
  const file = fileUploadButton.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      previewPicture.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

export {uploadFile};
