import * as model from './model';
import * as helpers from './helpers';
import addRecipeView from './views/addRecipeView';
import addUserView from './views/addUserView';
import loginView from './views/loginView';
import bookmarksView from './views/bookmarksView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import recipeView from '../js/views/recipeView';
import confirmationView from '../js/views/confirmationView';
import deleteItemConfimationView from './views/deleteItemConfimationView';

import { MSG_LOAD_TIME, REFRESH } from './config';

const searchResults = async function () {
  try {
    const query = searchView.getQuery();
    paginationView.refresh();
    resultsView.renderSpinner();

    if (query === '') {
      paginationView.refresh();
      model.state.search.results = [];
      model.state.search.page = 1;
      throw Error('Invalid Token , Please Try Again !');
    }

    await model.loadSearchResults(query);

    setTimeout(function () {
      resultsView.render(model.getSearchResultsPage());
      paginationView.render(model.state.search);
      if (model.state.isAdmin) {
        deleteItemConfimationView.init();
      }
    }, REFRESH);
  } catch (err) {
    resultsView.renderError(err.message);
    console.log(err);
  }
};

const recipes = async function () {
  try {
    model.persistLogin();
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    if (model.state.isUser) bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    const { recipe } = model.state;

    recipeView.render(model.state.recipe);
    if (model.state.isAdmin) {
      confirmationView.addHandlerConfirm(changeCookingTime);
      confirmationView.init();
    }
    if (!model.state.isUser) helpers.hideBookmark();
  } catch (error) {
    recipeView.renderError();
    console.error(err);
  }
};

const addRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    setTimeout(function () {
      addRecipeView.renderMessage();
      model.state.recipe.isAdmin = true;
      recipeView.render(model.state.recipe);
      confirmationView.addHandlerConfirm(changeCookingTime);
      confirmationView.init();
      helpers.hideBookmark();
      window.history.pushState(null, '', `#${model.state.recipe.id}`);
      if (model.state.search.results.length > 0) {
        paginationView.render(model.state.search);
        resultsView.render(model.getSearchResultsPage());
        deleteItemConfimationView.init();
      }
    }, MSG_LOAD_TIME * 1200);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(err);
  }
};

const addUser = async function (newUser) {
  try {
    model.uploadedUser(newUser);
    addUserView.renderSpinner();
    setTimeout(
      addUserView.renderMessage.bind(addUserView),
      MSG_LOAD_TIME * 1000
    );
  } catch (err) {
    addUserView.renderError(err.message);
    console.error(err);
  }
};

const userLogin = async function (userData) {
  try {
    model.isAuthenticated(userData);
    loginView.renderSpinner();

    if (model.state.isAdmin) {
      helpers.hideButtonsAndModal();
      helpers.addSessionUserName();
      helpers.addShowAllRecipesBtn();
      helpers.addCustomRecipeBtn();
      helpers.addLogoutBtn();
      helpers.addlogoutEvListner(logout);
      helpers.addAllRecipesEvListner(showlAllRecipes);
      addRecipeView.addHandlerUpload(addRecipe);
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
      helpers.addlogoutEvListner(logout);
      bookmarksView.addHandlerRender(bookmarks);
      model.setLoginHash(userData);
      model.setBookmarks();
      bookmarksView.render(model.state.bookmarks);
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

const persistLogin = function () {
  model.persistLogin();

  if (model.state.isAdmin) {
    helpers.clearNav();
    helpers.addSessionUserName();
    helpers.addShowAllRecipesBtn();
    helpers.addCustomRecipeBtn();
    helpers.addLogoutBtn();
    helpers.addlogoutEvListner(logout);
    helpers.addAllRecipesEvListner(showlAllRecipes);
    addRecipeView.addHandlerUpload(addRecipe);
    addRecipeView.init();
  } else if (model.state.isUser) {
    helpers.clearNav();
    helpers.addSessionUserName();
    helpers.addBookmarksBtn();
    helpers.addLogoutBtn();
    helpers.addlogoutEvListner(logout);
    bookmarksView.addHandlerRender(bookmarks);
    bookmarksView.render(model.state.bookmarks);
  }
};

const bookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const pagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
  deleteItemConfimationView.init();
};

const logout = function () {
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

const changeCookingTime = function (data) {
  confirmationView.toogleWindow();
  model.setCookingTime(data);
  model.state.recipe.isAdmin = true;
  recipeView.render(model.state.recipe);
  confirmationView.addHandlerConfirm(changeCookingTime);
  confirmationView.init();
  helpers.hideBookmark();
};

const deleteRecipe = function () {
  try {
    deleteItemConfimationView.toogleWindow();
    model.deleteCurrentRecipe();
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
    deleteItemConfimationView.init();
    recipeView.refresh();
  } catch (err) {
    paginationView.refresh();
    resultsView.renderError(err.message);
  }
};

const servings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
  if (!model.state.isUser) helpers.hideBookmark();
};

const addbookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const showlAllRecipes = function () {
  paginationView.refresh();
  resultsView.renderSpinner();
  model.getAllRecipes();
  setTimeout(function () {
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
    deleteItemConfimationView.init();
  }, REFRESH);
};

const init = function () {
  searchView.addHandlerSearch(searchResults);
  recipeView.addHandlerRender(recipes);
  recipeView.addHandlerUpdateServings(servings);
  recipeView.addHandlerAddBookmark(addbookmarks);
  paginationView.addHandlerClick(pagination);
  loginView.addHandlerLoginUser(userLogin);
  addUserView.addHandlerUploadUser(addUser);
  deleteItemConfimationView.addHandlerConfirm(deleteRecipe);

  model.setLocalStorage();
  persistLogin();
};

init();
