function imports () {
  return `
  query{
    imports{
      album 
      author 
      filename 
      id 
      path 
      title
    }
  }`
}

function books () {
  return `
  query{
    books{
      author 
      cover 
      id 
      lastPlayed 
      length 
      progress 
      source 
      title
    }
  }`
}

function metadata (bookId) {
  return `
  query{
    metadata(
      id:"${bookId}")
      {
        album 
        author 
        filename 
        path 
        title
      }
    }`
}

export default { imports, books, metadata }
