import axios from 'axios'

const apiLocalhost = axios.create({
    // baseURL: 'http://localhost:9999/'
    baseURL: process.env.REACT_APP_SELENIUM_URL
})

export default apiLocalhost;