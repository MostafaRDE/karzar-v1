import {createApp} from "./app";

export default context => {
    return new Promise((resolve, reject) => {
        const { app , router , store } = createApp();


        store.state.user_auth = context.is_auth;
        const {url} = context;

        router.push(url);

        router.onReady(() => {
            const getComponentMatch = router.getMatchedComponents();
            if (router.currentRoute.params.lang) {
                if (!getComponentMatch.length) {
                    return reject({code: 404})
                }
            }

            context.lang = store.state.route.params.lang || 'fa';
            if (context.lang !== 'en' && context.lang !== 'fa')
                context.lang = 'fa';

            switch (context.lang) {
                case 'af':
                case 'ar':
                case 'fa':
                    store.state.dir = 'rtl';
                    break;

                default:
                    store.state.dir = 'ltr';
            }


            Promise.all(getComponentMatch.map(({asyncData}) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then(() => {
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // Expose the state on the render context, and let the request handler
                // inline the state in the HTML response. This allows the client-side
                // store to pick-up the server-side state without having to duplicate
                // the initial data fetching on the client.

                context.state = store.state
                resolve(app)
            }).catch(reject)

        } , reject)
    })
}
