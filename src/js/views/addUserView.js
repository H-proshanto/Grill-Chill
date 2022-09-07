import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddUserView extends View {
  _parentEl = document.querySelector('.registration__form');
  _message = 'User profile was successfully uploaded';

  _window = document.querySelector('.registration-window');
  _overlay = document.querySelector('.registration-overlay');
  _btnOpen = document.querySelector('.nav__btn--registration');
  _btnClose = document.querySelector('.registration-btn--close-modal');

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

  addHandlerUploadUser(handler) {
    // this._parentEl.addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   const dataArr = [...new FormData(this)];
    //   const data = Object.fromEntries(dataArr);
    //   handler(data);
    // });
  }
}

export default new AddUserView();
