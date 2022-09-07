import View from './view.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _btnOpen = document.querySelector('.nav__btn--bookmarks');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  showButton() {
    this._btnOpen.classList.remove('hidden');
  }

  hideButton() {
    this._btnOpen.classList.add('hidden');
  }
}

export default new BookmarksView();