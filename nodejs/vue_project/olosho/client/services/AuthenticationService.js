// import oloshoApi from './api.js'
import Api from './api.js'

export default{
  login (credentials) {
    return Api.OloshoApi().post('/login', credentials)
  },
  register (credentials) {
    console.log('bibis')
    return Api.OloshoApi().post('/register', credentials)
  }
}
