import {CARDS_NUMBER} from "../utils/const.js";
import Abstract from "./abstract.js";

const createFooterStats = () => {
  return (
    `<section class="footer__statistics">
      <p>${CARDS_NUMBER} movies inside</p>
    </section>`
  );
};

export default class FooterStats extends Abstract {
  getTemplate() {
    return createFooterStats();
  }
}

