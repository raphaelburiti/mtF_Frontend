import axios from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const apiLocalhost = axios.create({
    // baseURL: 'http://localhost:9999/'
    baseURL: 'https://moretimefreeselenium.herokuapp.com/'
    // baseURL: process.env.REACT_APP_SELENIUM_URL
})

export default apiLocalhost;