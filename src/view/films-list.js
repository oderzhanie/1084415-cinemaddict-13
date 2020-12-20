import Abstract from "./abstract.js";

const createFilmsList = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class FilmsList extends Abstract {
  getTemplate() {
    return createFilmsList();
  }
}
