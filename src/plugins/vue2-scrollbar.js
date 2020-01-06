import Vue from 'vue'

// Add plugin to vue
Vue.use(() => import('vue2-scrollbar'));

// Add component to vue
Vue.component('vue-scrollbar', () => import('vue2-scrollbar'));