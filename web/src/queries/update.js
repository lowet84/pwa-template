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

export default { imports }
