let currentPage = function (state) {
  return state.route.name
}

let showNav = function (state) {
  let withNav = ['Home', 'Browse', 'Settings']
  return withNav.includes(state.route.name)
}

let allBooks = function (state) {
  return state.books
    .sort((a, b) => a.title.localeCompare(b.title))
}

let latestBook = function (state) {
  let ret = state.books
    .filter(d => d.progress !== null)
    .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))[0]
  return ret
}

export default { currentPage, allBooks, showNav, latestBook }
