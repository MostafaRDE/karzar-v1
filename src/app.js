// Loading important systematical plugins
import Vue from "vue";
import App from "./App.vue";
import {createRouter} from "./router";
import {createStore} from "./store";
import {sync} from "vuex-router-sync";
import i18n from './i18n';

// Loading helpers
import "./helpers";

// Loading internal plugins
import "./plugins";

// Loading Directives
import './directives';

// Loading components and views
import "./components";
import "./pages/layouts";

// mixin for handle title
import titleMixin from "./util/title";
Vue.mixin(titleMixin);

// Loading global styles
import './assets/styles/index.styl';


export function createApp() {
    const store = createStore();
    const router = createRouter(store, i18n);

    sync(store , router);

    const app =  new Vue({
        router,
        store,
        i18n,
        render : h => h(App)
    });

    return {app , store , router};
}
