import addRecipeView from './views/addRecipeView.js';
import addUserView from './views/addUserView.js';
import loginView from './views/loginView.js';

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

const controlUserLogin = async function (newUser) {
  try {
    console.log('addsUser');
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  addRecipeView.addHandlerUpload(controlAddRecipe);
  addUserView.addHandlerUploadUser(controlAddUser);
  loginView.addHandlerLoginUser(controlUserLogin);
};

init();
