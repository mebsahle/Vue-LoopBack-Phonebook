import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
// import snackbars from './modules/snackbars.js';

// load vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
    state : {
        status: '',
        token: localStorage.getItem('accToken') || '',
        snackbar: {},
        user: {},
        currentUser: {}
    },
    
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations : {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state) {
            state.status = '',
            state.token = '',
            state.currentUser = '',
            window.localStorage.currentUser = JSON.stringify({});
        },
        SET_SNACKBAR(state, snackbar) {
            state.snackbar = snackbar;
        },
        SET_CURRENT_USER(state, usr) {
            state.currentUser = usr;
            window.localStorage.currentUser = JSON.stringify(usr);
        }
    },
    actions : {
        setSnackbar({commit}, snackbar) {
            snackbar.showing = true;
            snackbar.color = snackbar.color || 'success'
            commit('SET_SNACKBAR', snackbar);
        },
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('http://localhost:3000/api/users/login', user)
                .then(response => {
                    console.log(response)
                    const token = response.data.id
                    localStorage.setItem('accToken', token)
                    
                    //find user id
                    var userID = response.data.userId
                    // get current username of logged in user
                    axios.get('http://localhost:3000/api/users/'+userID)
                    .then(response => {
                     var usr = response.data.username
                     console.log(usr);
                     commit('SET_CURRENT_USER', usr)
                    })
                    commit('auth_success', token, user)
                    
                    resolve(response)
                })
                .catch(err => {
                    const err_message = err.response.data.error.message;
                    console.log(err.response.data.error.message)
                    this.$store.dispatch('setSnackbar',{
                      // message : 'Please, check your email or password.',
                      message: err_message.toUpperCase(),
                      color: 'error'
                    });
                    commit('auth_error')
                    localStorage.removeItem('accToken')
                    reject(err)
                });
            });
        },
        loadCurrentUser({commit}){
            let user = JSON.parse(window.localStorage.currentUser);
            commit('SET_CURRENT_USER', user)
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('accToken')
                resolve()
            })
        }
    }
    
    // export default: {
    //     state,
    //     getters,
    //     actions,
    //     mutations
    // }
});