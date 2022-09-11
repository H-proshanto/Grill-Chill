const admin1 = {
  username: 'admin',
  password: 'admin',
  email: 'admin@bs23.com',
};

const admin2 = {
  username: 'proshanto',
  password: 'fym',
  email: 'proshanto@bs23.com',
};

const admins = [admin1, admin2];
export const initAdmins = function () {
  localStorage.setItem('admins', JSON.stringify(admins));
  localStorage.setItem('adminFlag', 'true');
};
