import {FilterType} from "./const.js";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchingList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};
