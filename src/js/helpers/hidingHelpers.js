import { MSG_LOAD_TIME } from '../config';
import loginView from '../views/loginView';

export const hideModal = function () {
  setTimeout(loginView.renderMessage.bind(loginView), MSG_LOAD_TIME * 1000);
  setTimeout(() => {
    loginView.renderMessage();
    setTimeout(loginView.toogleWindow.bind(loginView), MSG_LOAD_TIME * 220);
  }, MSG_LOAD_TIME * 1000);
};

export const hideBookmark = function () {
  parentEl = document.querySelector('.btn--bookmark');
  if (!parentEl.classList.contains('hidden')) parentEl.classList.add('hidden');
};
