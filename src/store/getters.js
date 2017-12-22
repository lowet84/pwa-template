function currentPage (state) {
  return state.route.name
}

function showNav (state) {
  let withNav = ['Home', 'Browse', 'Settings']
  return withNav.includes(state.route.name)
}

function allBooks (state) {
  return state.books
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(d => {
      let progressPercent = Math.floor((d.progress / d.length) * 100)
      return { ...d, progressPercent }
    })
}

function latestBook (state) {
  let ret = state.books
    .map(d => {
      let progressPercent = Math.floor((d.progress / d.length) * 100)
      return { ...d, progressPercent }
    })
    .filter(d => d.progressPercent > 0 && d.progressPercent < 100)
    .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))
  console.log(ret.map(d => d.lastPlayed))
  return ret[0]
}

function getBook (state) {
  return function (id) {
    let book = state.books.find(d => d.id === Number(id))
    if (book === undefined) return book
    book.progressPercent = Math.floor((book.progress / book.length) * 100)
    return book
  }
}

export default { currentPage, allBooks, showNav, latestBook, getBook }
