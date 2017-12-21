function setApplicationTitle (state, value) {
  state.applicationTitle = value
}

function populateDummyData (state) {
  for (let index = 0; index < 15; index++) {
    let date = randomDate(new Date(2017, 0, 1), new Date())
    let length = Math.floor(Math.random() * 40000)
    let progressState = Math.floor(Math.random() * 3)

    let progress
    switch (progressState) {
      case 0: progress = 0; break
      case 1: progress = length * Math.random(); break
      case 2: progress = length; break
    }

    let book = {
      title: Math.random().toString(36).substring(7),
      author: Math.random().toString(36).substring(7),
      id: Math.random(),
      length: length,
      progress: progress,
      lastPlayed: date.toString(),
      cover: '/static/img/cover.jpg'
    }
    state.books.push(book)
  }
}

function randomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export default { setApplicationTitle, populateDummyData }
