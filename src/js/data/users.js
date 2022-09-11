const user1 = {
  username: 'imran',
  password: '1234',
  email: 'MdImranMir@gmail.com',
  bookmarks: [],
};

const user2 = {
  username: 'rafi',
  password: '5678',
  email: 'rafi69@gmail.com',
  bookmarks: [],
};

const users = [user1, user2];
export const initUsers = function () {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('userFlag', 'true');
};
