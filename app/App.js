/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import storeConfig from './Redux/StoreConfig'
import { Provider } from 'react-redux'

import Container from './Container'

const store = storeConfig();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
