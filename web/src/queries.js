import login from './queries/login'
import covers from './queries/covers'
import user from './queries/user'

export default {
  ...login,
  ...covers,
  ...user
}
