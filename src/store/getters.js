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

let latestBooks = function (state) {
  return state.books
    .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))
    .slice(0, 3)
}

export default { currentPage, allBooks, showNav, latestBooks }
