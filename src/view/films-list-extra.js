const createFilmsListExtra = (name) => {
  return (
    `<section class="films-list--extra" name="${name}">
      <h2 class="films-list__title">${name}</h2>
    </section>`
  );
};

export {createFilmsListExtra};
