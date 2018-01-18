function searchCovers (search) {
  return `
  query{
    searchCovers(
      searchString:"${search}")
      {
        cover
        id
      }
    }`
}

export default { searchCovers }
