import MainSortingFilter from "../view/main-sorting-filter.js";
import MainFilmsSection from "../view/main-films-section.js";
import FilmsList from "../view/films-list.js";
import FilmsListContainer from "../view/films-list-container";
import FilmCard from "../view/film-card.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmDetailsPopup from "../view/film-details-popup.js";
import NoFilms from "../view/no-films.js";
import {SortType} from "../utils/const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";
// import FilmsListExtra from "../view/films-list-extra.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {FILM_COUNT_PER_STEP /* EXTRAS_NUMBER, EXTRAS_NAMES*/} from "../utils/const.js";

export default class MovieList {
  constructor(movieListContainer, changeData) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._mainFilmsSectionComponent = new MainFilmsSection();
    this._mainSortingFilterComponent = new MainSortingFilter();
    this._filmsListComponent = new FilmsList();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._noFilmsComponent = new NoFilms();

    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    // this._handleOpenClick = this._handleOpenClick.bind(this);
    // this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    // this._handleWatchedClick = this._handleWatchedClick.bind(this);
    // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._handleCloseClick = this._handleCloseClick.bind(this);
    // this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(films) {
    this._sourcedFilms = films.slice();
    this._renderSort();

    render(this._movieListContainer, this._mainFilmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._mainFilmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
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
    // const prevFilmComponent = this._filmComponent;
    // const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmCard(film);
    this._filmDetailsComponent = new FilmDetailsPopup(film);

    // if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
    //   render(this._movieListContainer, this._filmComponent, RenderPosition.BEFOREEND);
    //   return;
    // }
    // if (this._movieListContainer.contains(prevFilmComponent.getElement())) {
    //   replace(this._filmComponent, prevFilmComponent);
    // }
    // if (this._movieListContainer.contains(prevFilmDetailsComponent.getElement())) {
    //   replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    // }

    // remove(prevFilmComponent);
    // remove(prevFilmDetailsComponent);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmComponent.setFavoriteClickHandler(() => {
      this._changeData(
          Object.assign(
              {},
              this._film,
              {
                isFavorite: !this._film.isFavorite
              }
          )
      );
    });

    this._filmComponent.setWatchlistClickHandler(() => {

    });

    this._filmComponent.setWatchedClickHandler(() => {

    });


    this._filmComponent.setOpenClickHandler(() => {
      render(this._movieListContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      this._filmDetailsComponent.setClosePopupHandler(() => {
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });


    });

    render(this._filmsListContainerComponent, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._sourcedFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._sourcedFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsItems() {
    this._renderFilms(0, Math.min(this._sourcedFilms.length, FILM_COUNT_PER_STEP));

    if (this._sourcedFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsList() {
    this._filmsListContainerComponent.getElement().innerHTML = ``;
    remove(this._showMoreButtonComponent);
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderFilmsList() {
    if (this._sourcedFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsItems();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._sourcedFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._sourcedFilms.sort(sortFilmRating);
        break;
      default:
        this._sourcedFilms = this._sourcedFilms.slice();
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

