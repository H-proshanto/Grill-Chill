import View from './View';
import { REFRESH } from '../config';
import icons from 'url:../../img/icons.svg';

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

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  showButton() {
    this._btnOpen.classList.remove('hidden');
  }

  hideButton() {
    this._btnOpen.classList.add('hidden');
  }

  _generateMarkup() {
    return ` 
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input required name="title" type="text" placeholder="Title" />
      <label>URL</label>
      <input
        required
        name="sourceUrl"
        type="url"
        placeholder="Source URL"
      />
      <label>Image URL</label>
      <input required name="image" type="url" placeholder="Image URL" />
      <label>Publisher</label>
      <input
        required
        name="publisher"
        type="text"
        placeholder="Publisher Name"
      />
      <label>Prep time</label>
      <input
        required
        name="cookingTime"
        type="number"
        placeholder="Cooking Time"
      />
      <label>Servings</label>
      <input
      required
      name="servings"
      type="number"
      placeholder="Number Of Servings"
      />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        type="text"
        required
        name="ingredient-1"
        placeholder="Quantity,Unit,Description"
      />
      <label>Ingredient 2</label>
      <input
        type="text"
        name="ingredient-2"
        placeholder="Quantity,Unit,Description"
      />
      <label>Ingredient 3</label>
      <input
        type="text"
        name="ingredient-3"
        placeholder="Quantity,Unit,Description"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient-4"
        placeholder="Quantity,Unit,Description"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient-5"
        placeholder="Quantity,Unit,Description"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient-6"
        placeholder="Quantity,Unit,Description"
      />
    </div>

    <button class="btn upload__btn">
      <svg>
        <use href="${icons}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>`;
  }
}

export default new AddRecipeView();
