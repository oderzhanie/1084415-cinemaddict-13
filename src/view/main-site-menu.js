const createFilterTemplate = (filter) => {
  const {name, count} = filter;
  const upperName = () => {
    let low = name;
    const newFirstLetter = low[0].toUpperCase();
    low = low.replace(low[0], newFirstLetter);
    return low;
  };

  return (
    `<a href="#${name}" class="main-navigation__item">${upperName(name)} <span class="main-navigation__item-count">${count}</span></a>`
  );
};


const createMainSiteMenu = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterTemplate(filter, index === 0))
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

export {createMainSiteMenu};
