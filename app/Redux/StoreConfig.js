/**
    Connect all components to redux store
    And declare which reducers and actions are used
**/

import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import getImage from './GetImage';

const api = axios.create({
    baseURL:'yourserver', //Must support form-data. Dont use base64
    responseType: 'json',
    headers: {
        'Cache-Control': 'no-cache'
    },
    timeout: 5000
});

const reducers = combineReducers({
    getImage
})

const storeConfig = (initialState) => createStore(
        reducers,
        applyMiddleware(axiosMiddleware(api)),
        initialState
    )

export default storeConfig