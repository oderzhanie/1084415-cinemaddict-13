export const sortFilmDate = (filmA, filmB) => {
  return (filmB.releaseFullDate - filmA.releaseFullDate);
};


export const sortFilmRating = (filmA, filmB) => {
  return (Number(filmB.rating) - Number(filmA.rating));
};
