const axios = require('axios');
const host_url = process.env.SERVER_URL;

export function createApi() {
    axios.defaults.baseURL = host_url;
    return { axios }
}
