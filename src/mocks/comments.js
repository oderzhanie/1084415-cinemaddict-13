import {getRandomInteger, getRandomName, getRandomDescription} from "../utils/utils.js";
import {text, EMOJIS, FILMS_START_YEAR, FILMS_END_YEAR, COMMENTS_END_YEAR, COMMENTS_START_YEAR, START_MONTH, END_MONTH, START_DATE, END_DATE, START_MINUTES, END_MINUTES, COMMENTS_START_HOUR, COMMENTS_END_HOUR, COMMENTS_MAX} from "../utils/const.js";

const getRandomIndex = (indices) => {
  return getRandomInteger(0, indices.length - 1);
};

const getRandomElem = (elements) => {
  return elements[getRandomIndex(elements)];
};

const generateDate = () => {
  const releaseDate = new Date(getRandomInteger(FILMS_START_YEAR, FILMS_END_YEAR), getRandomInteger(START_MONTH, END_MONTH), getRandomInteger(START_DATE, END_DATE));
  return releaseDate;
};

const generateComment = () => {
  const commentDate = generateDate();

  commentDate.setDate(getRandomInteger(START_DATE, END_DATE));
  commentDate.setMonth(getRandomInteger(START_MONTH, END_MONTH));
  commentDate.setUTCFullYear(getRandomInteger(COMMENTS_START_YEAR, COMMENTS_END_YEAR));
  commentDate.setHours(getRandomInteger(COMMENTS_START_HOUR, COMMENTS_END_HOUR));
  commentDate.setMinutes(getRandomInteger(START_MINUTES, END_MINUTES));

  const comment = {
    content: getRandomDescription(text),
    emoji: getRandomElem(EMOJIS),
    author: getRandomName(),
    date: commentDate,
  };
  return comment;
};
const commentsNumber = getRandomInteger(0, COMMENTS_MAX);

export const getCommentsArray = () => {
  const commentsArray = [];
  for (let i = 0; i < commentsNumber; i++) {
    const comment = generateComment();
    commentsArray.push(comment);
  }
  return commentsArray;
};
