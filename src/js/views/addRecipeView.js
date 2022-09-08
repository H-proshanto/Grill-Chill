import View from './view.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.add-recipe-overlay');
  _btnOpen = null;
  _btnClose = document.querySelector('.add-recipe-btn--close-modal');

  constructor() {
    super();
  }

  init() {
    this._btnOpen = document.querySelector('.nav__btn--add-recipe');
    this._addHandlerShowWindow();
    if (this._hide === undefined) this._addHandlerHideWindow();
    this._hide = true;
  }

  toogleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');

    const elements = Array.from(this._parentEl.elements);
    elements.forEach(el => (el.value = ''));
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
  }

  addHandlerUpload(handler) {}

  showButton() {
    this._btnOpen.classList.remove('hidden');
  }

  hideButton() {
    this._btnOpen.classList.add('hidden');
  }
}

export default new AddRecipeView();
