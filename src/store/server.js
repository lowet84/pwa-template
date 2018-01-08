import dummy from './dummy'

let updateFromServer = function (store) {
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

let getMetadataFromServer = function (store, id) {
  let book = store.getters.getBook(id)
  if (book.metadata !== undefined) return
  let metadata = localStorage.getItem(`meta_${id}`)
  if (metadata === null) {
    metadata = dummy.getMetadata()
    localStorage.setItem(`meta_${id}`, JSON.stringify(metadata))
  } else {
    metadata = JSON.parse(metadata)
  }
  book.metadata = metadata
}

let saveBookToServer = function (store, book) {
  localStorage.setItem('books', JSON.stringify(store.state.books))
}

let saveProgressToServer = function (store, book) {
  localStorage.setItem('books', JSON.stringify(store.state.books))
}

export default {
  updateFromServer,
  getMetadataFromServer,
  saveBookToServer,
  saveProgressToServer
}
