import View from './view.js';
import icons from 'url:../../img/icons.svg';

class LoginView extends View {
  _parentEl = document.querySelector('.login__form');
  _message = 'Logged In Successfully';

  _window = document.querySelector('.login-window');
  _overlay = document.querySelector('.login-overlay');
  _btnOpen = document.querySelector('.nav__btn--login');
  _btnClose = document.querySelector('.login-btn--close-modal');

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

  addHandlerLoginUser(handler) {
    // this._parentEl.addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   const dataArr = [...new FormData(this)];
    //   const data = Object.fromEntries(dataArr);
    //   handler(data);
    // });
  }
}

export default new LoginView();
