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

export default { login }
