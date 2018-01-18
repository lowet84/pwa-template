function allUsers () {
  return `query{
    allUsers{
      admin 
      username 
      id
    }
  }`
}

function addUser (args) {
  return `mutation{
    addUser(
      username:"${args.username}" 
      password:"${args.password}" 
      admin:${args.admin})
    }`
}

function deleteUser (username) {
  return `mutation{
    deleteUser(
      username:"${username}")
    }`
}

function changePassword (args) {
  return `mutation{
    changePassword(
      oldPass:"${args.oldPass}" 
      newPass:"${args.newPass}")
    }`
}

function changeUserType (args) {
  return `mutation{
    changeUserType(
      username:"${args.username}" 
      admin:${args.admin})
    }`
}

export default { allUsers, addUser, deleteUser, changePassword, changeUserType }
