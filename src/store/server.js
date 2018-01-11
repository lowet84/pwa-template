import dummy from './dummy'

async function updateFromServer (store) {
  console.log('Updating books list from server')
  let books = localStorage.getItem('books')
  if (books === null) {
    books = dummy.populateDummyData()
    localStorage.setItem('books', JSON.stringify(books))
  } else {
    books = JSON.parse(books)
  }

  store.state.books.splice(0, store.state.books.length)
  store.state.books.push(...books)
}

async function getMetadataFromServer (store, id) {
  let book = store.getters.getBook(id)
  if (book.metadata !== undefined) return
  console.log('Getting metadata from server')
  let metadata = localStorage.getItem(`meta_${id}`)
  if (metadata === null) {
    metadata = dummy.getMetadata()
    localStorage.setItem(`meta_${id}`, JSON.stringify(metadata))
  } else {
    metadata = JSON.parse(metadata)
  }
  book.metadata = metadata
}

async function saveBookToServer (store, book) {
  console.log('Saving book to server')
  localStorage.setItem('books', JSON.stringify(store.state.books))
}

async function saveProgressToServer (store, book) {
  console.log('Saving progress to server')
  localStorage.setItem('books', JSON.stringify(store.state.books))
}

async function searchCoversFromServer (store, searchString) {
  console.log('Searching for covers from server')
  return dummy.getSearchResults()
}

async function loginToServer (store, login) {
  console.log('Logging in to server')
  let json = localStorage.getItem('users')
  if (json === null) {
    let user = { username: login.username, password: login.password, admin: true }
    let users = [user]
    localStorage.setItem('users', JSON.stringify(users))
    return user
  } else {
    let users = JSON.parse(json)
    let user = users.find(d => d.username === login.username && d.password === login.password)
    if (user === undefined) return null
    return { username: user.username, token: 'dummyToken', admin: user.admin }
  }
}

async function getUsersFromServer (store) {
  console.log('Getting users from server')
  let json = localStorage.getItem('users')
  if (json === null) return null
  return JSON.parse(json)
}

async function addUserToServer (store, user) {
  console.log(`Adding user ${user.username} from server`)
  let json = localStorage.getItem('users')
  if (json === null) return false
  let users = JSON.parse(json)
  if (users.find(d => d.username === user.username) !== undefined) return false
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
  return true
}

async function deleteUserFromServer (store, userToDelete) {
  console.log(`Deleting user ${userToDelete.username} from server`)
  let json = localStorage.getItem('users')
  if (json === null) return false
  let users = JSON.parse(json)
  let user = users.find(d => d.username === userToDelete.username)
  if (user === undefined) return false
  users.splice(users.indexOf(user), 1)
  localStorage.setItem('users', JSON.stringify(users))
  return true
}

async function changeUserTypeToServer (store, value) {
  console.log(`Deleting user ${value.user.username} from server`)
  let json = localStorage.getItem('users')
  if (json === null) return false
  let users = JSON.parse(json)
  let user = users.find(d => d.username === value.user.username)
  if (user === undefined) return false
  user.admin = value.admin
  localStorage.setItem('users', JSON.stringify(users))
  return true
}

export default {
  updateFromServer,
  getMetadataFromServer,
  saveBookToServer,
  saveProgressToServer,
  searchCoversFromServer,
  loginToServer,
  getUsersFromServer,
  addUserToServer,
  deleteUserFromServer,
  changeUserTypeToServer
}
