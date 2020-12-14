import {CARDS_NUMBER, EXTRAS_NUMBER, EXTRAS_NAMES, FILM_COUNT_PER_STEP} from "./utils/const.js";
import {getRandomIndex, render, RenderPosition} from "./utils/utils.js";
import UserStatus from "../src/view/user-status.js";
import SiteMenu from "../src/view/main-site-menu.js";
import MainSortingFilters from "../src/view/main-sorting-filter.js";
import MainFilmsSection from "../src/view/main-films-section.js";
import FilmsList from "../src/view/films-list.js";
import FilmsListContainer from "../src/view/films-list-container.js";
import FilmCard from "../src/view/film-card.js";
import ShowMoreButton from "../src/view/show-more-button.js";
import FilmsListExtra from "../src/view/films-list-extra.js";
import FooterStats from "../src/view/footer.js";
import FilmDetailsPopup from "../src/view/film-details-popup.js";
import {generateFilm} from "./mocks/film-card.js";
import {generateFilter} from "./mocks/filter.js";

const films = new Array(CARDS_NUMBER).fill(``).map(generateFilm);
const filters = generateFilter(films);

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new UserStatus().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainSortingFilters(filters).getElement(), RenderPosition.BEFOREEND);
render(siteFooter, new FooterStats().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainFilmsSection().getElement(), RenderPosition.BEFOREEND);

const siteMainFilms = siteMainElement.querySelector(`.films`);
render(siteMainFilms, new FilmsList().getElement(), RenderPosition.BEFOREEND);

const filmsList = siteMainFilms.querySelector(`.films-list`);
render(filmsList, new FilmsListContainer().getElement(), RenderPosition.BEFOREEND);
const filmsListContainer = siteMainFilms.querySelector(`.films-list__container`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film);
  const filmDetailsComponent = new FilmDetailsPopup(film);

  const openPopupElements = filmComponent.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
  for (let elem of openPopupElements) {
    elem.addEventListener(`click`, () => {
      render(siteMainElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

      const body = document.querySelector(`body`);
      body.classList.add(`hide-overflow`);
    });
  }

  const closePopup = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closePopup.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmDetailsComponent.getElement().remove();

    const body = document.querySelector(`body`);
    body.classList.remove(`hide-overflow`);
  });

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

films
.slice(0, FILM_COUNT_PER_STEP)
.forEach((film) => renderFilm(filmsListContainer, film));

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton();
  render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => renderFilm(filmsListContainer, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(siteMainFilms, new FilmsListExtra(EXTRAS_NAMES[0]).getElement(), RenderPosition.BEFOREEND);
render(siteMainFilms, new FilmsListExtra(EXTRAS_NAMES[1]).getElement(), RenderPosition.BEFOREEND);
const filmsListsExtra = siteMainFilms.querySelectorAll(`.films-list--extra`);

for (const filmsListExtra of filmsListsExtra) {
  render(filmsListExtra, new FilmsListContainer().getElement(), RenderPosition.BEFOREEND);
  const extraContainer = filmsListExtra.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRAS_NUMBER; i++) {
    const randomIndex = getRandomIndex(films);
    renderFilm(extraContainer, films[randomIndex]);
  }
}

