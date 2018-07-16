/**
    Connect all components to redux store
    And declare which reducers, middlewares and actions are used
**/

import { createStore, applyMiddleware, combineReducers } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import getImage from './GetImage';
import { api } from '../Server';

const reducers = combineReducers({
    getImage
})

const storeConfig = (initialState) => createStore(
        reducers,
        applyMiddleware(axiosMiddleware(api)),
        initialState
    )

export default storeConfig