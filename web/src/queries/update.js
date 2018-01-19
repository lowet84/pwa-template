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

function saveBook (args) {
  return `
  mutation{
    saveBook(
      id:"${args.id}" 
      title:"${args.title}" 
      author:"${args.author}" 
      cover:"${args.cover}")
    }`
}

export default { imports, books, metadata, saveBook }
