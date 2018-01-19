import login from './queries/login'
import covers from './queries/covers'
import user from './queries/user'
import update from './queries/update'
import imports from './queries/import'

export default {
  ...login,
  ...covers,
  ...user,
  ...update,
  ...imports
}
