import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View, Image, Settings} from 'react-native'
import {Button, Text, Spinner} from 'native-base'
import { Images } from 'Themes/'

import GalleryActions from 'Redux/GalleryRedux'

import styles from '../styles'

class GalleryCollapsible extends Component {
  componentDidMount () {
    if (this.props.modal) {
      this.props.fetchImages({
        user_id: this.props.user.id
      })
    } else {
      this.props.fetchImages()
    }
  }

  render () {
    const {navigation, editable, galleryItems, galleryFetching} = this.props

    return (
      <View style={styles.section}>
        {editable &&
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditGallery', {images: galleryItems})}>
              <Text>Edit</Text>
            </Button>
          </View>
        }

        {galleryFetching && <Spinner />}

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {galleryItems.map(img =>
            <Button style={styles.galleryImgWrap} onPress={() => navigation.navigate('PreviewPhotoModal', {image: {uri: img.url}})}>
              <Image source={{uri: img.url}} style={styles.galleryImg} />
            </Button>
          )}
        </View>
      </View>
    )
  }
}

GalleryCollapsible.defaultProps = {
  editable: true
}

const mapStateToProps = (state) => {
  return {
    galleryFetching: state.gallery.fetching,
    galleryItems: state.gallery.data || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: (data = {}) => dispatch(GalleryActions.galleryRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryCollapsible)