import axios from 'axios'

const apiLocalhost = axios.create({
    baseURL: 'http://localhost:9999/'
    // baseURL: 'http://appselenium.ddns.net:9696/'
})

export default apiLocalhost;