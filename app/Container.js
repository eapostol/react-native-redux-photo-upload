import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import  {   View,
            Image,
        } from 'react-native';

import PhotoUpload from './PhotoUpload'

import { connect } from 'react-redux';
import {
            getThumbList,
            setThumbSource
        } from './Redux/GetImage';

import { downloadServer } from './Server'


/**
    Mapping the redux state (imported in the storeConfig)
    into this.props
**/
const mapStateToProps = state => {
    return { 
        thumbList: state.getImage.thumbList,
        thumbSource: state.getImage.thumbSource,
        errorText: state.getImage.errorText
    }
}

/**
    Mapping dispatch (calls to redux actions) as this component's props
    this.props.myActions
**/

const mapDispatchToProps = dispatch => {
    return {
        getThumbList: (i) => dispatch(getThumbList(i)),
        setThumbSource: (filename) => dispatch(setThumbSource(filename)),
    }
}

class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pickers: 4,
            thumbDefault: require('./Assets/upload-placeholder.png'),
        };
    };

    componentDidMount() {
        /**
            Go through the server and get image name. 
            Then store in redux store for global access
            TODO:   Store the list on local. 
                    If list empty or new photo uploaded, ask server
                    on error -> retry
        **/
        for (let i = 0; i <= this.state.pickers - 1; i++) {
            this.props.getThumbList(i)
            .then((response) => {
                console.log('Found photo: ' + response.payload.data._data.name)
                this.props.setThumbSource(downloadServer+response.payload.data._data.name)
            })
            .catch((error) => {
                console.log(this.props.errorText)
                this.props.setThumbSource(null)
            })
        }
    }

    setThumbUri = (i) => {
        if (this.props.thumbSource[i]) {
            return {uri: this.props.thumbSource[i]}
        }
        return this.state.thumbDefault
    }

    renderImagePicker = (i) => {
        return (
            <PhotoUpload 
                key={i} 
                position={i}>
                <Image
                    style={styles.profileImage}
                    resizeMode='cover'
                    source={this.setThumbUri(i)}
                />
            </PhotoUpload>
        )
    }

    render() {

        return(
            <View>
                <View style={{flexDirection: "row", marginTop: 50}}>
                    {Array(this.state.pickers).fill(1).map((el, i) =>
                        this.renderImagePicker(i)
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 8
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Container);