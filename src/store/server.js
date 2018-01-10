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
  let json = localStorage.getItem('users')
  if (json === null) {
    let user = { username: login.username, password: login.password, admin: true }
    let users = [user]
    localStorage.setItem('users', JSON.stringify(users))
    return user
  } else {
    let users = JSON.parse(json)
    let user = users.find(d => d.username === login.username && d.password === login.password)
    return { username: user.username, token: 'dummyToken', admin: user.admin }
  }
}

export default {
  updateFromServer,
  getMetadataFromServer,
  saveBookToServer,
  saveProgressToServer,
  searchCoversFromServer,
  loginToServer
}
