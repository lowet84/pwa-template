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
      let progress = Math.floor((d.progress / d.length) * 100)
      return { ...d, progress }
    })
}

function latestBook (state) {
  let ret = state.books
    .map(d => {
      let progress = Math.floor((d.progress / d.length) * 100)
      return { ...d, progress }
    })
    .filter(d => d.progress > 0 && d.progress < 100)
    .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))[0]
  return ret
}

function getBook (state) {
  return function (id) {
    return state.books.find(d => d.id === Number(id))
  }
}

export default { currentPage, allBooks, showNav, latestBook, getBook }
