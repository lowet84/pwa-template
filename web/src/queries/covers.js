function searchCovers (search) {
  return `
  query{
    searchCovers(
      searchString:"${search}")
      {
        cover
        id
        link
      }
    }`
}

export default { searchCovers }
