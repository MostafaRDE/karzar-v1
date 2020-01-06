import Vue from 'vue'

// Public components
Vue.component('global-footer', () => import('./Footer.vue'));
Vue.component('global-header', () => import('./Header.vue'));
Vue.component('global-navigation', () => import('./Navigation.vue'));

// Parts layouts
import '../Dashboard/layouts'
import '../Home/layouts'
