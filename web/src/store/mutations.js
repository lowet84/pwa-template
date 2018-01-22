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
  state.errors.push(`Error: ${value.error} \nArgs: ${value.args}`)
}

export default { setApplicationTitle, setSorting, setCurrentPage, addError }
