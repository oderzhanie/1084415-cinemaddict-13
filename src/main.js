import {CARDS_NUMBER, EXTRAS_NUMBER, EXTRAS_NAMES} from "./utils/const.js";
// import {getRandomIndex} from "./utils/utils.js";
import UserStatus from "../src/view/user-status.js";
import MainSiteMenu from "../src/view/main-site-menu.js";

import MovieList from "./presenter/movie-list.js";

// import MainSortingFilters from "../src/view/main-sorting-filter.js";
// import MainFilmsSection from "../src/view/main-films-section.js";
// import FilmsList from "../src/view/films-list.js";
// import FilmsListContainer from "../src/view/films-list-container.js";
// import FilmCard from "../src/view/film-card.js";
// import ShowMoreButton from "../src/view/show-more-button.js";
// import FilmsListExtra from "../src/view/films-list-extra.js";
import FooterStats from "../src/view/footer.js";
// import FilmDetailsPopup from "../src/view/film-details-popup.js";
// import NoFilms from "../src/view/no-films.js";
import {generateFilm} from "./mocks/film-card.js";
import {generateFilter} from "./mocks/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const films = new Array(CARDS_NUMBER).fill(``).map(generateFilm);
const filters = generateFilter(films);

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

// render(siteHeader, new UserStatus(), RenderPosition.BEFOREEND);
// render(siteMainElement, new MainSiteMenu(filters), RenderPosition.BEFOREEND);
// render(siteMainElement, new MainSortingFilters(filters), RenderPosition.BEFOREEND);
// render(siteFooter, new FooterStats(), RenderPosition.BEFOREEND);
// render(siteMainElement, new MainFilmsSection(), RenderPosition.BEFOREEND);

// const siteMainFilms = siteMainElement.querySelector(`.films`);
// render(siteMainFilms, new FilmsList(), RenderPosition.BEFOREEND);

// const filmsList = siteMainFilms.querySelector(`.films-list`);
// render(filmsList, new FilmsListContainer(), RenderPosition.BEFOREEND);
// const filmsListContainer = siteMainFilms.querySelector(`.films-list__container`);

// const renderFilm = (filmListElement, film) => {
//   const filmComponent = new FilmCard(film);
//   const filmDetailsComponent = new FilmDetailsPopup(film);

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       remove(filmDetailsComponent);
//       document.removeEventListener(`keydown`, onEscKeyDown);

//       const body = document.querySelector(`body`);
//       body.classList.remove(`hide-overflow`);
//     }
//   };

//   filmComponent.setOpenClickHandler(() => {
//     render(siteMainElement, filmDetailsComponent, RenderPosition.BEFOREEND);
//     document.addEventListener(`keydown`, onEscKeyDown);

//     const body = document.querySelector(`body`);
//     body.classList.add(`hide-overflow`);

//     filmDetailsComponent.setClosePopupHandler(() => {
//       remove(filmDetailsComponent);
//       document.removeEventListener(`keydown`, onEscKeyDown);

//       body.classList.remove(`hide-overflow`);
//     });
//   });

//   render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
// };

// films
// .slice(0, FILM_COUNT_PER_STEP)
// .forEach((film) => renderFilm(filmsListContainer, film));

// if (films.length === 0) {
//   render(filmsList, new NoFilms(), RenderPosition.BEFOREEND);
// }

// if (films.length > FILM_COUNT_PER_STEP) {
//   let renderedFilmCount = FILM_COUNT_PER_STEP;

//   const showMoreButtonComponent = new ShowMoreButton();
//   render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

//   showMoreButtonComponent.setClickHandler(() => {
//     films
//     .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
//     .forEach((film) => renderFilm(filmsListContainer, film));

//     renderedFilmCount += FILM_COUNT_PER_STEP;

//     if (renderedFilmCount >= films.length) {
//       remove(showMoreButtonComponent);
//     }
//   });
// }

// if (films.length > 0) {
//   render(siteMainFilms, new FilmsListExtra(EXTRAS_NAMES[0]), RenderPosition.BEFOREEND);
//   render(siteMainFilms, new FilmsListExtra(EXTRAS_NAMES[1]), RenderPosition.BEFOREEND);
//   const filmsListsExtra = siteMainFilms.querySelectorAll(`.films-list--extra`);

//   for (const filmsListExtra of filmsListsExtra) {
//     render(filmsListExtra, new FilmsListContainer(), RenderPosition.BEFOREEND);
//     const extraContainer = filmsListExtra.querySelector(`.films-list__container`);
//     for (let i = 0; i < EXTRAS_NUMBER; i++) {
//       const randomIndex = getRandomIndex(films);
//       renderFilm(extraContainer, films[randomIndex]);
//     }
//   }
// }


render(siteHeader, new UserStatus(), RenderPosition.BEFOREEND);
render(siteFooter, new FooterStats(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainSiteMenu(filters), RenderPosition.AFTERBEGIN);

const movieList = new MovieList(siteMainElement);

movieList.init(films);
