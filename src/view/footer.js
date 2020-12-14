import {CARDS_NUMBER} from "../utils/const.js";
import {createElement} from "../utils/utils.js";

const createFooterStats = () => {
  return (
    `<section class="footer__statistics">
      <p>${CARDS_NUMBER} movies inside</p>
    </section>`
  );
};

export default class FooterStats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStats();
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

