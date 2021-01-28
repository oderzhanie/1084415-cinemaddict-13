import {CARDS_NUMBER /* EXTRAS_NUMBER, EXTRAS_NAMES*/} from "./utils/const.js";
import UserStatus from "../src/view/user-status.js";
import MainSiteMenu from "../src/view/main-site-menu.js";
import MovieList from "./presenter/movie-list.js";
import FooterStats from "../src/view/footer.js";
import {generateFilm} from "./mocks/film-card.js";
import {generateFilter} from "./mocks/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsModel from "./model/films.js";

const films = new Array(CARDS_NUMBER).fill(``).map(generateFilm);
const filters = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

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

const movieList = new MovieList(siteMainElement, filmsModel);

movieList.init();
