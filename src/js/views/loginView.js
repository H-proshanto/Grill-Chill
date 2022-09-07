import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { refresh } from '../config.js';

class LoginView extends View {
  _parentEl = document.querySelector('.login__form');
  _message = 'Logged In Successfully';
  _errorMessage = 'Login failed. Please try again!';

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
    const hasErrorMessage =
      this._parentEl.lastChild.classList?.contains('error');
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');

    const elements = Array.from(this._parentEl.elements);
    elements.forEach(el => (el.value = ''));

    if (hasErrorMessage) {
      setTimeout(() => {
        this._clear();
        this._parentEl.innerHTML = this._generateMarkup();
      }, refresh);
    }
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
  }

  addHandlerLoginUser(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {
    return ` <label>Username</label>
    <input type="text" required placeholder="User Name" name="username"/>
    <label>Password</label>
    <input type="password" required placeholder="Password" name="password" />
    <button class="btn">Log In</button>`;
  }
}

export default new LoginView();
