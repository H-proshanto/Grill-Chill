import loginView from './views/loginView';
import icons from '../img/icons.svg';

import { state } from './model';
import { MSG_LOAD_TIME } from './config';

export const addloginBtn = function () {
  const parentEl = document.querySelector('.nav__list');

  const html = `
  <li class="nav__item">
    <button class="nav__btn nav__btn--login">
      <svg class="nav__icon">
        <use href="${icons}#icon-user"></use>
      </svg>
      <span>Sign In</span>
    </button>
  </li>`;

  parentEl.insertAdjacentHTML('beforeend', html);
};

export const addRegistrationpBtn = function () {
  const parentEl = document.querySelector('.nav__list');

  const html = `
  <li class="nav__item">
    <button class="nav__btn nav__btn--registration">
      <svg class="nav__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Sign Up</span>
    </button>
  </li>`;

  parentEl.insertAdjacentHTML('beforeend', html);
};

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
  const parentEl = document.querySelector('.nav__list');
  const html = `
  <li class="nav__item">
    <span class = "userName">Hello, ${state.username}</span>
  </li>`;
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

export const clearNav = function () {
  parentEl = document.querySelector('.nav__list');
  parentEl.innerHTML = '';
};

export const hideButtonsAndModal = function () {
  clearNav();

  setTimeout(loginView.renderMessage.bind(loginView), MSG_LOAD_TIME * 1000);
  setTimeout(() => {
    loginView.renderMessage();
    setTimeout(loginView.toogleWindow.bind(loginView), MSG_LOAD_TIME * 220);
  }, MSG_LOAD_TIME * 1000);
};

export const addlogoutEvListner = function (handler) {
  const parentEl = document.querySelector('.nav__btn--logout');
  parentEl.addEventListener('click', function (e) {
    handler();
  });
};

export const clearHash = function () {
  window.location.hash = '';
};

export const hideMessage = function () {
  parentEl = document.querySelector('.search-message');
  if (!parentEl.classList.contains('hidden')) parentEl.classList.add('hidden');
};

export const showMessage = function () {
  parentEl = document.querySelector('.search-message');
  if (parentEl.classList.contains('hidden'))
    parentEl.classList.remove('hidden');
};
