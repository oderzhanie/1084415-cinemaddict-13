import MainSortingFilter from "../view/main-sorting-filter.js";
import MainFilmsSection from "../view/main-films-section.js";
import FilmsList from "../view/films-list.js";
import FilmsListContainer from "../view/films-list-container";
import FilmCardPresenter from "./film-card.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilms from "../view/no-films.js";
import {SortType, UpdateType, UserAction} from "../utils/const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";
import {filter} from "../utils/filter.js";
// import FilmsListExtra from "../view/films-list-extra.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {FILM_COUNT_PER_STEP /* EXTRAS_NUMBER, EXTRAS_NAMES */} from "../utils/const.js";

export default class MovieList {
  constructor(movieListContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._movieListContainer = movieListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmCardPresenter = {};
    this._filmCardPresenterExtra = {};

    this._mainFilmsSectionComponent = new MainFilmsSection();
    this._filmsListComponent = new FilmsList();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._noFilmsComponent = new NoFilms();


    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    // this._renderSort();

    render(this._movieListContainer, this._mainFilmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._mainFilmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
    // this._renderExtras();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmRating);
    }

    return filteredFilms;
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
        this._filmCardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmsBoard();
        break;
    }
  }

  _renderSort() {
    if (this._mainSortingFilterComponent !== null) {
      this._mainSortingFilterComponent = null;
    }

    this._mainSortingFilterComponent = new MainSortingFilter(this._currentSortType);
    this._mainSortingFilterComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._movieListContainer, this._mainSortingFilterComponent, RenderPosition.BEFOREEND);

    // this._mainSortingFilterComponent.setSortActiveChangeHandler((evt) => {
    //   const current = this._mainSortingFilterComponent.getElement().querySelector(`.sort__button--active`);
    //   current.className = `sort__button`;
    //   evt.target.className += ` sort__button--active`;
    // });
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
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButton();

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

  _clearFilmsBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._mainSortingFilterComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsBoard({resetRenderedFilmCount: true});
    this._renderFilmsBoard();
  }

  // _renderExtras() {
  //   if (this._films.length > 0) {
  //     const extraRatedList = new FilmsListExtra(EXTRAS_NAMES[0]);
  //     render(this._mainFilmsSectionComponent, extraRatedList, RenderPosition.BEFOREEND);
  //     const extraRatedContainer = new FilmsListContainer();
  //     render(extraRatedList, extraRatedContainer, RenderPosition.BEFOREEND);

  //     const ratedList = this._films.slice().sort(sortFilmRating);
  //     const mostRated = ratedList.slice(0, EXTRAS_NUMBER);
  //     mostRated.forEach((film) => {
  //       const filmCardPresenter = new FilmCardPresenter(extraRatedContainer, this._handleFilmChange);
  //       filmCardPresenter.init(film);
  //       this._filmCardPresenterExtra[film.id] = filmCardPresenter;
  //     });


  //     const mostWatchedList = this._films.slice().filter((film) => film.isWatched);
  //     if (mostWatchedList.length > 0) {
  //       const extraWatchedList = new FilmsListExtra(EXTRAS_NAMES[1]);
  //       render(this._mainFilmsSectionComponent, extraWatchedList, RenderPosition.BEFOREEND);
  //       const extraWatchedContainer = new FilmsListContainer();
  //       render(extraWatchedList, extraWatchedContainer, RenderPosition.BEFOREEND);

  //       const mostWatched = mostWatchedList.slice(0, EXTRAS_NUMBER);
  //       mostWatched.forEach((film) => {
  //         const filmCardPresenter = new FilmCardPresenter(extraWatchedContainer, this._handleFilmChange);
  //         filmCardPresenter.init(film);
  //         this._filmCardPresenterExtra[film.id] = filmCardPresenter;
  //       });
  //     }
  //   }
  // }
}

