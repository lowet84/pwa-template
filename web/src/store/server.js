import api from '../api'

async function saveProgressToServer (store, book) {
  console.log('Saving progress to server')
  let progress = Math.floor(book.progress * 1000)
  return api('saveProgress', { id: book.progressId, progress: progress })
    .catch(e => store.commit('addError', e))
}

async function saveBookToServer (store, book) {
  console.log('Saving book to server')
  return api('saveBook', book).catch(e => store.commit('addError', { error: e }))
}

async function getMetadataFromServer (store, id) {
  let book = store.getters.getBook(id)
  if (book.metadata !== undefined) return
  console.log('Getting metadata from server')
  let metadata = await api('metadata', id).catch(e => store.commit('addError', { error: e }))
  return metadata
}

async function updateFromServer (store) {
  console.log('Updating books list from server')
  let books = await api('books').catch(e => store.commit('addError', { error: e }))
  store.state.books.splice(0, store.state.books.length)
  store.state.books.push(...books)

  let imports = await api('imports').catch(e => store.commit('addError', { error: e }))
  store.state.imports.splice(0, store.state.imports.length)
  store.state.imports.push(...imports)
}

async function importBookToServer (store, value) {
  console.log(`Importing book to server`)
  let args = {
    id: value.id,
    cover: value.cover.cover,
    link: value.cover.link
  }
  return api('importBook', args)
    .catch(error => store.commit('addError', { error, args }))
}

async function searchCoversFromServer (store, searchString) {
  console.log('Searching for covers from server')
  return api('searchCovers', searchString)
    .catch(e => store.commit('addError', { error: e }))
}

async function loginToServer (store, login) {
  console.log('Logging in to server')
  let res = await api('login',
    { username: login.username, password: login.password })
    .catch(e => store.commit('addError', { error: e }))
  if (res === null) return null
  return { username: login.username, token: res.token, admin: res.admin }
}

async function getUsersFromServer (store) {
  console.log('Getting users from server')
  let users = api('allUsers').catch(e => store.commit('addError', { error: e }))
  return users
}

async function addUserToServer (store, user) {
  console.log(`Adding user ${user.username} from server`)
  return api('addUser', user).catch(e => store.commit('addError', { error: e }))
}

async function deleteUserFromServer (store, userToDelete) {
  console.log(`Deleting user ${userToDelete.username} from server`)
  return api('deleteUser', userToDelete.username)
    .catch(e => store.commit('addError', { error: e }))
}

async function changePasswordToServer (store, value) {
  console.log(`Changing password to server`)
  return api('changePassword',
    { oldPass: value.oldpass, newPass: value.password })
    .catch(e => store.commit('addError', { error: e }))
}

async function changeUserTypeToServer (store, value) {
  console.log(`Changing user type for user ${value.user.username} from server`)
  return api('changeUserType',
    { username: value.user.username, admin: value.admin })
    .catch(e => store.commit('addError', { error: e }))
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
