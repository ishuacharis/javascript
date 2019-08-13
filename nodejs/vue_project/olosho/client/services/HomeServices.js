import Api from './api.js'

export default{
  allUsers () {
    return Api.OloshoApi().get(`/users`)
  }
}
