import {createElement} from "../utils/utils.js";

const createNoFilmsMessage = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsMessage();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
