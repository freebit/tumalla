import config from '../config'

export default {

  auth: {
    getUrl () {
      return `${config.apiUrl}`
    },
    me () {
      return fetch(`${this.getUrl()}/me`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
    },
    login (data: FormData) {
      return fetch(`${this.getUrl()}/login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        body: data
      })
    }
  },

  upload (data: FormData) {
    return fetch(`${config.apiUrl}/upload`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      body: data
    })
  },

  slides: {
    getUrl() {
      return `${config.apiUrl}/slides`
    },
    get () {
      return fetch(`${this.getUrl()}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}