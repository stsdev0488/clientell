import React, { Component } from 'react'
import { View, Image, Platform, AsyncStorage, NativeModules} from 'react-native'
import { connect } from 'react-redux'
import {Content, Icon, Button, ActionSheet} from 'native-base'
import SubHeaderBar from 'Components/SubHeaderBar'
import ImagePicker from 'react-native-image-picker'

// Redux actions
import UserActions from 'Redux/UserRedux'
import GalleryActions from 'Redux/GalleryRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'
import mimes from "react-native-mime-types";

function generateGalleryUUID () {
  var d = new Date().getTime()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

class Gallery extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'ios-home'}
          size={20}
          style={{color: tintColor, fontSize: 25}}
        />
      ),
      header: (a) => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  state = {
    photos: []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Gallery',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null),
      rightBtnText: 'Save',
      rightBtnPress: () => this._save(),
    })
  }

  componentDidUpdate (oldProps) {
    if (!this.props.uploading && oldProps.uploading) {
      this.props.navigation.setParams({rightBtnLoading: false})
      if (this.props.error) {
        this.props.navigation.navigate('AlertModal', {title: `Upload failed`, message: `Please check your internet connection or try again later.`})
      } else {
        this.props.navigation.goBack(null)
      }
    }
  }

  _save = () => {
    if (!this.state.photos.length) {
      return
    }

    let formData = new FormData()

    this.state.photos.forEach(photo => {
      formData.append('photos[]', photo)
    })

    this.props.navigation.setParams({rightBtnLoading: true})

    this.props.uploadImages(formData)
  }

  _onAddImage = () => {
    var options = {
      title: 'Update Work Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      quality: 0.8,
      maxWidth: 640,
      maxHeight: 320
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // cancelled handler
      } else if (response.error) {
        // error handler
      } else {
        if (Platform.OS === 'android') {
          const dd = {uri: response.uri, name: response.fileName, type: mimes.lookup(response.fileName)}

          this.setState(state => {
            state.photos = [...state.photos, dd]
            return state
          })
        } else {
          const dd = {
            uri: response.uri,
            name: generateGalleryUUID() + '.' + (mimes.extension(mimes.lookup(response.uri))),
            type: mimes.lookup(response.uri)
          }

          this.setState(state => {
            state.photos = [...state.photos, dd]
            return state
          })
        }
      }
    })
  }

  _deleteViaApi = (id) => {
    ActionSheet.show(
      {
        options: ['Delete', 'Cancel'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: 'Are you sure you want to delete this image?'
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          this.props.deleteImage(id)
        }
      }
    )
  }

  _deleteUpload = () => {

  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {this.props.images.map((img, i) =>
                <Button
                  style={styles.galleryImgButton}
                  transparent
                  onPress={() => this.props.navigation.navigate('PreviewPhotoModal')}
                  onLongPress={() => this._deleteViaApi(img.id)}
                >
                  <Image key={i} source={{uri: img.url}} style={styles.galleryImgBig} />
                </Button>
              )}

              {this.state.photos.map((img, i) =>
                <Button
                  style={styles.galleryImgButton}
                  transparent
                  onPress={() => this.props.navigation.navigate('PreviewPhotoModal')}
                  onLongPress={() => this._deleteUpload(img)}
                >
                  <Image key={i} source={img} style={styles.galleryImgBig} />
                </Button>
              )}

              <Button transparent style={[styles.galleryImgButton, {alignItems: 'center', justifyContent: 'center'}]} onPress={this._onAddImage}>
                <Icon style={{fontSize: 30}} name={'add'} />
              </Button>
            </View>
          </View>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uploading: state.gallery.uploading,
    error: state.gallery.uploadError,
    images: state.gallery.data || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data)),
    uploadImages: (data) => dispatch(GalleryActions.galleryUploadRequest(data)),
    deleteImage: (data) => dispatch(GalleryActions.galleryDeleteRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
