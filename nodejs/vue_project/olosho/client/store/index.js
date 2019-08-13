import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from '../src/router'

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: 'olosho',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    debug: true,
    session_token: null,
    currentUser: {},
    isLoggedIn: false
  },
  getters: {
    USER: state => {
      return state.currentUser
    },
    ISLOGGEDIN: state => {
      return state.isLoggedIn
    }
  },
  mutations: {
    SET_USER: (state, payload) => {
      if (state.debug) {
        console.log('add user action triggered ', payload)
      }
      state.currentUser = Object.assign({}, payload)
    },
    UPDATE_USER: (state, payload) => {
      if (state.debug) {
        console.log('add user action triggered ', payload)
      }
      state.currentUser = Object.assign({}, payload)
    },
    SET_SESSION_TOKEN: (state, payload) => {
      if (this.debug) console.log('this sets the session token', payload)
      localStorage.setItem('session_token', payload)
      state.session_token = localStorage.getItem('session_token')
      if (payload) {
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
      }
    },
    LOGOUT_USER: (state) => {
      state.session_token = null
      state.currentUser = {}
      state.isLoggedIn = false
    }
  },
  actions: {
    SET_USER: async (context, payload) => {
      context.commit('SET_USER', payload)
    },
    UPDATE_USER: async (context, payload) => {
      context.commit('UPDATE_USER', payload)
    },
    SET_SESSION_TOKEN: async (context, payload) => {
      context.commit('SET_SESSION_TOKEN', payload)
    },
    LOGOUT: async (context) => {
      localStorage.removeItem('session_token')
      localStorage.removeItem('olosho')
      context.commit('LOGOUT_USER')
      router.replace('/login')
    }
  },
  plugins: [vuexPersist.plugin]
})
