import dummy from './dummy'

let updateFromServer = function (store) {
  let books = dummy.populateDummyData()
  store.state.books.splice(0, store.state.books.length)
  store.state.books.push(...books)
}

export default { updateFromServer }
