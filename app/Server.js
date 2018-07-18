import axios from 'axios';

export const server = 'http://192.168.178.248:8090/' //Upload. Must support form-data. Dont use base64

export const downloadServer = server + 'http' //Skip the interface of upload-server and go to storage

/* Server call */
export const api = axios.create({
    baseURL: server, 
    responseType: 'json',
    headers: {
        'Cache-Control': 'no-cache'
    },
    timeout: 5000
});