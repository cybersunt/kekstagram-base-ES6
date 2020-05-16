let currentPhotos = null;
let originalPhotos = null;

const getOriginalPhotos = () => originalPhotos;
const saveOriginalPhotos = (data) => {
  originalPhotos = data;
};

const getCurrentPhotos = () => currentPhotos;
const savePhotos = (data) => {
  currentPhotos = data;
};

export {getOriginalPhotos, saveOriginalPhotos, getCurrentPhotos, savePhotos};
