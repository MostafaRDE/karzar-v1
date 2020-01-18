import Vue from "vue"
import Vuex from "vuex"
import modules from './modules'
import {getBalance} from "../api";

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules,

        state : () => ({

            balanceLoading: false,
            balance: 0,

            // Direction variable for set direction design
            dir: 'ltr',

            lang: 'en',

            // Theme variable for set theme design
            theme: 'dark',
            user_auth: false

        }),

        mutations : {

            // "setDirection" mutation-method for update "dir" variable in states
            setDirection(state, dir) {
                state.dir = dir
            },

            // "setTheme" mutation-method for update "theme" variable in states
            setTheme(state, theme) {
                state.theme = theme
            },

            setBalance(state, balance) {
                state.balance = balance
            },

        },

        actions: {
            getBalance({commit, state}) {
                return new Promise((resolve, reject) => {
                    let balance = 0;
                    if (state.user_auth) {
                        state.balanceLoading = true;
                        getBalance()
                            .then(response => {
                                commit('setBalance', response.data.amount);
                                balance = response.data.amount;
                                resolve(response.data.amount);
                            })
                            .catch(error => {
                                reject(error)
                            })
                            .finally(() => {
                                state.balanceLoading = false;
                            });
                    } else {
                        resolve(balance);
                    }
                });
            }
        }
    })
}
