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
};

export const persistLogin = function () {
  const hash = window.location.hash;
  if (hash !== '' && hash.includes('156ad4')) {
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
};
