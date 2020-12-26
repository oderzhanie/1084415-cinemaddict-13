import {getRandomInteger, getRandomElem, getRandomArray, getRandomName, getBoolean, getRandomDescription} from "../utils/utils.js";
import {text, TITLES, POSTERS, GENRES, COUNTRIES, ELEMENTS_MIN, ELEMENTS_MAX, FILMS_START_YEAR, FILMS_END_YEAR, START_MONTH, END_MONTH, START_DATE, END_DATE, START_MINUTES, END_MINUTES, FILMS_START_HOUR, FILMS_END_HOUR, RATING_MIN, RATING_MAX, AGE_MIN, AGE_MAX} from "../utils/const.js";
import {getCommentsArray} from "../mocks/comments.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomElements = () => {
  const elements = [];
  const number = getRandomInteger(ELEMENTS_MIN, ELEMENTS_MAX);
  for (let i = 0; i < number; i++) {
    const elem = getRandomName();
    elements.push(elem);
  }
  return elements;
};

const generateDate = () => {
  const releaseDate = new Date(getRandomInteger(FILMS_START_YEAR, FILMS_END_YEAR), getRandomInteger(START_MONTH, END_MONTH), getRandomInteger(START_DATE, END_DATE));
  return releaseDate;
};

export const generateFilm = () => {
  const filmTitle = getRandomElem(TITLES);
  const description = text;
  const filmPoster = `../../images/posters/${getRandomElem(POSTERS)}`;
  const filmDate = generateDate();
  filmDate.setDate(getRandomInteger(START_DATE, END_DATE));
  filmDate.setMonth(getRandomInteger(START_MONTH, END_MONTH));
  filmDate.setUTCFullYear(getRandomInteger(FILMS_START_YEAR, FILMS_END_YEAR));
  filmDate.setHours(getRandomInteger(FILMS_START_HOUR, FILMS_END_HOUR));
  filmDate.setMinutes(getRandomInteger(START_MINUTES, END_MINUTES));
  const commentsArray = getCommentsArray();

  return {
    id: generateId(),
    title: filmTitle,
    poster: filmPoster,
    rating: `${getRandomInteger(RATING_MIN, RATING_MAX)}.${getRandomInteger(RATING_MIN, RATING_MAX)}`,
    shortDescription: getRandomDescription(text),
    genre: getRandomArray(GENRES),
    runtime: {
      hours: filmDate.getHours(),
      minutes: filmDate.getMinutes()
    },
    commentsCount: commentsArray.length,
    comments: commentsArray,
    originalTitle: filmTitle,
    director: getRandomName(),
    writers: getRandomElements(),
    actors: getRandomElements(),
    releaseFullDate: filmDate,
    releaseYear: filmDate.getFullYear(),
    country: getRandomElem(COUNTRIES),
    fullDescription: description,
    ageRestriction: `${getRandomInteger(AGE_MIN, AGE_MAX)}+`,
    isWatched: getBoolean(),
    isWatchingList: getBoolean(),
    isFavorite: getBoolean()
  };
};
