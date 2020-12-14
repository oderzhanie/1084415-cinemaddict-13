import {createElement} from "../utils/utils.js";

const createMainFilmsSection = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class MainFilmsSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainFilmsSection();
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
