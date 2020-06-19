export default function getPaths(store) {
    return [

        // <-- Redirect to default route with language -->
        // <editor-fold desc="Redirect to default route with language">
        {
            path: '/',
            beforeEnter(to, from, next) {
                return next('/af')
            },
        },
        // </editor-fold>
        // <-- / Redirect to default route with language -->

        // <-- Main route -->
        // <editor-fold desc="Main route">
        {
            path: '/:lang/',
            component: () => import('../pages/Lang.vue'),
            children: [

                // <editor-fold desc="Authentication routes">
                {
                    path: 'login',
                    component: () => import('../pages/Authentication/Login.vue'),
                    name: 'login',
                    meta: {
                        auth: false,
                    },
                },
                {

                    path: 'register',
                    component: () => import('../pages/Authentication/Register.vue'),
                    name: 'register',
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: 'verify-email-address',
                    beforeEnter(to, from, next) {
                        if (store.state.authentication.showingVerifyEmail)
                            return next();
                        else
                            return next('/')
                    },
                    component: () => import('../pages/Authentication/VerifyEmailAddress.vue'),
                    name: 'verifyEmailAddress',
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: 'reset-password',
                    component: () => import('../pages/Authentication/ResetPassword.vue'),
                    name: 'resetPassword',
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: 'device-selecting-for-send-request-for-forgot',
                    beforeEnter(to, from, next) {
                        if (store.state.authentication.devicesForSendRequestForForgot !== null)
                            return next();
                        else
                            return next('/')
                    },
                    component: () => import('../pages/Authentication/DeviceSelectingForSendRequestForForgot.vue'),
                    name: 'deviceSelectingForSendRequestForForgot',
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: 'password-reset-link-sent',
                    beforeEnter(to, from, next) {
                        if (store.state.authentication.showingMessagePasswordResetLinkSent)
                            return next();
                        else
                            return next('/')
                    },
                    component: () => import('../pages/Authentication/SuccessfulMessageForAfterSendingEmailResetPassword.vue'),
                    name: 'passwordResetLinkSent',
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: 'emails/validate/ok',
                    component: () => import('../pages/Authentication/AccountValidationOk.vue'),
                },
                {
                    path: 'emails/validate/expire',
                    component: () => import('../pages/Authentication/AccountValidationExpire.vue'),
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: 'password/',
                    component: () => import('../pages/Authentication/ResetPasswordParent.vue'),
                    children: [
                        {
                            path: 'change',
                            component: () => import('../pages/Authentication/ResetPassword/PasswordChange.vue')
                        },
                        {
                            path: 'password-changed',
                            name: 'passwordChanged',
                            component: () => import('../pages/Authentication/ResetPassword/PasswordChanged.vue')
                        },
                        {
                            path: 'error/ip',
                            component: () => import('../pages/Authentication/ResetPassword/ResetPasswordIp.vue')
                        },
                        {
                            path: 'error/expire',
                            component: () => import('../pages/Authentication/ResetPassword/ResetPasswordExpire.vue')
                        },
                    ],
                    meta: {
                        auth: false,
                    },
                },
                // </editor-fold>

                // <-- Parent of dashboard-pages -->
                // <editor-fold desc="Parent of dashboard-pages">
                {
                    path: 'dashboard/',
                    meta: {auth: true},
                    component: () => import('../pages/Dashboard.vue'),

                    // <-- Dashboard-pages -->
                    // <editor-fold desc="Dashboard-pages">
                    children: [
                        {path: 'tournaments', name: 'dashboardTournaments', component: () => import('../pages/Dashboard/Tournaments.vue')},
                        {path: 'characters', name: 'dashboardCharacters', component: () => import('../pages/Dashboard/Characters.vue')},
                        {path: 'transactions', name: 'dashboardTransactions', component: () => import('../pages/Dashboard/Transactions.vue')},
                        {path: 'account-charging', name: 'dashboardAccountCharging', component: () => import('../pages/Dashboard/AccountCharging.vue')},
                        {path: 'withdraw', name: 'dashboardWithdraw', component: () => import('../pages/Dashboard/Withdraw.vue')},
                        {path: 'tickets', name: 'dashboardTickets', component: () => import('../pages/Dashboard/Tickets.vue')},
                        {path: 'tickets/create', name: 'dashboardAddTicket', component: () => import('../pages/Dashboard/AddTicket.vue')},
                        {path: 'tickets/:id', name: 'dashboardTicketChat', component: () => import('../pages/Dashboard/TicketChats.vue')},
                        {path: 'profile', name: 'dashboardProfile', component: () => import('../pages/Dashboard/Profile.vue')},
                    ],
                    // </editor-fold>
                    // <-- / Dashboard-pages -->
                },
                // </editor-fold>
                // <-- / Parent of dashboard-pages -->

                // <-- Parent of home-pages -->
                // <editor-fold desc="Parent of home-pages">
                {
                    path: '',
                    component: () => import('../pages/Home.vue'),

                    // <-- Home-pages -->
                    // <editor-fold desc="Home-pages">
                    children: [
                        {path: '', name: 'home', component: () => import('../pages/Home/Main.vue')},
                    ]
                    // </editor-fold>
                    // <-- / Home-pages -->
                },
                // </editor-fold>
                // <-- / Parent of home-pages -->

                // <-- Parent of home-pages -->
                // <editor-fold desc="Parent of home-pages">
                {
                    path: '',
                    component: () => import('../pages/Home/HomeParent.vue'),

                    // <-- Home-pages -->
                    // <editor-fold desc="Home-pages">
                    children: [
                        {path: 'shop', name: 'shop', component: () => import('../pages/Home/Shop.vue')},
                        {path: 'tutorials', name: 'tutorials', component: () => import('../pages/Home/Tutorials.vue')},
                        {path: 'about', name: 'about', component: () => import('../pages/Home/About.vue')},
                        {path: 'games/counter-strike', name: 'counterStrike', component: () => import('../pages/Home/Games/CounterStrike.vue')},
                    ]
                    // </editor-fold>
                    // <-- / Home-pages -->
                },
                // </editor-fold>
                // <-- / Parent of home-pages -->

                // <-- Errors-pages -->
                // <editor-fold desc="Errors-pages">

                // 404 error page
                {
                    path: '404',
                    component: () => import('../pages/errors/Error404.vue')
                },
                {
                    path: '*',
                    component: () => import('../pages/errors/Error404.vue')
                },

                // </editor-fold>
                // <-- / Errors-pages -->

            ]
        },
        // </editor-fold>
        // <-- / Main route -->
    ]
}
