import {CARDS_NUMBER} from "../utils/const.js";

const createFooterStats = () => {
  return (
    `<section class="footer__statistics">
      <p>${CARDS_NUMBER} movies inside</p>
    </section>`
  );
};

export {createFooterStats};
