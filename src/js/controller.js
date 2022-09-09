import * as model from './model.js';
import * as helpers from './helpers.js';
import addRecipeView from './views/addRecipeView.js';
import addUserView from './views/addUserView.js';
import loginView from './views/loginView.js';
import bookmarksView from './views/bookmarksView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import { MSG_LOAD_TIME, REFRESH } from './config.js';

const controlSearchResults = async function () {
  try {
    helpers.hideMessage();
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (query === '') {
      setTimeout(function () {
        resultsView.renderMessage('⚠️ Invalid Token , Please Try Again !');
      }, 1);
    }
    if (!query) return;

    await model.loadSearchResults(query);

    setTimeout(function () {
      resultsView.render(model.getSearchResultsPage());
      paginationView.render(model.state.search);
    }, REFRESH);
  } catch (err) {
    console.log(err);
  }
};

const controlAddRecipe = async function (newRecipe) {
  try {
    console.log('addRecipe');
  } catch (err) {
    console.error(err);
  }
};

const controlAddUser = async function (newUser) {
  try {
    model.uploadedUser(newUser);
    addUserView.renderSpinner();
    setTimeout(
      addUserView.renderMessage.bind(addUserView),
      MSG_LOAD_TIME * 1000
    );
  } catch (err) {
    addUserView.renderError();
    console.error(err);
  }
};

const controlUserLogin = async function (userData) {
  try {
    model.isAuthenticated(userData);
    loginView.renderSpinner();

    if (model.state.isAdmin) {
      helpers.hideButtonsAndModal();
      helpers.addSessionUserName();
      helpers.addCustomRecipeBtn();
      helpers.addLogoutBtn();
      helpers.addlogoutEvListner(controlLogoutBtn);
      addRecipeView.addHandlerUpload(controlAddRecipe);
      addRecipeView.init();
      model.setLoginHash(userData);
      helpers.showMessage();
      resultsView.refresh();
      paginationView.refresh();
    } else if (model.state.isUser) {
      helpers.hideButtonsAndModal();
      helpers.addSessionUserName();
      helpers.addBookmarksBtn();
      helpers.addLogoutBtn();
      helpers.addlogoutEvListner(controlLogoutBtn);
      bookmarksView.addHandlerRender(controlBookmarks);
      model.setLoginHash(userData);
      helpers.showMessage();
      resultsView.refresh();
      paginationView.refresh();
    } else {
      setTimeout(() => {
        loginView.renderError();
      }, MSG_LOAD_TIME * 600);
    }
  } catch (err) {
    console.error(err);
  }
};

const controlPersistLogin = function () {
  model.persistLogin();

  if (model.state.isAdmin) {
    helpers.clearNav();
    helpers.addSessionUserName();
    helpers.addCustomRecipeBtn();
    helpers.addLogoutBtn();
    helpers.addlogoutEvListner(controlLogoutBtn);
    addRecipeView.addHandlerUpload(controlAddRecipe);
    addRecipeView.init();
  } else if (model.state.isUser) {
    helpers.clearNav();
    helpers.addSessionUserName();
    helpers.addBookmarksBtn();
    helpers.addLogoutBtn();
    helpers.addlogoutEvListner(controlLogoutBtn);
    bookmarksView.addHandlerRender(controlBookmarks);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlLogoutBtn = function () {
  try {
    helpers.clearHash();
    helpers.clearNav();
    helpers.addloginBtn();
    helpers.addRegistrationpBtn();
    loginView.refreshBtn();
    addUserView.refreshBtn();
    model.refreshSession();
    helpers.showMessage();
    resultsView.refresh();
    paginationView.refresh();
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  addUserView.addHandlerUploadUser(controlAddUser);
  loginView.addHandlerLoginUser(controlUserLogin);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  model.setLocalStorage();
  controlPersistLogin();
};

init();
