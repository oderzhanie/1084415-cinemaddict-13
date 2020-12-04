import {CARDS_NUMBER, EXTRAS_NUMBER, EXTRAS_NAMES, FILM_COUNT_PER_STEP} from "./utils/const.js";
import {getRandomIndex} from "./utils/utils.js";
import {createUserStatus} from "../src/view/user-status.js";
import {createMainSiteMenu} from "../src/view/main-site-menu.js";
import {createMainSortingFilter} from "../src/view/main-sorting-filter.js";
import {createMainFilmsSection} from "../src/view/main-films-section.js";
import {createFilmsList} from "../src/view/films-list.js";
import {createFilmsListContainer} from "../src/view/films-list-container.js";
import {createFilmCard} from "../src/view/film-card.js";
import {createShowMoreButton} from "../src/view/show-more-button.js";
import {createFilmsListExtra} from "../src/view/films-list-extra.js";
import {createFooterStats} from "../src/view/footer.js";
import {createFilmDetailsPopup} from "../src/view/film-details-popup.js";
import {generateFilm} from "./mocks/film-card.js";
import {generateFilter} from "./mocks/filter.js";

const films = new Array(CARDS_NUMBER).fill(``).map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, createUserStatus());
render(siteMainElement, createMainSiteMenu(filters));
render(siteMainElement, createMainSortingFilter());

const siteFooter = document.querySelector(`.footer`);
render(siteFooter, createFooterStats());

render(siteMainElement, createMainFilmsSection());
const siteMainFilms = siteMainElement.querySelector(`.films`);
render(siteMainFilms, createFilmsList());
const filmsList = siteMainFilms.querySelector(`.films-list`);
render(filmsList, createFilmsListContainer());
const filmsListContainer = siteMainFilms.querySelector(`.films-list__container`);

films
.slice(0, FILM_COUNT_PER_STEP)
.forEach((film) => render(filmsListContainer, createFilmCard(film)));

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  render(filmsList, createShowMoreButton());
  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => render(filmsListContainer, createFilmCard(film)));
    renderedFilmCount += FILM_COUNT_PER_STEP;
    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

render(siteMainFilms, createFilmsListExtra(EXTRAS_NAMES[0]));
render(siteMainFilms, createFilmsListExtra(EXTRAS_NAMES[1]));
const filmsListsExtra = siteMainFilms.querySelectorAll(`.films-list--extra`);

for (const filmsListExtra of filmsListsExtra) {
  render(filmsListExtra, createFilmsListContainer());
  const extraContainer = filmsListExtra.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRAS_NUMBER; i++) {
    const randomIndex = getRandomIndex(films);
    render(extraContainer, createFilmCard(films[randomIndex]));
  }
}

render(siteMainElement, createFilmDetailsPopup(films[0]));

