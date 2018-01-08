import dummy from './dummy'

function updateFromServer (store) {
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

function getMetadataFromServer (store, id) {
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

function saveBookToServer (store, book) {
  console.log('Saving book to server')
  localStorage.setItem('books', JSON.stringify(store.state.books))
}

function saveProgressToServer (store, book) {
  console.log('Saving progress to server')
  localStorage.setItem('books', JSON.stringify(store.state.books))
}

function searchCoversFromServer (store, searchString) {
  console.log('Searching for covers from server')
  return dummy.getSearchResults()
}

export default {
  updateFromServer,
  getMetadataFromServer,
  saveBookToServer,
  saveProgressToServer,
  searchCoversFromServer
}
