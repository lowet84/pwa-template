function setApplicationTitle (state, value) {
  state.applicationTitle = value
}

function setSorting (state, value) {
  state.sortby = value
}

function setCurrentPage (state, value) {
  state.currentPage = value
}

function addError (state, value) {
  state.errors.push(value)
}

export default { setApplicationTitle, setSorting, setCurrentPage, addError }
