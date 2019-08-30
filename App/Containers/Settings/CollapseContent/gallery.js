import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View, Image, Settings} from 'react-native'
import {Button, Text, Spinner} from 'native-base'
import { Images } from 'Themes/'

import GalleryActions from 'Redux/GalleryRedux'

import styles from '../styles'

class GalleryCollapsible extends Component {
  componentDidMount () {
    this.props.fetchImages()
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

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {galleryFetching && <Spinner />}

          {galleryItems.map(img =>
            <Button style={styles.galleryImgWrap} onPress={() => navigation.navigate('PreviewPhotoModal')}>
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
    fetchImages: () => dispatch(GalleryActions.galleryRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryCollapsible)