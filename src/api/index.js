import {createApi} from "create-api";

const {axios} = createApi();

const lang = () => require('../i18n').default.locale;

export const itemsPerPage = 10;

export function getPrices() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(resolve).catch(reject)
    })
}

export function getBalance() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`/users/balance?lang=${lang()}`).then(resolve).catch(reject)
    })
}

export function getProfile() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`/users/get/me?lang=${lang()}`).then(resolve).catch(reject)
    })
}

export function updateProfile(name, mobile_number, profile_image = null) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('mobile_number', mobile_number);
        formData.append('profile_image', profile_image);
        axios.put(`/users/update-profile?lang=${lang()}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(resolve).catch(reject)
    })
}

export function updatePassword(current_password, new_password) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let data = {current_password, new_password};
        axios.put(`/users/update-password?lang=${lang()}`, data).then(resolve).catch(reject)
    })
}

// <editor-fold desc="Slider apis">
export function getMainSliderItems() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`sliders/slider-items/HomeMain?lang=${lang()}`).then(resolve).catch(reject)
    })
}
// </editor-fold>

// <editor-fold desc="Authentication apis">

// Login api
export function login(email, password, g_recaptcha_response) {
    // Create requested data as object
    const data = {
        email, password, 'g-recaptcha-response': g_recaptcha_response,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/login?lang=${lang()}`, data).then(resolve).catch(reject)
    })
}

// Register api
export function register(email, password, mobile_number, player_id, player_name, refer_code, g_recaptcha_response) {
    // Create requested data as object
    const data = {
        email, password, mobile_number, player_id, player_name, refer_code, 'g-recaptcha-response': g_recaptcha_response,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/register?lang=${lang()}`, data).then(resolve).catch(reject)
    })
}

// <editor-fold desc="Resetting Password apis">

// GetDevicesUser api
export function get_devices_user(username, g_recaptcha_response) {
    // Create requested data as object
    const data = {
        username, 'g-recaptcha-response': g_recaptcha_response,
    };

    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.post(`users/forget/find?lang=${lang()}`, data).then(resolve).catch(reject)
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
        axios.post(`users/forget/send?lang=${lang()}`, data).then(resolve).catch(reject)
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
        axios.put(`users/password/change?lang=${lang()}`, data).then(resolve).catch(reject)
    })
}

// </editor-fold>

// </editor-fold>

// <editor-fold desc="Tournaments">

export function runningTournaments() {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`tournaments/pubg/running?lang=${lang()}`).then(resolve).catch(reject)
    })
}

export function tournamentPlayers(id) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        axios.get(`tournaments/pubg/${id}/players?lang=${lang()}`).then(resolve).catch(reject)
    })
}

export function characters(character, cancelToken, tournament_id) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let options = {};
        if (cancelToken) {
            options['cancelToken'] = cancelToken
        }
        let query = `?lang=${lang()}`;
        if (character)
            query += `&character=${character}`;
        if (tournament_id)
            query += `&tournament_id=${tournament_id}`;

        axios.get(`tournaments/pubg/characters${query}`, options).then(resolve).catch(reject)
    })
}

export function storeCharacter(id, name) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let query = `?lang=${lang()}`,
            data = {id, name};

        axios.post(`tournaments/pubg/characters${query}`, data).then(resolve).catch(reject)
    })
}

export function updateCharacter({id, name, newId}) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let query = `?lang=${lang()}`,
            data = {name, id: newId};

        axios.put(`tournaments/pubg/characters/${id}${query}`, data).then(resolve).catch(reject)
    })
}

export function top10(days) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let query = `?lang=${lang()}`;
        if (days)
            query += `&days=${days}`;

        axios.get(`tournaments/pubg/top-10${query}`).then(resolve).catch(reject)
    })
}

export function enterToTheTournament(id, characters) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let data = {characters};

        axios.post(`tournaments/pubg/${id}/enter?lang=${lang()}`, data).then(resolve).catch(reject)
    })
}

export function games_played(page = null, size = itemsPerPage) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        if (page)
            url += `&page=${page}&size=${size}`;
        axios.get(`tournaments/pubg/played?${url}`).then(resolve).catch(reject)
    })
}

export function myTournaments(page = null, size = itemsPerPage) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        if (page)
            url += `&page=${page}&size=${size}`;
        axios.get(`tournaments/pubg/my-tours?${url}`).then(resolve).catch(reject)
    })
}

export function myTransactions(page = null, size = itemsPerPage) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        if (page)
            url += `&page=${page}&size=${size}`;
        axios.get(`payments/transactions?${url}`).then(resolve).catch(reject)
    })
}

export function gateways(type) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        axios.get(`payments/gateways/${type}?${url}`).then(resolve).catch(reject)
    })
}

export function addTransaction(amount, gateway_id, in_order_to, type, data, file = null) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        let formData = new FormData();
        formData.append('amount', amount);
        formData.append('gateway_id', gateway_id);
        formData.append('in_order_to', in_order_to);
        formData.append('type', type);
        formData.append('file', file);
        formData.append('data', data);
        axios.post(`payments/transactions?${url}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(resolve).catch(reject)
    })
}

// </editor-fold>

export function tutorials(page, size = itemsPerPage) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        if (page)
            url += `&page=${page}&size=${size}`;
        axios.get(`tutorials?${url}`).then(resolve).catch(reject)
    })
}

export function sendContactMessage(name, email, message, g_recaptcha_response) {
    // Create request as "Promise" and returned it
    return new Promise((resolve, reject) => {
        let url = `lang=${lang()}`;
        let data = {name, email, message, 'g-recaptcha-response': g_recaptcha_response};
        axios.post(`public/contact?${url}`, data).then(resolve).catch(reject)
    })
}
