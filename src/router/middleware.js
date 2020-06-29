export function beforeEachCreator(i18n, store) {
    return function beforeEach(to, from, next) {
        // If router is client side
        if (process.browser) {

            // <-- Checking language support -->
            // <editor-fold desc="Checking language support">

            // Get full path to go
            let path = to.fullPath;

            // If first character is forward slash
            if (path[0] === '/')
            // Then remove it with "substr" method from path
                path = path.substr(1);

            // Check path if has any slash or not from first and save index in "firstSlash" variable
            let firstSlash = path.indexOf('/');
            // Check "firstSlash" bigger than 0
            if (firstSlash >= 0)
            // Then remove characters before slash and save result path to path (override it)
                path = path.substr(firstSlash);
            else
            // Else path equals to empty string
                path = "";

            // Check lang site (with parameter from going route)
            // If lang supported by site then go to execute another codes else fix language part of path to "en" language
            switch (to.params.lang) {
                // Supported language by site
                case 'en':
                    // Set site locale (site language)
                    i18n.locale = to.params.lang;
                    break;
                case 'fa':
                    // Set site locale (site language)
                    i18n.locale = to.params.lang;
                    break;

                // Redirect to fix language part of path route
                default:
                    return next(`/fa${path}`);
            }

            // </editor-fold>
            // <-- / Checking language support -->

        }
        // End if router is client side

        // <-- Checking authentication -->
        // <editor-fold desc="Checking authentication">

        // Get state of user-authentication from server or store of vuex
        let {user_auth} = process.browser ? window.__INITIAL_STATE__ : store.state;

        // Check data of "meta"-key of routes
        // If "auth"-key in "meta"-key equals "true"
        if (to.matched.some(record => record.meta.auth === true)) {
            // Then if "user_auth" equals false
            if (!user_auth)
            // Redirect to login route
                return next({name: 'login', params: {lang: to.params.lang}});
        }
        // Else if "auth"-key in "meta"-key equals "false"
        else if (to.matched.some(record => record.meta.auth === false)) {
            // Then if "user_auth" equals true
            if (user_auth)
                // Redirect trade console route
                return next({name: 'dashboardTournaments', params: {lang: to.params.lang}});
        }

        // Else go to route
        return next();

        // </editor-fold>
        // <-- / Checking authentication -->

    }
}
