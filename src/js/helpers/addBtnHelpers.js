import icons from '../../img/icons.svg';
import { state } from '../model';

export const addCustomRecipeBtn = function () {
  const parentEl = document.querySelector('.nav__list');

  const html = `
  <li class="nav__item">
    <button class="nav__btn nav__btn--add-recipe">
      <svg class="nav__icon">
        <use href="${icons}#icon-edit"></use>
      </svg>
    <span>Add recipe</span>
    </button>
  </li>`;

  parentEl.insertAdjacentHTML('beforeend', html);
};

export const addShowAllRecipesBtn = function () {
  const parentEl = document.querySelector('.nav__list');

  const html = `
  <li class="nav__item">
    <button class="nav__btn nav__btn--all-recipes">
      <svg
        class="nav__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        >
        <path
          d="M64 144c26.5 0 48-21.5 48-48s-21.5-48-48-48S16 69.5 16 96s21.5 48 48 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm48-208c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
        />
      </svg>
      <span>All Recipes</span>
    </button>
  </li>`;

  parentEl.insertAdjacentHTML('beforeend', html);
};

export const addBookmarksBtn = function () {
  const parentEl = document.querySelector('.nav__list');

  const html = `
  <li class="nav__item">
    <button class="nav__btn nav__btn--bookmarks">
      <svg class="nav__icon">
        <use href="${icons}#icon-bookmark"></use>
      </svg>
      <span>Bookmarks</span>
    </button>
    <div class="bookmarks">
      <ul class="bookmarks__list">
        <div class="message">
          <div>
            <svg>
              <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>
            No bookmarks yet. Find a nice recipe and bookmark it :)
          </p>
        </div>
      </ul>
    </div>
  </li>`;

  parentEl.insertAdjacentHTML('beforeend', html);
};

export const addSessionUserName = function () {
  const parentEl = document.querySelector('.nav-container');
  const html = `
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <span class = "userName">Hello, ${state.username}</span>
      </li>
    </ul>
  </nav>`;
  parentEl.insertAdjacentHTML('afterbegin', html);
};

export const addLogoutBtn = function () {
  const parentEl = document.querySelector('.nav__list');
  const html = `
    <li class="nav__item">
    <button class="nav__btn nav__btn--logout">
    <svg class="nav__icon" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - 
    https://fontawesome.com License - https://fontawesome.com/license 
    (Commercial License) Copyright 2022 Fonticons, Inc. -->
    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 
    32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 
    181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6
    -11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 
    176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
      <span>Logout</span>
    </button>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};
