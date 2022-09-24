import View from './View';

class DeleteItemConfirmationView extends View {
  _message = 'Logged In Successfully';

  setDeleteConfirmView() {
    this._parentEl = document.querySelector('.confirm-delete__form');
    this._overlay = document.querySelector('.confirm-delete-overlay');
    this._btnConfirm = document.querySelector('.btn--confirm-delete');
    this._btnCancel = document.querySelector('.btn--confirm-delete-cancel');
    this._window = document.querySelector('.confirm-delete-window');
    this._addHandlerHideWindow();
  }

  init() {
    this._btnOpen = document.querySelectorAll('.delete-item');

    for (let i = 0; i < this._btnOpen.length; i++) {
      this._btnOpen[i].addEventListener('click', this.toogleWindow.bind(this));
    }
  }

  toogleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerHideWindow() {
    const overlay = this._overlay;
    const bindedToggleWindow = this.toogleWindow.bind(this);

    this._btnCancel.addEventListener('click', function (e) {
      e.preventDefault();
      bindedToggleWindow();
    });

    this._overlay.addEventListener('click', e => {
      if (!overlay.classList.contains('hidden')) bindedToggleWindow();
    });
  }

  addHandlerConfirm(handler) {
    this._btnConfirm.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new DeleteItemConfirmationView();
