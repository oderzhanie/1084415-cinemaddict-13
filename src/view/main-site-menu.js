import Abstract from "./abstract.js";

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

export default class SiteMenu extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainSiteMenu(this._filters);
  }
}
