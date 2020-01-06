const axios = require('axios');
const host_url = "http://0.0.0.0:8080/api/v1/";

export function createApi() {
    axios.defaults.baseURL = host_url;
    return { axios }
}
