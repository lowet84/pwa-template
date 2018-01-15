function setApplicationTitle (state, value) {
  state.applicationTitle = value
}

function setSorting (state, value) {
  state.sortby = value
}

function setCurrentPage (state, value) {
  state.currentPage = value
}

export default { setApplicationTitle, setSorting, setCurrentPage }
