export const addlogoutEvListner = function (handler) {
  const parentEl = document.querySelector('.nav__btn--logout');
  parentEl.addEventListener('click', function (e) {
    handler();
  });
};

export const addAllRecipesEvListner = function (handler) {
  const parentEl = document.querySelector('.nav__btn--all-recipes');
  parentEl.addEventListener('click', function (e) {
    handler();
  });
};
