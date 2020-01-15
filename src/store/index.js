import Vue from "vue"
import Vuex from "vuex"
import modules from './modules'

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules,

        state : () => ({

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

        }
    })
}
