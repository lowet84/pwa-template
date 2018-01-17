import dummy from './dummy'
import api from '../api'

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

  let imports = localStorage.getItem('imports')
  if (imports === null) {
    imports = dummy.populateImports()
    localStorage.setItem('imports', JSON.stringify(imports))
  } else {
    imports = JSON.parse(imports)
  }

  store.state.imports.splice(0, store.state.imports.length)
  store.state.imports.push(...imports)
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

async function importBookToServer (store, value) {
  console.log(`Importing book to server`)
  let json = localStorage.getItem('imports')
  if (json === null) return false
  let imports = JSON.parse(json)
  let item = imports.find(d => Number(d.id) === Number(value.id))
  if (item === undefined) return false
  imports.splice(imports.indexOf(item), 1)
  localStorage.setItem('imports', JSON.stringify(imports))

  let book = dummy.getDummyBook()
  book.cover = value.cover.cover
  book.lastPlayed = Date.parse('01 Jan 1970 00:00:00 GMT')
  book.progress = 0

  let jsonBooks = localStorage.getItem('books')
  if (jsonBooks === null) return false
  let books = JSON.parse(jsonBooks)
  books.push(book)
  localStorage.setItem('books', JSON.stringify(books))

  return true
}

// TODO: users and login

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
  console.log(`Changing user type for user ${value.user.username} from server`)
  let json = localStorage.getItem('users')
  if (json === null) return false
  let users = JSON.parse(json)
  let user = users.find(d => d.username === value.user.username)
  if (user === undefined) return false
  user.admin = value.admin
  localStorage.setItem('users', JSON.stringify(users))
  return true
}

async function changePasswordToServer (store, value) {
  console.log(`Changing password to server`)
  let json = localStorage.getItem('users')
  if (json === null) return false
  let users = JSON.parse(json)
  let user = users.find(d => d.username === value.username)
  if (user === undefined) return false
  if (user.password !== value.oldpass) return false
  user.password = value.password
  localStorage.setItem('users', JSON.stringify(users))
  return true
}

// Moved to api

async function loginToServer (store, login) {
  console.log('Logging in to server')
  let res = await api('login', { username: login.username, password: login.password })
  if (res === null) return null
  return { username: login.username, token: res.token, admin: res.admin }
}

async function getUsersFromServer (store) {
  console.log('Getting users from server')
  let users = api('allUsers')
  return users
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
  changeUserTypeToServer,
  changePasswordToServer,
  importBookToServer
}
