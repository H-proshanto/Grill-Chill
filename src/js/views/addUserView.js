import View from './View';
import { REFRESH } from '../config';

class AddUserView extends View {
  _parentEl = document.querySelector('.registration__form');
  _message = 'Profile was successfully uploaded';
  _errorMessage = 'Something occured. Please try again!';

  _window = document.querySelector('.registration-window');
  _overlay = document.querySelector('.registration-overlay');
  _btnOpen = document.querySelector('.nav__btn--registration');
  _btnClose = document.querySelector('.registration-btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  refreshBtn() {
    this._btnOpen = document.querySelector('.nav__btn--registration');
    this._addHandlerShowWindow();
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

    this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
    this._overlay.addEventListener('click', e => {
      if (!overlay.classList.contains('hidden')) bindedToggleWindow();
    });
  }

  addHandlerUploadUser(handler) {
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
    <input type="text" required placeholder="User Name" name="username" />
    <label>Password</label>
    <input type="password" required placeholder="Password" name="password" />
    <label>Email Address</label>
    <input type="email" required placeholder="Email Address" name="email"/>
    <button class="btn">Register &rarr;</button>`;
  }
}

export default new AddUserView();
