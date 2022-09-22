import { initAdmins } from './data/admins';
import { initUsers } from './data/users';
import { initRecipes } from './data/recipes';
import { RES_PER_PAGE } from './config';
import recipeView from './views/recipeView';

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

    if (!data) {
      throw Error('Recipe Not Found');
    }

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
  const admins = getAdmins();
  const users = getUsers();

  checkAdminAuth(admins, userData);

  if (state.isAdmin) return;
  checkUserAuth(users, userData);
};

export const uploadedUser = function (newUser) {
  try {
    const users = getUsers();
    const admins = getAdmins();

    if (!verifyUsername(admins, users, newUser)) {
      throw Error('This Username is already registered');
    }

    if (!verifyEmail(users, newUser)) {
      throw Error('This Email is already registered');
    }

    newUser.bookmarks = [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  } catch (err) {
    throw err;
  }
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const allIngredients = [];
    const ingredients = [];
    Object.entries(newRecipe)
      .filter(el => {
        const nameOfelement = el[0];
        if (nameOfelement.includes('ingredient') === true) {
          return el;
        }
      })
      .forEach(el => {
        const nameOfIngredient = el[0];
        const valueOfIngredient = el[1];
        const index = nameOfIngredient[11];
        const property = nameOfIngredient.slice(13);
        if (property === 'quantity') {
          const newObject = {};
          const convertedValue = Number(valueOfIngredient);
          newObject[property] = convertedValue !== 0 ? convertedValue : null;
          allIngredients.push(newObject);
        } else {
          const object = allIngredients[index];
          object[property] = valueOfIngredient;
        }
      });

    allIngredients.forEach((el, index) => {
      if (
        el.description.length === 0 &&
        (el.unit.length !== 0 || el.quantity !== null)
      ) {
        throw Error('Please give the description of the ingredient');
      }

      if (el.description.length !== 0) {
        ingredients.push(el);
      }
    });

    const recipe = {
      title: newRecipe.title,
      sourceUrl: newRecipe.sourceUrl,
      image: newRecipe.image,
      publisher: newRecipe.publisher,
      cookingTime: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const size = recipes.length;
    const title = recipe.title.toUpperCase();
    if (title.includes('BURGER')) {
      recipe.id = 'BURGERitem' + size.toString();
    } else if (title.includes('PIZZA')) {
      recipe.id = 'PIZZAitem' + size.toString();
    }

    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    state.recipe = recipe;
    state.search.results.unshift(recipe);
  } catch (err) {
    throw err;
  }
};

export const setLoginHash = function (userData) {
  const admins = getAdmins();
  const users = getUsers();

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
  if ((!query.includes('PIZZA') && !query.includes('BURGER')) || !recipes) {
    return false;
  }

  let result = [];
  recipes.forEach(recipe => {
    const match = recipe.id.toUpperCase();
    if (match.includes(query)) result.push(recipe);
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
  const users = getUsers();
  let index;

  for (let i = 0; i < users.length; i++) {
    let indexOfBookmark = -1;
    for (let j = 0; j < users[i].bookmarks.length; j++) {
      if (users[i].bookmarks[j].id === id) {
        indexOfBookmark = j;
      }
    }
    if (indexOfBookmark !== -1) {
      users[i].bookmarks.splice(indexOfBookmark, 1);
    }
  }

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === id) {
      index = i;
    }
  }

  recipes.splice(index, 1);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  localStorage.setItem('users', JSON.stringify(users));
  for (let i = 0; i < state.search.results.length; i++) {
    if (state.search.results[i].id === id) {
      index = i;
    }
  }
  state.search.results.splice(index, 1);

  if (getSearchResultsPage().length === 0) {
    if (state.search.page !== 1) state.search.page -= 1;
    else {
      recipeView.refresh();
      throw new Error('All Items Deleted !');
    }
  }
  window.location.hash = '';
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;

  const recipes = JSON.parse(localStorage.getItem('recipes'));
  recipes.forEach(recipe => {
    if (recipe.id === state.recipe.id) {
      recipe.servings = newServings;
    }
  });
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

const persistBookmarks = function () {
  const hash = localStorage.getItem('loginHash');
  const lastIndex = hash.length - 1;
  const users = JSON.parse(localStorage.getItem('users'));

  users[Number(hash[lastIndex])].bookmarks = state.bookmarks;
  localStorage.setItem('users', JSON.stringify(users));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

export const setBookmarks = function () {
  const hash = localStorage.getItem('loginHash');
  const lastIndex = hash.length - 1;
  const users = JSON.parse(localStorage.getItem('users'));

  state.bookmarks = users[Number(hash[lastIndex])].bookmarks;
};

export const getAllRecipes = function () {
  const recipes = JSON.parse(localStorage.getItem('recipes'));

  state.search.results = recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image,
      isAdmin: true,
    };
  });
  state.search.page = 1;
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem('users'));
};

const getAdmins = () => {
  return JSON.parse(localStorage.getItem('admins'));
};

const checkAdminAuth = (admins, userData) => {
  admins.forEach(admin => {
    if (
      admin.username === userData.username &&
      admin.password === userData.password
    )
      state.isAdmin = true;
    state.username = userData.username;
  });
};

const checkUserAuth = (users, userData) => {
  users.forEach(user => {
    if (
      user.username === userData.username &&
      user.password === userData.password
    )
      state.isUser = true;
    state.username = userData.username;
  });
};

const verifyUsername = (admins, users, newUser) => {
  let verifiedStatus = true;

  users.forEach(user => {
    if (user.username === newUser.username) {
      verifiedStatus = false;
    }
  });

  admins.forEach(admin => {
    if (admin.username === newUser.username) {
      verifiedStatus = false;
    }
  });

  return verifiedStatus;
};

const verifyEmail = (users, newUser) => {
  let verifiedStatus = true;

  users.forEach(user => {
    if (user.email === newUser.email) {
      verifiedStatus = false;
    }
  });

  return verifiedStatus;
};
