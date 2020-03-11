import axios from 'axios'

const api = axios.create({

    baseURL: process.env.REACT_APP_API_URL
    // baseURL: 'https://moretimefree-backend.herokuapp.com/'
    // baseURL: 'http://189.100.143.108:9999/'
    // baseURL: 'http://localhost:9997/'
    // baseURL: 'https://morning-crag-27342.herokuapp.com/'

})

export default api;