function loggedIn () {
  let token = localStorage.getItem('loginToken')
  return token !== null
}

function tryLogin (username, password) {
  if (username === 'user' && password === 'pw') {
    localStorage.setItem('loginToken', 'dummy')
    return true
  }
  return false
}

function logout () {
  localStorage.removeItem('loginToken')
}

export default { loggedIn, tryLogin, logout }
