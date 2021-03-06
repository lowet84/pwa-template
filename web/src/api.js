import Axios from 'axios'
import queries from './queries'

const host = 'api'

export default async function (query, args) {
  let queryText = await queries[query](args)
  var escapedQuery = queryText
    .replace(/"/g, '\\"')
  let queryString = '{query:"' + escapedQuery + '"}'
  var accessToken = getToken()
  var headers = null

  var ret = accessToken !== null
    ? await Axios.post(host, queryString, { headers: { Authorization: `Bearer ${accessToken}` } })
    : await Axios.post(host, queryString, headers)
  return ret.data.data[query]
}

function getToken () {
  let json = localStorage.getItem('user')
  if (json === null) return null
  let user = JSON.parse(json)
  return user.token
}
