import Vue from "vue"
import Router from "vue-router"
import getPaths from "./paths.js"
import {beforeEachCreator} from "./middleware.js"

Vue.use(Router);

export function createRouter(store, i18n) {
    const router = new Router({
        mode: 'history',
        linkActiveClass: "active",
        linkExactActiveClass: "exact-active",
        routes: getPaths(store)
    });

    /* ======================================== *
     * Middleware:
     *     - Checking language support
     *     - Authentication
     *                                          */
    // <editor-fold desc="Middleware">
    router.beforeEach(beforeEachCreator(i18n, store));
    // </editor-fold>

    return router;
}
