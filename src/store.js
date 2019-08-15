import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: null,
    modal: false,
    cards: [
      {
        name: 'rickandmortyapi.com',
        discription: 'Данные о 5 персонажах мультсериала Рик и Морти',
        url: 'https://rickandmortyapi.com/api/character/1,2,3,4,5',
        icon: 'https://img.icons8.com/color/48/000000/rick-sanchez.png'
      },
      {
        name: 'coindesk.com',
        discription: 'Текущая цена биткоина',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        icon: 'https://img.icons8.com/material/48/000000/bitcoin--v1.png'
      },
      {
        name: 'randomuser.me',
        discription: 'Генерирует рандомные данные пользователя',
        url: 'https://randomuser.me/api',
        icon: 'https://img.icons8.com/office/40/000000/user.png'
      },
      {
        name: 'dog.ceo',
        discription: 'Рандомное фото собаки',
        url: 'https://dog.ceo/api/breeds/image/random',
        icon: 'https://img.icons8.com/office/40/000000/dog.png'
      },
      {
        name: 'api.chucknorris.io',
        discription: 'Рандомная шутка про Чака Норриса',
        url: 'https://api.chucknorris.io/jokes/random',
        icon: 'https://img.icons8.com/ios-filled/50/000000/kicking.png'
      },
      {
        name: 'breaking-bad-quotes',
        discription: 'Рандомная цитата из сериала Во все тяжкие',
        url: 'https://breaking-bad-quotes.herokuapp.com/v1/quotes/5',
        icon: 'https://img.icons8.com/color/48/000000/walter-white.png'
      }
    ],
    api: {},
    currentCard: ''
  },
  getters:{
    USERS: state => {
      return state.users
    },
    CURRENT_USER: state => {
      return state.currentUser
    },
    MODAL: state => {
      return state.modal
    },
    CARDS: state => {
      return state.cards
    },
    API: state => {
      return state.api
    },
    CURRENT_CARD: state => {
      return state.currentCard
    }
  },
  mutations: {
    ADD_USER: (state, payload) => {
      state.users.push(payload)
    },
    DELETE_USER: (state, payload) => {
      state.users.splice(payload, 1)
    },
    EDIT_USER: (state, payload) => {
      state.users.splice(payload.key, 1, payload.user)
    },
    CHANGE_USER: (state, payload) => {
      state.currentUser = state.users[payload],
      state.cards.sort(function(){return 0.5 - Math.random()})
    },
    OPEN_CLOSE_MODAL: (state) => {
      state.modal = !state.modal
    },
    SET_API: (state, payload) => {
      state.api = payload
    },
    SET_CURRENT_CARD: (state, payload) => {
      state.currentCard = payload
    }
  },
  actions: {
    GET_API: async (context, payload) => {
      let {data} = await axios.get(payload.url)
      context.commit('SET_API', data)
      context.commit('SET_CURRENT_CARD', payload.name)
    }
  }
})
