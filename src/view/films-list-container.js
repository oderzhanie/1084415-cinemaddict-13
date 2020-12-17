import Abstract from "./abstract.js";

const createFilmsListContainer = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsListContainer extends Abstract {
  getTemplate() {
    return createFilmsListContainer();
  }
}
