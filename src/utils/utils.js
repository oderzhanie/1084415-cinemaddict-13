import {FIRST_NAMES, LAST_NAMES} from "./const.js";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndex = (arr) => {
  return getRandomInteger(0, arr.length - 1);
};

export const getRandomElem = (elements) => {
  return elements[getRandomIndex(elements)];
};

const getShuffledArray = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

export const getRandomArray = (arr) => {
  const clonedArr = arr.slice();

  const shuffledArr = getShuffledArray(clonedArr);
  const result = shuffledArr.slice(getRandomInteger(1, shuffledArr.length - 1));

  return result;
};

export const getBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const getRandomName = () => {
  return `${getRandomElem(FIRST_NAMES)} ${getRandomElem(LAST_NAMES)}`;
};

export const getRandomDescription = (description) => {
  const sentences = description.split(`. `);
  const randomSentences = getRandomArray(sentences);
  const randomDescription = `${randomSentences.join(`. `)}.`;

  return randomDescription;
};

export const getRunTime = (hours, minutes) => {
  if (hours === 0) {
    return (
      ` ${minutes}m`
    );
  } else if (minutes === 0) {
    return (
      `${hours}h`
    );
  } else {
    return (
      `${hours}h ${minutes}m`
    );
  }
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
