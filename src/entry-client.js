import {createApp} from "./app";

const {app , router , store} = createApp();

import './plugins/vue-smooth-scroll.js'

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    app.$mount('#system');
});

export {app, router, store}
