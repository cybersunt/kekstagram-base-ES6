const DataPictures = {
  COUNT_PHOTOS: 25,

  MIN_LIKES: 15,
  MAX_LIKES: 200,

  MIN_AVATAR_NUM: 1,
  MAX_AVATAR_NUM: 6,

  MESSAGES: [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ],

  USER_NAMES: [`Артем`, `Игорь`, `Марина`, `Динара`, `Вадим`, `Сергей`]
};

const generateSrcImage = () => {
  const numberImage = getRandomNumber(DataPictures.MIN_AVATAR_NUM, DataPictures.MAX_AVATAR_NUM);
  return `img/avatar-${numberImage}.svg`;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = (array) => {
  const randomIndex = getRandomNumber(1, array.length - 1);
  const randomElement = array[randomIndex];
  return randomElement;
};

const generateMessages = () => {
  const messages = [];

  const countComments = getRandomNumber(DataPictures.MIN_AVATAR_NUM, DataPictures.MAX_AVATAR_NUM - 1);

  for (let i = 0; i < countComments; i++) {
    messages.push({
      avatar: generateSrcImage(DataPictures.MIN_AVATAR_NUM, DataPictures.MAX_AVATAR_NUM),
      name: getRandomElement(DataPictures.USER_NAMES),
      message: getRandomElement(DataPictures.MESSAGES)
    });
  }
  return messages;
};

const generateMocksData = () => {
  const notes = [];

  for (let i = 1; i < DataPictures.COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: `photos/${i}.jpg`,
      likes: getRandomNumber(DataPictures.MIN_LIKES, DataPictures.MAX_LIKES),
      comments: generateMessages(),
      description: getRandomElement(DataPictures.MESSAGES)
    });
  }
  return notes;
};

export default generateMocksData;
