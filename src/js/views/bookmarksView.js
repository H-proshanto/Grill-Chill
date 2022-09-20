import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  setBookmarksView() {
    this._parentEl = document.querySelector('.bookmarks__list');
    this._btnOpen = document.querySelector('.nav__btn--bookmarks');
  }

  addHandlerRender(handler) {
    this._parentEl = document.querySelector('.bookmarks__list');
    window.addEventListener('load', handler);
  }

  showButton() {
    this._btnOpen.classList.remove('hidden');
  }

  hideButton() {
    this._btnOpen.classList.add('hidden');
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
