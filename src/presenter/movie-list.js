import MainSortingFilter from "../view/main-sorting-filter.js";
import MainFilmsSection from "../view/main-films-section.js";
import FilmsList from "../view/films-list.js";
import FilmsListContainer from "../view/films-list-container";
import FilmCardPresenter from "./film-card.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilms from "../view/no-films.js";
import {SortType, UpdateType, UserAction} from "../utils/const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";
import FilmsListExtra from "../view/films-list-extra.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {FILM_COUNT_PER_STEP, EXTRAS_NUMBER, EXTRAS_NAMES} from "../utils/const.js";

export default class MovieList {
  constructor(movieListContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._movieListContainer = movieListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmCardPresenter = {};
    this._filmCardPresenterExtra = {};

    this._mainFilmsSectionComponent = new MainFilmsSection();
    this._mainSortingFilterComponent = new MainSortingFilter();
    this._filmsListComponent = new FilmsList();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._noFilmsComponent = new NoFilms();

    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();

    render(this._movieListContainer, this._mainFilmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._mainFilmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
    this._renderExtras();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmRating);
    }

    return this._filmsModel.getFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      // case UserAction.ADD_COMMENT:
      //   this._tasksModel.addTask(updateType, update);
      //   break;
      // case UserAction.DELETE_COMMENT:
      //   this._tasksModel.deleteTask(updateType, update);
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._filmCardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _renderSort() {
    render(this._movieListContainer, this._mainSortingFilterComponent, RenderPosition.BEFOREEND);
    this._mainSortingFilterComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    this._mainSortingFilterComponent.setSortActiveChangeHandler((evt) => {
      const current = this._mainSortingFilterComponent.getElement().querySelector(`.sort__button--active`);
      current.className = `sort__button`;
      evt.target.className += ` sort__button--active`;
    });
  }

  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter(this._filmsListContainerComponent, this._handleViewAction);
    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;

    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsItems() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsList() {
    Object
    .values(this._filmCardPresenter)
    .forEach((presenter) => presenter.destroy());

    this._filmCardPresenter = {};
    remove(this._showMoreButtonComponent);
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderFilmsList() {
    if (this._getFilms().length === 0) { // Проверить, правильно ли тут заместились _films
      this._renderNoFilms();
      return;
    }

    this._renderFilmsItems();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsList();
    this._renderFilmsItems();
  }

  _renderExtras() {
    if (this._films.length > 0) {
      const extraRatedList = new FilmsListExtra(EXTRAS_NAMES[0]);
      render(this._mainFilmsSectionComponent, extraRatedList, RenderPosition.BEFOREEND);
      const extraRatedContainer = new FilmsListContainer();
      render(extraRatedList, extraRatedContainer, RenderPosition.BEFOREEND);

      const ratedList = this._films.slice().sort(sortFilmRating);
      const mostRated = ratedList.slice(0, EXTRAS_NUMBER);
      mostRated.forEach((film) => {
        const filmCardPresenter = new FilmCardPresenter(extraRatedContainer, this._handleFilmChange);
        filmCardPresenter.init(film);
        this._filmCardPresenterExtra[film.id] = filmCardPresenter;
      });


      const mostWatchedList = this._films.slice().filter((film) => film.isWatched);
      if (mostWatchedList.length > 0) {
        const extraWatchedList = new FilmsListExtra(EXTRAS_NAMES[1]);
        render(this._mainFilmsSectionComponent, extraWatchedList, RenderPosition.BEFOREEND);
        const extraWatchedContainer = new FilmsListContainer();
        render(extraWatchedList, extraWatchedContainer, RenderPosition.BEFOREEND);

        const mostWatched = mostWatchedList.slice(0, EXTRAS_NUMBER);
        mostWatched.forEach((film) => {
          const filmCardPresenter = new FilmCardPresenter(extraWatchedContainer, this._handleFilmChange);
          filmCardPresenter.init(film);
          this._filmCardPresenterExtra[film.id] = filmCardPresenter;
        });
      }
    }
  }
}

