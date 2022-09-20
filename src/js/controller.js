import * as model from './model';
import * as addEvListnerHelpers from './helpers/addEvListnerHelpers';
import * as hidingHelpers from './helpers/hidingHelpers';
import * as sessionHelpers from './helpers/sessionHelpers';
import * as addBtnHelpers from './helpers/addBtnHelpers';
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

import { MSG_LOAD_TIME, REFRESH, LOAD_PAGE } from './config';

const searchResults = async function () {
  try {
    const query = searchView.getQuery();
    paginationView.refresh();
    resultsView.renderSpinner();

    if (query === '') {
      nullQueryRefresh();
      throw Error('Invalid Token , Please Try Again !');
    }

    await model.loadSearchResults(query);

    setTimeout(function () {
      renderLoadResults();
    }, REFRESH);
  } catch (err) {
    setTimeout(function () {
      resultsView.renderError(err.message);
      console.log(err);
    }, REFRESH);
  }
};

const recipes = async function () {
  try {
    model.persistLogin();
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());

    if (model.state.isUser) {
      bookmarksView.update(model.state.bookmarks);
    }

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);

    if (model.state.isAdmin) {
      confirmationViewinit();
    }

    if (!model.state.isUser) {
      hidingHelpers.hideBookmark();
    }
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
      confirmationViewinit();
      hidingHelpers.hideBookmark();
      window.history.pushState(null, '', `#${model.state.recipe.id}`);

      if (model.state.search.results.length > 0) {
        updateSearchResults();
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
    if (model.state.isAdmin || model.state.isUser) {
      sessionHelpers.clearNav();
      hidingHelpers.hideModal();
      addBtnHelpers.addSessionUserName();
    }

    if (model.state.isAdmin) {
      addBtnHelpers.addShowAllRecipesBtn();
      addBtnHelpers.addCustomRecipeBtn();
      logoutInit();
      addEvListnerHelpers.addAllRecipesEvListner(showlAllRecipes);
      addRecipeView.addHandlerUpload(addRecipe);
      addRecipeView.init();
      model.setLoginHash(userData);
      refreshPage();
    } else if (model.state.isUser) {
      addBtnHelpers.addBookmarksBtn();
      logoutInit();
      bookmarksView.addHandlerRender(bookmarks);
      model.setLoginHash(userData);
      model.setBookmarks();
      bookmarksView.render(model.state.bookmarks);
      refreshPage();
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
  setTimeout(() => {
    model.persistLogin();

    if (model.state.isAdmin || model.state.isUser) {
      sessionHelpers.clearNav();
      addBtnHelpers.addSessionUserName();
    }

    if (model.state.isAdmin) {
      addBtnHelpers.addShowAllRecipesBtn();
      addBtnHelpers.addCustomRecipeBtn();
      logoutInit();
      addEvListnerHelpers.addAllRecipesEvListner(showlAllRecipes);
      addRecipeView.addHandlerUpload(addRecipe);
      addRecipeView.init();
    } else if (model.state.isUser) {
      addBtnHelpers.addBookmarksBtn();
      logoutInit();
      bookmarksView.addHandlerRender(bookmarks);
      bookmarksView.render(model.state.bookmarks);
    }
  }, LOAD_PAGE);
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
    window.location.href = 'index.html';
    model.refreshSession();
  } catch (err) {
    console.error(err);
  }
};

const changeCookingTime = function (data) {
  confirmationView.toogleWindow();
  model.setCookingTime(data);
  model.state.recipe.isAdmin = true;
  recipeView.render(model.state.recipe);
  confirmationViewinit();
  hidingHelpers.hideBookmark();
};

const deleteRecipe = function () {
  try {
    deleteItemConfimationView.toogleWindow();
    model.deleteCurrentRecipe();
    updateSearchResults();
    recipeView.refresh();
  } catch (err) {
    paginationView.refresh();
    resultsView.renderError(err.message);
  }
};

const servings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
  if (!model.state.isUser) hidingHelpers.hideBookmark();
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
    updateSearchResults();
  }, REFRESH);
};

const init = function () {
  setTimeout(() => {
    loginView.setLoginView();
    addUserView.setAddUserView();
    searchView.setSearchView();
    paginationView.setPaginationView();
    resultsView.setResultsView();
    recipeView.setRecipeView();
    loginView.addHandlerLoginUser(userLogin);
    addUserView.addHandlerUploadUser(addUser);
    searchView.addHandlerSearch(searchResults);
    paginationView.addHandlerClick(pagination);
    recipeView.addHandlerRender(recipes);
    recipeView.addHandlerUpdateServings(servings);
    recipeView.addHandlerAddBookmark(addbookmarks);
  }, LOAD_PAGE);
  deleteItemConfimationView.addHandlerConfirm(deleteRecipe);

  model.setLocalStorage();

  // Turned off persistlogin for testing
  // persistLogin();
};

const confirmationViewinit = function () {
  confirmationView.addHandlerConfirm(changeCookingTime);
  confirmationView.init();
};

const logoutInit = function () {
  addBtnHelpers.addLogoutBtn();
  addEvListnerHelpers.addlogoutEvListner(logout);
};

const nullQueryRefresh = function () {
  paginationView.refresh();
  model.state.search.results = [];
  model.state.search.page = 1;
};

const renderLoadResults = function () {
  try {
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
    if (model.state.isAdmin) {
      deleteItemConfimationView.init();
    }
  } catch (err) {
    throw err;
  }
};

const updateSearchResults = function () {
  paginationView.render(model.state.search);
  resultsView.render(model.getSearchResultsPage());
  deleteItemConfimationView.init();
};

const refreshPage = function () {
  recipeView.refresh();
  resultsView.refresh();
  paginationView.refresh();
};

init();
