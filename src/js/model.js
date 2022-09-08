export const state = {
  username: '',
  recipe: {},
  search: {
    query: '',
    results: [],
    // resultsPerPage: RES_PER_PAGE,
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
