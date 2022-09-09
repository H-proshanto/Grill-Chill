import * as model from './model.js';
import * as helpers from './helpers.js';
import addRecipeView from './views/addRecipeView.js';
import addUserView from './views/addUserView.js';
import loginView from './views/loginView.js';
import bookmarksView from './views/bookmarksView.js';

import { MSG_LOAD_TIME } from './config.js';

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
    } else if (model.state.isUser) {
      helpers.hideButtonsAndModal();
      helpers.addSessionUserName();
      helpers.addBookmarksBtn();
      helpers.addLogoutBtn();
      helpers.addlogoutEvListner(controlLogoutBtn);
      bookmarksView.addHandlerRender(controlBookmarks);
      model.setLoginHash(userData);
    } else {
      setTimeout(() => {
        loginView.renderError();
      }, MSG_LOAD_TIME * 600);
    }
  } catch (err) {
    console.error(err);
  }
};

const controlPersisLogin = function () {
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

const controlLogoutBtn = function () {
  try {
    helpers.clearHash();
    helpers.clearNav();
    helpers.addloginBtn();
    helpers.addRegistrationpBtn();
    loginView.refreshBtn();
    addUserView.refreshBtn();
    model.refreshSession();
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  addUserView.addHandlerUploadUser(controlAddUser);
  loginView.addHandlerLoginUser(controlUserLogin);

  model.setLocalStorage();
  controlPersisLogin();
};

init();
