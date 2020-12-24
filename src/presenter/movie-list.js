import MainSortingFilter from "../view/main-sorting-filter.js";
import MainFilmsSection from "../view/main-films-section.js";
import FilmsList from "../view/films-list.js";
import FilmsListContainer from "../view/films-list-container";
import FilmCardPresenter from "./film-card.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilms from "../view/no-films.js";
import {SortType} from "../utils/const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";
import {updateItem} from "../utils/utils.js";
// import FilmsListExtra from "../view/films-list-extra.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {FILM_COUNT_PER_STEP /* EXTRAS_NUMBER, EXTRAS_NAMES*/} from "../utils/const.js";

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmCardPresenter = {};

    this._mainFilmsSectionComponent = new MainFilmsSection();
    this._mainSortingFilterComponent = new MainSortingFilter();
    this._filmsListComponent = new FilmsList();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._noFilmsComponent = new NoFilms();

    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderSort();

    render(this._movieListContainer, this._mainFilmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._mainFilmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
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
    const filmCardPresenter = new FilmCardPresenter(this._filmsListContainerComponent, this._handleFilmChange);
    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsItems() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._sourcedFilms.length > FILM_COUNT_PER_STEP) {
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
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsItems();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsItems();
  }

  // _renderExtras() {
  //   if (this._films.length > 0) {
  //     const mostRated = this._films.slice().filter(() => {

  //     })

  //     const extraRated = new FilmsListExtra(EXTRAS_NAMES[0]);
  //     render(this._movieListContainer, extraRated, RenderPosition.BEFOREEND);
  //     const extraRatedContainer = new FilmsListContainer();
  //     render(extraRated, extraRatedContainer, RenderPosition.BEFOREEND);


  //     // const extraWatched = new FilmsListExtra(EXTRAS_NAMES[1]);

  //     // render(this._movieListContainer, extraWatched, RenderPosition.BEFOREEND);

  //     // const filmsListsExtra = this._movieListContainer.querySelectorAll(`.films-list--extra`);

  //     // for (const filmsListExtra of filmsListsExtra) {
  //     //   render(filmsListExtra, new FilmsListContainer(), RenderPosition.BEFOREEND);
  //     //   const extraContainer = filmsListExtra.querySelector(`.films-list__container`);
  //     //   for (let i = 0; i < EXTRAS_NUMBER; i++) {
  //     //     const randomIndex = getRandomIndex(films);
  //     //     renderFilm(extraContainer, this._films[randomIndex]);
  //     //   }
  //     // }
  //   }
  // }
}

