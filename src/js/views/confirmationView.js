import View from './View';

class ConfirmationView extends View {
  _message = 'Logged In Successfully';

  setConfirmView() {
    this._parentEl = document.querySelector('.confirmation__form');
    this._window = document.querySelector('.confirmation-window');
    this._overlay = document.querySelector('.confirmation-overlay');
    this._btnConfirm = document.querySelector('.btn--confirm');
    this._btnCancel = document.querySelector('.btn--cancel');
    this._addHandlerHideWindow();
  }

  init() {
    this._btnOpen = document.querySelector('.btn--change-time');
    this._addHandlerShowWindow();
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
    const overlay = this._overlay;
    const bindedToggleWindow = this.toogleWindow.bind(this);

    this._btnCancel.addEventListener('click', e => {
      e.preventDefault();
      bindedToggleWindow();
    });

    this._overlay.addEventListener('click', e => {
      if (!overlay.classList.contains('hidden')) bindedToggleWindow();
    });
  }

  addHandlerConfirm(handler) {
    if (this.calledAddHandlerConfirm === undefined) {
      this._btnConfirm.addEventListener('click', function (e) {
        e.preventDefault();
        const data = document.querySelector('.confirmation__input').value;
        if (data === '') {
          window.alert('Input field is empty');
          return;
        }
        handler(data);
      });
      this.calledAddHandlerConfirm = true;
    }
  }
}

export default new ConfirmationView();
