import * as model from './model.js';
import * as helpers from './helpers.js';
import addRecipeView from './views/addRecipeView.js';
import addUserView from './views/addUserView.js';
import loginView from './views/loginView.js';
import bookmarksView from './views/bookmarksView.js';

import { msgLoadTime } from './config.js';

const controlAddRecipe = async function (newRecipe) {
  try {
    console.log('addRecipe');
  } catch (err) {
    console.error(err);
  }
};

const controlAddUser = async function (newUser) {
  try {
    console.log('addsUser');
  } catch (err) {
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
      addRecipeView.addHandlerUpload(controlAddRecipe);
      addRecipeView.init();
    } else if (model.state.isUser) {
      helpers.hideButtonsAndModal();
      helpers.addSessionUserName();
      helpers.addBookmarksBtn();
      helpers.addLogoutBtn();
      bookmarksView.addHandlerRender(controlBookmarks);
    } else {
      setTimeout(() => {
        loginView.renderError();
      }, msgLoadTime * 600);
    }
  } catch (err) {
    console.error(err);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  addUserView.addHandlerUploadUser(controlAddUser);
  loginView.addHandlerLoginUser(controlUserLogin);
};

init();
