import axios from 'axios';

const server = 'http://10.15.200.131:8090' //Must support form-data. Dont use base64

/* Server call */
export const api = axios.create({
    baseURL: server, 
    responseType: 'json',
    headers: {
        'Cache-Control': 'no-cache'
    },
    timeout: 5000
});