export const hideBookmark = function () {
  parentEl = document.querySelector('.btn--bookmark');
  if (!parentEl.classList.contains('hidden')) parentEl.classList.add('hidden');
};
