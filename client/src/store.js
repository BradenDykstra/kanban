import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'
import { set } from 'mongoose'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {

    },
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, payload) {
      state.lists = payload
    },
    setActiveBoard(state, payload) {
      state.activeBoard = payload
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getOneBoard({ commit, dispatch }, payload) {
      api.get('boards', payload)
        .then(res => {
          commit('setActiveBoard', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(serverBoard => {
          dispatch('getBoards')
          router.push('/boards')
        })
    },
    //#endregion


    //#region -- LISTS --
    getLists({ commit, dispatch }, payload) {

      api.get(`/boards/${payload}/lists`)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, data) {
      api.post('lists', data)
        .then(serverList => {
          dispatch('getLists', data.boardId)
        })
    },
    deleteList({ commit, dispatch }, data) {
      api.delete('lists/' + data._id)
        .then(res => {
          dispatch('getLists', data.boardId)
        })
    },
    //#endregion
    getTasks({ commit, dispatch }, payload) {
      api.get(`/lists/${payload}/tasks`)
        .then(res => {
          commit('setTasks', { tasks: res.data, listId: payload })
        })
    },
    addTask({ commit, dispatch }, payload) {
      api.post(`/tasks`, payload)
        .then(res => {
          dispatch('getTasks', payload.listId)
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete(`/tasks/${payload._id}`)
        .then(res => {
          dispatch('getTasks', payload.listId)
        })
    },
    //end other region that we didn't start

    getComments({ commit, dispatch }, payload) {
      api.get(`/tasks/${payload}/comments`)
        .then(res => {
          commit('setComments', { comments: res.data, taskId: payload })
        })
    }
  }
})