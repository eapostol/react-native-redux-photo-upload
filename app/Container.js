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

import { api, server } from './Server'


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
            thumbDefault: require('./Assets/upload-placeholder.png'),
            thumbList: [],
            thumbUri: {}, //cant be null or get an property of type null error
        };
    };

    componentDidMount() {
        /**
            Iniatiate the image list on component mount
            TODO:   Store the list on local. 
                    If list empty or new photo uploaded, ask server
                    on error -> retry
        **/
        for (var i = 0; i <= 3; i++) {
            this.props.getThumbList(i)
            .then((response) => {
                console.log(response)
                this.props.setThumbSource(response.payload.data._data.name)
                this.setState({ thumbUri: this.props.thumbSource})
            })
            .catch((error) => {
                console.log('Photo ' + i + this.props.errorText)
            })
        }
        // this.props.getThumbList()
        //     .then((response) => {
        //         this.props.setThumbSource(response.payload.data)
        //         this.setState({ thumbUri: this.props.thumbSource})
        //     })
        //     .catch((error) => {
        //         console.log(this.props.errorText)
        //         console.log(error)
        //     })
        // this.getThumbs()

        // for (var i = 0; i <= 3; i++) {
        //     this.getThumbs(i)
        // }
    }

    getThumbs = (i) => {
        api.get('/t-'+[i]+'.jpg', {
            responseType: 'blob'
        })
        .then((response) => {
            console.log(response)
            let url = server+'/t-'+[i]+'.jpg'
            this.setState({
                thumbList: [...this.state.thumbList, url]
            })
        })
        .catch((error) => {
            console.log(error)
            return this.state.thumbDefault
        })
    }

    setThumbUri = (i) => {
        if (this.state.thumbUri[i]) {
            return {uri: server+'/t-'+[this.state.thumbUri[i]]+'.jpg'}
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
                    {Array(4).fill(1).map((el, i) =>
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