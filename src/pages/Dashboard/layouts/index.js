import Vue from 'vue'

Vue.component('dashboard-content', () => import('./Content.vue'));
Vue.component('dashboard-footer', () => import('./Footer.vue'));
Vue.component('dashboard-header', () => import('./Header.vue'));
Vue.component('dashboard-navigation', () => import('./Navigation.vue'));
Vue.component('dashboard-sidebar', () => import('./Sidebar.vue'));