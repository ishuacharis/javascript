import axios from 'axios'
/* const oloshoApi = axios.create({
  baseURL: 'http://localhost:3000'
})
var api = axios.create({
  baseURL: 'http://localhost:3000'
})

export {oloshoApi, api} */

export default {
  OloshoApi () {
    return axios.create({
      baseURL: 'http://localhost:3000'
    })
  },
  OtherApi () {
    return axios.create({
      baseURL: 'http://localhost:3000'
    })
  }
}
