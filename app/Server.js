import axios from 'axios';

export const server = 'http://192.168.178.248:8080' //Must support form-data. Dont use base64

/* Server call */
export const api = axios.create({
    baseURL: server, 
    responseType: 'json',
    headers: {
        'Cache-Control': 'no-cache'
    },
    timeout: 5000
});