import {getRunTime} from "../utils/utils.js";
import Abstract from "./abstract.js";

const createFilmCard = (film) => {
  const {title, poster, rating, shortDescription, genre, runtime, commentsCount, releaseYear, isWatched, isWatchingList, isFavorite} = film;

  const mainGenre = genre[0];

  const filmRuntime = getRunTime(runtime.hours, runtime.minutes);

  const getShortDescription = () => {
    if (shortDescription.length < 140) {
      return shortDescription;
    } else {
      const shortenedDescription = `${shortDescription.substring(0, 140)}...`;
      return shortenedDescription;
    }
  };

  const getComments = () => commentsCount > 1 ? `${commentsCount} comments` : `${commentsCount} comment`;

  const watchingListClassName = isWatchingList ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active` : `film-card__controls-item--add-to-watchlist`;
  const favoriteClassName = isFavorite ? `film-card__controls-item--favorite film-card__controls-item--active` : `film-card__controls-item--favorite`;
  const watchedClassName = isWatched ? `film-card__controls-item--mark-as-watched  film-card__controls-item--active` : `film-card__controls-item--mark-as-watched`; // Проверить, правильные ли классы и логика показа

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${filmRuntime}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${getShortDescription()}</p>
      <a class="film-card__comments">${getComments()}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button ${watchingListClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button ${watchedClassName}">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._openClickHandler = this._openClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`).forEach((elem) => elem.addEventListener(`click`, this._openClickHandler));
  }
}
