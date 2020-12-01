import {CARDS_NUMBER, EXTRAS_NUMBER} from "../src/utils/const.js";
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

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, createUserStatus());
render(siteMainElement, createMainSiteMenu());
render(siteMainElement, createMainSortingFilter());

const siteFooter = document.querySelector(`.footer`);
render(siteFooter, createFooterStats());

render(siteMainElement, createMainFilmsSection());
const siteMainFilms = siteMainElement.querySelector(`.films`);
render(siteMainFilms, createFilmsList());
const filmsList = siteMainFilms.querySelector(`.films-list`);
render(filmsList, createFilmsListContainer());
const filmsListContainer = siteMainFilms.querySelector(`.films-list__container`);

Array(CARDS_NUMBER).fill(``).forEach(function () {
  render(filmsListContainer, createFilmCard());
});

render(filmsList, createShowMoreButton());

Array(EXTRAS_NUMBER).fill(``).forEach(function () {
  render(siteMainFilms, createFilmsListExtra());
});

const filmsListsExtra = siteMainFilms.querySelectorAll(`.films-list--extra`);
for (const filmsListExtra of filmsListsExtra) {
  render(filmsListExtra, createFilmsListContainer());
  const extraContainer = filmsListExtra.querySelector(`.films-list__container`);

  Array(EXTRAS_NUMBER).fill(``).forEach(function () {
    render(extraContainer, createFilmCard());
  });
}

render(siteMainElement, createFilmDetailsPopup());


