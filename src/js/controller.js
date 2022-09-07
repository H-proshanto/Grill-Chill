import * as model from './model.js';
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

    if(model.state.isAdmin) { 
      addRecipeView.showButton();
      loginView.hideButton();
      addUserView.hideButton();
      setTimeout(() => {
        loginView.renderMessage();
        setTimeout(loginView.toogleWindow.bind(loginView),msgLoadTime * 800)
      },msgLoadTime * 1000);
      
    }
    else if(model.state.isUser) {
      bookmarksView.showButton();
      loginView.hideButton();
      addUserView.hideButton();
      setTimeout(loginView.renderMessage.bind(loginView),msgLoadTime * 1000); 
      setTimeout(() => {
        loginView.renderMessage();
        setTimeout(loginView.toogleWindow.bind(loginView),msgLoadTime * 800)
      },msgLoadTime * 1000);
    }
    else {
      // loginView.renderError();
      setTimeout(()=> {
        loginView.renderError();
      },msgLoadTime*600)
    }
  } catch (err) {
    console.error(err);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  addUserView.addHandlerUploadUser(controlAddUser);
  loginView.addHandlerLoginUser(controlUserLogin);
};

init();
