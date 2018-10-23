import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: undefined,
    questions: [],
    answers: [],
    },
  mutations: {
    updateLogin(state, payload) {
        state.isLogin = payload;
    },
    updateUserId(state, payload) {
       
        state.userId = payload;
    },
    getQuestions(state, payload) {
        state.questions = payload;
    },
    getAnswers(state, payload) {
        state.answers = payload;
    }
  },
  actions: {
    updateLogin(state, payload) {
        state.commit('updateLogin', payload);
    },

    updateUserId(state, userId) {
        state.commit('updateUserId', userId);
    },

    getUserId(state, payload) {
        axios({
            method: 'get',
            url: `${baseUrl}/profile`,
            headers: {
                'access-token': localStorage.getItem('access-token')
            }
        }).then((result) => {
            
            state.dispatch('updateUserId', result.data._id)
        }).catch((err) => {
            console.log(err);
        });
    },
    
    getQuestions(state, payload) {
        console.log(payload, 'ini payload');
        axios({
            method: 'get',
            url: `${baseUrl}/question`
        }).then((result) => {
            console.log(result.data);
            state.commit('getQuestions', result.data);
        }).catch((err) => {
            console.log(err);
        });
    }/* ,
    getAnswers(state, questionId) {
        axios({
            method: 'get',
            url: `${baseUrl}/answer/${questionId}`,
            headers: {
                'access-token': localStorage.getItem('access-token')
            }
        }).then((result) => {
            
        }).catch((err) => {
            
        });
    } */
  }
})
