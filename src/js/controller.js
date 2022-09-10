import * as model from './model.js';
import * as helpers from './helpers.js';
import addRecipeView from './views/addRecipeView.js';
import addUserView from './views/addUserView.js';
import loginView from './views/loginView.js';
import bookmarksView from './views/bookmarksView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import recipeView from '../js/views/recipeView.js';
import confirmationView from '../js/views/confirmationView.js';
import deleteItemConfimationView from './views/deleteItemConfimationView.js';

import { MSG_LOAD_TIME, REFRESH } from './config.js';

const controlSearchResults = async function () {
  try {
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
      if (model.state.isAdmin) {
        deleteItemConfimationView.init();
      }
    }, REFRESH);
  } catch (err) {
    console.log(err);
  }
};

const controlRecipes = async function () {
  try {
    model.persistLogin();
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    // bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    const { recipe } = model.state;

    recipeView.render(model.state.recipe);
    if (model.state.isAdmin) {
      confirmationView.init();
      confirmationView.addHandlerConfirm(controlChangeCookingTime);
    }
  } catch (error) {
    recipeView.renderError();
    console.error(err);
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
      recipeView.refresh();
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
      recipeView.refresh();
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
  deleteItemConfimationView.init();
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
    resultsView.refresh();
    paginationView.refresh();
    recipeView.refresh();
  } catch (err) {
    console.error(err);
  }
};

const controlChangeCookingTime = function (data) {
  confirmationView.toogleWindow();
  model.setCookingTime(data);
  recipeView.update(model.state.recipe);
};

const init = function () {
  addUserView.addHandlerUploadUser(controlAddUser);
  loginView.addHandlerLoginUser(controlUserLogin);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerRender(controlRecipes);

  model.setLocalStorage();
  controlPersistLogin();
};

init();
