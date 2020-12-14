import {createElement} from "../utils/utils.js";

const createFilterTemplate = (filter) => {
  const {name, count} = filter;

  const upperName = () => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName;
  };

  return (
    `<a href="#${name}" class="main-navigation__item">${upperName()} <span class="main-navigation__item-count">${count}</span></a>`
  );
};


const createMainSiteMenu = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterTemplate(filter))
    .join(``);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainSiteMenu(this._filters);
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
