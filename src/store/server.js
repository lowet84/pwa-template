import dummy from './dummy'

let updateFromServer = function (store) {
  let books = dummy.populateDummyData()
  store.state.books.splice(0, store.state.books.length)
  store.state.books.push(...books)
}

let getMetadata = function (store, id) {
  let book = store.getters.getBook(id)
  if (book.metadata !== undefined) return
  let metadata = dummy.getMetadata()
  book.metadata = metadata
}

export default { updateFromServer, getMetadata }
