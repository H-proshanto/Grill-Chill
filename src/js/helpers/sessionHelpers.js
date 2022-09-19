export const clearNav = function () {
  parentEl = document.querySelector('.nav__list');
  parentEl.innerHTML = '';
};

export const clearHash = function () {
  window.location.hash = '';
};
