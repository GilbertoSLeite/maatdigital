const Logout = () => 
  localStorage.removeItem('@maatdigital/isAuthenticated') || localStorage.removeItem('@maatdigital/token') || localStorage.removeItem('@maatdigital/user') || window.location.reload()

export default Logout;