import Abstract from "./abstract.js";
import {SortType} from "../utils/const.js";

const createMainSortingFilter = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class MainSortingFilters extends Abstract {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortActiveChangeHandler = this._sortActiveChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainSortingFilter();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _sortActiveChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortActiveChange(evt);
  }

  setSortActiveChangeHandler(callback) {
    this._callback.sortActiveChange = callback;
    this.getElement().querySelectorAll(`.sort__button`).forEach((elem) => elem.addEventListener(`click`, this._sortActiveChangeHandler));
  }
}
