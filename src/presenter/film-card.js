import FilmCard from "../view/film-card.js";
import FilmDetailsPopup from "../view/film-details-popup.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";

export default class FilmCardPresenter {
  constructor(movieListContainer, changeData) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmCard(film);
    this._filmDetailsComponent = new FilmDetailsPopup(film);
    this._popupContainer = document.querySelector(`main`);

    this._filmComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchlistPopupClickHandler(this._handleWatchlistPopupClick);
    this._filmDetailsComponent.setWatchedPopupClickHandler(this._handleWatchedPopupClick);
    this._filmDetailsComponent.setFavoritePopupClickHandler(this._handleFavoritePopupClick);
    this._filmDetailsComponent.setClosePopupHandler(this._handleCloseClick);
    // this._filmDetailsComponent.setDeleteCommentHandler(this._handleDeleteComment);
    // this._filmDetailsComponent.setAddCommentHandler(this._handleAddComment);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._movieListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._movieListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._popupContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();

      remove(this._filmDetailsComponent);
    }
  }

  _handleOpenClick() {
    const prevPopup = document.querySelector(`.film-details`);
    if (prevPopup !== null) {
      prevPopup.remove();
    }

    render(this._popupContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCloseClick(update) {
    // remove(this._filmDetailsComponent);
    // document.removeEventListener(`keydown`, this._escKeyDownHandler);

    // const isMinorUpdate =
    //   this._filmComponent.isFavorite !== update.isFavorite ||
    //   this._filmComponent.isWatched !== update.isWatched ||
    //   this._filmComponent.isWatchingList !== update.isWatchingList;

    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        // isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isWatchingList: !this._film.isWatchingList
            }
        )
    );
  }

  _handleWatchlistPopupClick() {
    // Или это здесь презентер должен перерисовать попап на основании полученного update?
    return;
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleWatchedPopupClick() {
    return;
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleFavoritePopupClick() {
    return;
  }

  _handleDeleteComment() {
    return;
  }

  _handleAddComment() {
    return;
  }
}
