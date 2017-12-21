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
    .map(d => {
      let progress = Math.floor((d.progress / d.length) * 100)
      return { ...d, progress }
    })
}

let latestBook = function (state) {
  let ret = state.books
    .map(d => {
      let progress = Math.floor((d.progress / d.length) * 100)
      return { ...d, progress }
    })
    .filter(d => d.progress > 0 && d.progress < 100)
    .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))[0]
  return ret
}

export default { currentPage, allBooks, showNav, latestBook }
