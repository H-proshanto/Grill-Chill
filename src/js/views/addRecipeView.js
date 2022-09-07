import View from './view.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.add-recipe-overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.add-recipe-btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toogleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');

    const elements = Array.from(this._parentEl.elements);
    elements.forEach(el => el.value = '');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
    this._overlay.addEventListener('click', this.toogleWindow.bind(this));
  }

  addHandlerUpload(handler) {}
}

export default new AddRecipeView();
