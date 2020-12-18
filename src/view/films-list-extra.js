import Abstract from "./abstract.js";

const createFilmsListExtra = (name) => {
  return (
    `<section class="films-list--extra" name="${name}">
      <h2 class="films-list__title">${name}</h2>
    </section>`
  );
};

export default class FilmsListExtra extends Abstract {
  constructor(name) {
    super();
    this.name = name;
  }

  getTemplate() {
    return createFilmsListExtra(this.name);
  }
}
