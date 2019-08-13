// import oloshoApi from './api.js'
import Api from './api.js'

export default {
  bio (credentials, id, token) {
    return Api.OloshoApi().patch(`/user/${id}/bio`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  body (credentials, id, token) {
    return Api.OloshoApi().patch(`/user/${id}/body`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  changePassword (credentials, id, token) {
    return Api.OloshoApi().patch(`/user/${id}/change_password`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  changePhone (credentials, id, token) {
    return Api.OloshoApi().patch(`/user/${id}/phone`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  services (credentials, id, token) {
    return Api.OloshoApi().patch(`/user/${id}/services`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  rates (credentials, id, token) {
    return Api.OloshoApi().patch(`/user/${id}/rates`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  upload (id, credentials, token) {
    return Api.OloshoApi().patch(`/user/${id}/upload`,
      credentials, {
        headers: {
          'Authorization': token
        }
      })
  },
  uploadAvatar (id, credentials, token) {
    return Api.OloshoApi().patch(`/user/${id}/upload_avatar`, credentials, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    })
  }
}
