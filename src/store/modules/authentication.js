export default {
    namespaced: true,

    state: {
        // Store devices for send request for forgot
        // If variable is null, then user can't see the page
        devicesForSendRequestForForgot: null,

        // If variable is true, then user can go to "password-reset-link-sent" page
        showingMessagePasswordResetLinkSent: false,

        // If variable is true, then user can go to "verify-email-address" page
        showingVerifyEmail: false,
    },

    mutations: {
        storeDevicesForSendRequestForForgot(state, devices) {
            state.devicesForSendRequestForForgot = devices;
        },
        setMessagePasswordResetLinkSent(state, status) {
            state.showingMessagePasswordResetLinkSent = status;
        },
        setVerifyEmail(state, status) {
            state.showingVerifyEmail = status;
        },
    },
};