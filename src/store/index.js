import Vue from "vue"
import Vuex from "vuex"
import modules from './modules'
import {getBalance, getProfile} from "../api";

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules,

        state : () => ({

            balanceLoading: false,
            balance: 0,

            // Direction variable for set direction design
            dir: 'rtl',

            lang: 'af',

            // Theme variable for set theme design
            theme: 'dark',
            user_auth: false,

            loadingProfile: false,
            profile: null,

        }),

        getters: {
            getProfileImage: (state) => {
                if (state.profile && state.profile.profile_image)
                    return state.profile.profile_image.url_static;
                else
                    return '/public/images/public/pubg-default-profile.svg';
            },
        },

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

            setProfile(state, profile) {
                state.profile = profile
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
            },
            getProfile({commit, state}) {
                return new Promise((resolve, reject) => {
                    let profile = 0;
                    if (state.user_auth) {
                        state.loadingProfile = true;
                        getProfile()
                            .then(response => {
                                commit('setProfile', response.data);
                                profile = response.data;
                                resolve(response.data);
                            })
                            .catch(error => {
                                reject(error)
                            })
                            .finally(() => {
                                state.loadingProfile = false;
                            });
                    } else {
                        resolve(profile);
                    }
                });
            }
        }
    })
}
