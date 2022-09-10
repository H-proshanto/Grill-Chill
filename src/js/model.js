import { initAdmins } from './data/admins.js';
import { initUsers } from './data/users.js';
import { initRecipes } from './data/recipes.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
  username: '',
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
  isAdmin: false,
  isUser: false,
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await searchLocalStorage(query);

    state.search.results = data.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image,
        isAdmin: state.isAdmin,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateResultState = function () {
  state.search.results.forEach(result => {
    result.isAdmin = state.isAdmin;
  });
};

export const isAuthenticated = function (userData) {
  const admins = JSON.parse(localStorage.getItem('admins'));
  const users = JSON.parse(localStorage.getItem('users'));

  admins.forEach(admin => {
    if (
      admin.username === userData.username &&
      admin.password === userData.password
    )
      state.isAdmin = true;
    state.username = userData.username;
  });

  users.forEach(users => {
    if (
      users.username === userData.username &&
      users.password === userData.password
    )
      state.isUser = true;
    state.username = userData.username;
  });
};

export const uploadedUser = function (newUser) {
  const users = JSON.parse(localStorage.getItem('users'));

  newUser.bookmarks = [];
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const setLoginHash = function (userData) {
  const admins = JSON.parse(localStorage.getItem('admins'));
  const users = JSON.parse(localStorage.getItem('users'));

  for (let i = 0; i < admins.length; i++) {
    if (
      admins[i].username === userData.username &&
      admins[i].password === userData.password
    ) {
      window.location.hash = `156ad4A` + i.toString();
    }
  }

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === userData.username &&
      users[i].password === userData.password
    ) {
      window.location.hash = `156ad4U` + i.toString();
    }
  }
  localStorage.setItem('loginHash', window.location.hash.slice(1));
};

export const persistLogin = function () {
  const hash = localStorage.getItem('loginHash');

  if (hash !== null && hash.includes('156ad4')) {
    const lastIndex = hash.length - 1;
    if (hash[lastIndex - 1] === 'A') {
      const admins = JSON.parse(localStorage.getItem('admins'));
      state.isAdmin = true;
      state.username = admins[Number(hash[lastIndex])].username;
    } else if (hash[lastIndex - 1] === 'U') {
      const users = JSON.parse(localStorage.getItem('users'));
      state.isUser = true;
      state.bookmarks = users[Number(hash[lastIndex])].bookmarks;
      state.username = users[Number(hash[lastIndex])].username;
    }
  }
};

export const setLocalStorage = function () {
  const userFlag = localStorage.getItem('userFlag');
  const adminFlag = localStorage.getItem('adminFlag');
  const recipesFlag = localStorage.getItem('recipesFlag');

  if (adminFlag !== 'true') initAdmins();
  if (userFlag !== 'true') initUsers();
  if (recipesFlag !== 'true') initRecipes();
};

const searchLocalStorage = async function (query) {
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  query = query.toUpperCase();
  let result = [];

  recipes.forEach(recipe => {
    if (recipe.id.includes(query)) result.push(recipe);
  });

  return result;
};

const searchLocalStorageRecipe = async function (id) {
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  let data;

  recipes.forEach(recipe => {
    if (recipe.id === id) data = recipe;
  });

  return data;
};

export const refreshSession = function () {
  state.username = '';
  state.recipe = {};
  state.search.query = '';
  state.search.results = [];
  state.search.resultsPerPage = RES_PER_PAGE;
  state.search.page = 1;
  state.bookmarks = [];
  state.isAdmin = false;
  state.isUser = false;
  localStorage.removeItem('loginHash');
};

export const loadRecipe = async function (id) {
  try {
    const data = await searchLocalStorageRecipe(id);
    state.recipe = data;
    if (state.isAdmin) state.recipe.isAdmin = true;

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const setCookingTime = function (time) {
  const id = window.location.hash.slice(1);
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  let changedRecipe;

  recipes.forEach(recipe => {
    if (recipe.id === id) {
      recipe.cookingTime = time;
      changedRecipe = recipe;
    }
  });

  state.recipe = changedRecipe;
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

export const deleteCurrentRecipe = function () {
  const id = window.location.hash.slice(1);
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  let index;

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === id) {
      index = i;
    }
  }

  recipes.splice(index, 1);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  state.search.results = recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image,
      isAdmin: state.isAdmin,
    };
  });
  window.location.hash = '';
};
