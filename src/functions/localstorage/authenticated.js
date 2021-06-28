const Authenticated = (isAuthenticated, token, user) => {
  localStorage.setItem('@maatdigital/isAuthenticated', isAuthenticated);
  localStorage.setItem('@maatdigital/token', token);
  localStorage.setItem('@maatdigital/user', user);
}

export default Authenticated;