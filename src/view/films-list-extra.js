import {createElement} from "../utils/utils.js";

const createFilmsListExtra = (name) => {
  return (
    `<section class="films-list--extra" name="${name}">
      <h2 class="films-list__title">${name}</h2>
    </section>`
  );
};

export default class FilmsListExtra {
  constructor(name) {
    this.name = name;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtra(this.name);
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
