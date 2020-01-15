import {createApi} from "create-api";

const {axios} = createApi();

const lang = require('../i18n').default.locale;

export function getPrices() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(resolve).catch(reject)
    })
}

// <editor-fold desc="Slider apis">
export function getMainSliderItems() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`sliders/slider-items/HomeMain?lang=${lang}`).then(resolve).catch(reject)
    })
}
// </editor-fold>

// <editor-fold desc="Authentication apis">

// Login api
export function login(email, password) {
    // Create requested data as object
    const data = {
        email, password,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/login?lang=${lang}`, data).then(resolve).catch(reject)
    })
}

// Register api
export function register(email, password, whatsapp_number, refer_code) {
    // Create requested data as object
    const data = {
        email, password, whatsapp_number, refer_code,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/register?lang=${lang}`, data).then(resolve).catch(reject)
    })
}

// <editor-fold desc="Resetting Password apis">

// GetDevicesUser api
export function get_devices_user(username) {
    // Create requested data as object
    const data = {
        username,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/forget/find?lang=${lang}`, data).then(resolve).catch(reject)
    })
}
// SendRequestForRequest api
export function send_request_for_forgot(token) {
    // Create requested data as object
    const data = {
        token,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/forget/send?lang=${lang}`, data).then(resolve).catch(reject)
    })
}
// ChangePasswordByToken api
export function change_password_by_token(token, password) {
    // Create requested data as object
    const data = {
        token,
        password,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.put(`users/password/change?lang=${lang}`, data).then(resolve).catch(reject)
    })
}

// </editor-fold>

// </editor-fold>

export function lastTournament() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`tournaments/pubg/last?lang=${lang}`).then(resolve).catch(reject)
    })
}

export function lastTournamentPlayers(id) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`tournaments/pubg/${id}/players?lang=${lang}`).then(resolve).catch(reject)
    })
}
