export const createFilmCard = (film) => {
  const {title, poster, rating, shortDescription, genre, runtime, commentsCount, releaseYear, isWatched, isWatchingList, isFavorite} = film;

  const mainGenre = genre[0];

  const getRunTime = () => {
    if (runtime.hours === 0) {
      return (
        ` ${runtime.minutes}m`
      );
    } else if (runtime.minutes === 0) {
      return (
        `${runtime.hours}h`
      );
    } else {
      return (
        `${runtime.hours}h ${runtime.minutes}m`
      );
    }
  };

  const getShortDescription = () => {
    if (shortDescription.length < 140) {
      return shortDescription;
    } else {
      const shortenedDescription = `${shortDescription.substring(0, 140)}...`;
      return shortenedDescription;
    }
  };

  const getComments = () => {
    if (commentsCount === 1) {
      return (
        `${commentsCount} comment`
      );
    } else {
      return (
        `${commentsCount} comments`
      );
    }
  };

  const watchingListClassName = isWatchingList ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active` : `film-card__controls-item--add-to-watchlist`;
  const favoriteClassName = isFavorite ? `film-card__controls-item--favorite film-card__controls-item--active` : `film-card__controls-item--favorite`;
  const watchedClassName = isWatched ? `film-card__controls-item--mark-as-watched  film-card__controls-item--active` : `film-card__controls-item--mark-as-watched`; // Проверить, правильные ли классы и логика показа

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${getRunTime()}</span>
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
