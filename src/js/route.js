const hash = localStorage.getItem('loginHash');

if (hash !== null) {
  window.location.href = 'loginpage.html';
}
