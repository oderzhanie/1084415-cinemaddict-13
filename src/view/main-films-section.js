import Abstract from "./abstract.js";

const createMainFilmsSection = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class MainFilmsSection extends Abstract {
  getTemplate() {
    return createMainFilmsSection();
  }
}
