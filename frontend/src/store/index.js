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
        snackbar: {}
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
            state.token = ''
        },
        SET_SNACKBAR(state, snackbar) {
            state.snackbar = snackbar;
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
                    commit('auth_success', token, user)
                    resolve(response)
                })
                .catch(err => {
                    // const err_message = err.response.data.error.message;
                    // console.log(typeof(err.response.data.error.message))
                    // this.$store.dispatch('setSnackbar',{
                    //   // message : 'Please, check your email or password.',
                    //   message: err_message.toUpperCase(),
                    //   color: 'error'
                    // });
                    commit('auth_error')
                    localStorage.removeItem('accToken')
                    reject(err)
                })
            
            })
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

    // state: {
    //     snackbar: {showing: true, text: "Testing"}
    // },
    // modules: {
    //     snackbars
    // }
});