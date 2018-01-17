function login (args) {
  return `
  query{
    login(
      username:"${args.username}" 
      password:"${args.password}")
      {
        token
        admin
      }
    }`
}

function allUsers () {
  return `query{
    allUsers{
      admin 
      username 
      id
    }
  }`
}

export default { login, allUsers }
