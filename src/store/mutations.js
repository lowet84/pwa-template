function setApplicationTitle (state, value) {
  state.applicationTitle = value
}

function populateDummyData (state) {
  for (let index = 0; index < 15; index++) {
    let date = randomDate(new Date(2017, 0, 1), new Date())
    let book = {
      title: Math.random().toString(36).substring(7),
      author: Math.random().toString(36).substring(7),
      id: Math.random(),
      progress: { part: 2, time: 40 },
      lastPlayed: date.toString()
    }
    state.books.push(book)
  }
}

function randomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export default { setApplicationTitle, populateDummyData }
