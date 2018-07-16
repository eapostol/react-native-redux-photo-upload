/**
    Handles picking and uploading images
    TODO:
    - On thumb click, open the full image to edit headline or delete
    - Security, users ID and token
**/

import React, { Component } from 'react'
import { connect } from 'react-redux';

import PropTypes from 'prop-types'

import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'

import { api } from './Server'

import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import {
            getThumbList,
            setThumbSource
        } from './Redux/GetImage';

/**
    Hooking up with the redux store
    that has the list of img uri
**/

const mapStateToProps = state => {
    return { 
        thumbSource: state.getImage.thumbSource,
        errorText: state.getImage.errorText
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getThumbList: () => dispatch(getThumbList()),
        setThumbSource: (list) => dispatch(setThumbSource(list))
    }
}

class PhotoUpload extends Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        position: PropTypes.number,
        containerStyle: PropTypes.object,
        photoPickerTitle: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        format: PropTypes.string,
        quality: PropTypes.number,
    }

    state = {
        originUri: null,
        thumbUri: null,
        position: this.props.position,
        height: this.props.height || 300,
        width: this.props.width || 300,
        format: this.props.format || 'JPEG',
        quality: this.props.quality || 80
    }

    options = {
        noData: true,
        title: this.props.pickerTitle || 'Select Photo',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    }

    openImagePicker = () => {

        // get image from image picker
        ImagePicker.showImagePicker(this.options, async response => {

            this.setState({
                originUri: response.uri
            })

            if (response.didCancel) {
                console.log('User cancelled image picker')
                return
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
                return
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
                return
            }

            //Post the photo with position which it was selected
            const photo = new FormData();
            // data.append('authToken', 'secret');
            photo.append('photo', {
                uri: this.state.originUri,
                type: 'image/jpeg',
                name: 'p-'+this.state.position+'.jpg'
            });

            let { height, width, quality, format, originUri } = this.state

            // Resize and post the thumb
            const resizedImageUri = await ImageResizer.createResizedImage(
                originUri,
                height,
                width,
                format,
                quality
            ).then(({uri}) => {
                photo.append('thumb', {
                    uri: uri,
                    type: 'image/jpeg',
                    name: 't-'+this.state.position+'.jpg'
                });
                this.uploadPicture(photo);
            })
        })
    }

    uploadPicture = (photo) => {
        /**
            Post the profile pic and thumbnail using axios (in api.js)
            TODO:   Store thumbs and thumblist locally.
                    API path. Security and token. Retry on error
        **/

        // api.post('/image/'+this.state.position, photo)
        api.post('', photo)
        .then(function (response) {
            // Handle success
            console.log(response);
        })
        .then(() => {
            // Get thumbnail and replace the placeholder
            this.props.getThumbList()
            .then((response) => {
                this.props.setThumbSource(response.payload.data)
                this.setState({thumbUri: {uri: this.props.thumbSource[this.state.position]}})
            })
            .catch((error) => {
                console.log(this.props.errorText)
            })
        })
        .catch((error) => {
            // Handle error
            console.log(this.props.errorText)
        })
    }

    renderChildren = props => {

        return React.Children.map(props.children, child => {

            if (this.state.thumbUri) {
                return React.cloneElement(child, {
                    source: this.state.thumbUri
                })
            }
            return child

        })
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <TouchableOpacity onPress={this.openImagePicker}>
                    {this.renderChildren(this.props)}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUpload)
