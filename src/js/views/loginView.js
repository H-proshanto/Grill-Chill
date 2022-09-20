import View from './View';
import { REFRESH } from '../config';

class LoginView extends View {
  _message = 'Logged In Successfully';
  _errorMessage = 'Login failed. Please try again!';

  setLoginView() {
    this._parentEl = document.querySelector('.login__form');
    this._window = document.querySelector('.login-window');
    this._overlay = document.querySelector('.login-overlay');
    this._btnOpen = document.querySelector('.nav__btn--login');
    this._btnClose = document.querySelector('.login-btn--close-modal');
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toogleWindow() {
    const hasMessage = this._parentEl.lastChild.classList?.contains('message');
    const hasErrorMessage =
      this._parentEl.lastChild.classList?.contains('error');
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');

    const elements = Array.from(this._parentEl.elements);
    elements.forEach(el => (el.value = ''));

    if (hasErrorMessage || hasMessage) {
      setTimeout(() => {
        this._clear();
        this._parentEl.innerHTML = this._generateMarkup();
      }, REFRESH);
    }
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    const overlay = this._overlay;
    const bindedToggleWindow = this.toogleWindow.bind(this);

    this._btnClose.addEventListener('click', e => {
      if (!overlay.classList.contains('hidden')) bindedToggleWindow();
    });
    this._overlay.addEventListener('click', e => {
      if (!overlay.classList.contains('hidden')) bindedToggleWindow();
    });
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
    return ` 
    <label>Username</label>
    <input type="text" required placeholder="User Name" name="username"/>
    <label>Password</label>
    <input type="password" required placeholder="Password" name="password" />
    <button class="btn">Log In</button>`;
  }
}

export default new LoginView();
