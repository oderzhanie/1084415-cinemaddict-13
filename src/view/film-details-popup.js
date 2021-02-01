/* eslint-disable quotes */
import Smart from "./smart.js";
import dayjs from "dayjs";

const createFilmDetailsPopup = (data) => {
  const {title, rating, genre, runtime, commentsCount, comments, poster, originalTitle, director, writers, actors, releaseFullDate, country, fullDescription, ageRestriction, isWatched, isWatchingList, isFavorite} = data;

  const releaseDate = dayjs(releaseFullDate).format('DD MMMM YYYY');

  const watchingListChecked = isWatchingList ? `checked` : ``;
  const favoriteChecked = isFavorite ? `checked` : ``;
  const watchedChecked = isWatched ? `checked` : ``;

  const watchingListLabel = isWatchingList ? `Added to watchlist` : `Add to watchlist`;
  const watchedLabel = isWatched ? `Already watched` : `Mark as watched`;
  const favoriteLabel = isFavorite ? `Added to favorites` : `Add to favorites`;

  const filmRuntime = dayjs(runtime).format(`H[h] MM[m]`);

  const createGenresTemplate = () => {
    return (
      `<tr class="film-details__row">
          <td class="film-details__term">Genre</td>
          <td class="film-details__cell">
            <span class="film-details__genre">${genre.join(` `)}</span>
        </tr>`
    );
  };

  const createCommentsTemplate = () => {
    const commentsList = [];

    for (let item of comments) {
      const commentFullDate = dayjs(item.date).format(`YYYY/MM/DD HH:MM`);

      item =
          `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${item.emoji}.png" width="55" height="55" alt="emoji-${item.emoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${item.content}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${item.author}</span>
              <span class="film-details__comment-day">${commentFullDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
      ;
      commentsList.push(item);
    }

    return commentsList.join(``);
  };

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">
            <p class="film-details__age">${ageRestriction}</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
                ${createGenresTemplate()}
            </table>
            <p class="film-details__film-description">
              ${fullDescription}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchingListChecked}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${watchingListLabel}</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedChecked}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">${watchedLabel}</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteChecked}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${favoriteLabel}</label>
        </section>
      </div>
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
          <ul class="film-details__comments-list">
          ${createCommentsTemplate()}
          </ul>
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetailsPopup extends Smart {
  constructor(film) {
    super();
    this._data = FilmDetailsPopup.parseFilmToData(film);

    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._favoritePopupClickHandler = this._favoritePopupClickHandler.bind(this);
    this._watchlistPopupClickHandler = this._watchlistPopupClickHandler.bind(this);
    this._watchedPopupClickHandler = this._watchedPopupClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    // this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    // this._addCommentHandler = this._addCommentHandler.bind(this);
    // this._deleteCommentHandler = this._deleteCommentHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsPopup(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    // this.setAddCommentHandler(this._callback.addComment);
  }

  _setInnerHandlers() {
    // this.getElement()
    //   .querySelector(`.film-details__control-label--favorite`)
    //   .addEventListener(`click`, this._favoritePopupClickHandler);
    // this.getElement()
    //   .querySelector(`.film-details__control-label--watched`)
    //   .addEventListener(`click`, this._watchedPopupClickHandler);
    // this.getElement()
    //   .querySelector(`.film-details__control-label--watchlist`)
    //   .addEventListener(`click`, this._watchlistPopupClickHandler);
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label img`)
      .forEach((elem) => elem.addEventListener(`click`, this._emojiClickHandler));
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._descriptionInputHandler);
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closePopupHandler);

    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    if (deleteButtons) {
      for (let button of deleteButtons) {
        button.addEventListener(`click`, this._deleteCommentHandler);
      }
    }
  }

  _favoritePopupClickHandler(evt) {
    evt.preventDefault();
    this._data.scrollPosition = document.querySelector(`.film-details`).scrollTop;
    this.updateData({
      isFavorite: !this.isFavorite
    }, false);

    this._callback.favoritePopupClick();
    document.querySelector(`.film-details`).scrollTop = this._data.scrollPosition;
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoritePopupClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoritePopupClickHandler);
  }

  _watchlistPopupClickHandler(evt) {
    evt.preventDefault();
    this._data.scrollPosition = document.querySelector(`.film-details`).scrollTop;
    this.updateData({
      isWatchingList: !this.isWatchingList
    }, false);

    this._callback.watchlistPopupClick(this._data);
    document.querySelector(`.film-details`).scrollTop = this._data.scrollPosition;

  }

  setWatchlistPopupClickHandler(callback) {
    this._callback.watchlistPopupClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistPopupClickHandler);
  }

  _watchedPopupClickHandler(evt) {
    evt.preventDefault();
    this._data.scrollPosition = document.querySelector(`.film-details`).scrollTop;
    this.updateData({
      isWatched: !this.isWatched
    }, false);

    this._callback.watchedPopupClick();
    document.querySelector(`.film-details`).scrollTop = this._data.scrollPosition;
  }

  setWatchedPopupClickHandler(callback) {
    this._callback.watchedPopupClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedPopupClickHandler);
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    this._callback.closePopup(FilmDetailsPopup.parseDataToFilm(this._data)); // filmDetails обновляется, а модель про это не знает и не обновляет filmsBoard
  }

  setClosePopupHandler(callback) {
    this._callback.closePopup = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupHandler);
  }

  _emojiClickHandler(evt) {
    const newEmoji = document.createElement(`img`);
    newEmoji.src = evt.target.src;
    newEmoji.style.width = `100%`;

    const newCommentEmoji = document.querySelector(`.film-details__add-emoji-label`);
    if (newCommentEmoji.firstChild) {
      newCommentEmoji.removeChild(newCommentEmoji.firstChild);
    }

    newCommentEmoji.appendChild(newEmoji);
    this.updateData({
      newCommentEmojiTemplate: newEmoji
    }, true);
  }

  // _descriptionInputHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData({
  //     newCommentDescription: evt.target.value
  //   }, true);
  // }

  // _deleteCommentHandler(evt) {
  //   evt.preventDefault();
  //   // const parentComment = evt.target.closest(`.film-details__comment`);
  //   // const commentsList = this.getElement().querySelector(`.film-details__comments-list`);
  //   // commentsList.removeChild(parentComment);
  // }

  // setDeleteCommentHandler(callback) {
  //   this._callback.deleteComment = callback;
  //   this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((elem) => elem.addEventListener(`click`, this._deleteCommentHandler));
  // }

  // _addCommentHandler(evt) {
  //   evt.preventDefault();

  // }

  // setAddCommentHandler(callback) {
  //   this._callback.addComment = callback;
  //   // this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  // }

  // _formSubmitHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.formSubmit(FilmDetailsPopup.parseDataToTask(this._data));
  // }
  // setFormSubmitHandler(callback) {
  //   this._callback.formSubmit = callback;
  //   this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  // }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isWatched: film.isWatched,
          isWatchingList: film.isWatchingList,
          isFavorite: film.isFavorite,
          // commentsCount: film.commentsCount,
          // comments: film.comments,
          scrollPosition: null,
          newCommentEmojiTemplate: null,
          newCommentDescription: null
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.scrollPosition;

    return data;
  }
}
