function importBook (args) {
  return `
  mutation{
    importBook(
      importId:"${args.id}" 
      cover:"${args.cover}" 
      link:"${args.link}")
    }`
}

export default { importBook }
