import Abstract from "./abstract.js";

const createNoFilmsMessage = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilms extends Abstract {
  getTemplate() {
    return createNoFilmsMessage();
  }
}
