import React, { Component, useState, useRef, useEffect } from 'react'
import { View, Image, Platform, Switch } from 'react-native'
import { connect } from 'react-redux'
import {Content, Item, Icon, Button, Text, Input, Label, ActionSheet} from 'native-base'
import SubHeaderBar from 'Components/SubHeaderBar'
import ImagePicker from 'react-native-image-picker'

// Redux actions
import UserActions from 'Redux/UserRedux'
import LicenseActions from 'Redux/LicenseRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'
import mimes from 'react-native-mime-types'
import moment from 'moment'

function generateLicenseUUID () {
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

const checkLicenseFormValid = (data) => {
  let formData = {...data, valid: true}

  if (!formData.name || !formData.number || !formData.expiration) {
    formData.valid = false
  }

  if (formData.expiration) {
    const isCorrect = moment(formData.expiration, 'MM/DD/YYYY', true).isValid()

    if (!isCorrect) {
      formData.valid = false
    }
  }

  return formData
}

const LicenseForm = ({ license = {}, setFormValue, navigation, onRemove, saving }) => {
  const licenseNameRef = useRef(null)
  const licenseNumRef = useRef(null)
  const licenseExpireRef = useRef(null)

  const [name, setName] = useState(license.name)
  const [number, setNumber] = useState(license.number)
  const [expiration, setExpiration] = useState(license.expiration)
  const [insured, setInsured] = useState(license.insured)
  const [photos, setPhotos] = useState(license.photos)

  useEffect(() => {
    const formValue = checkLicenseFormValid({
      id: license.id,
      name,
      number,
      expiration,
      photos,
      insured
    })

    setFormValue(formValue)
  }, [name, number, expiration, insured, photos])

  const _onAddImage = () => {
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
          const dd = {id: generateLicenseUUID(), uri: response.uri, name: response.fileName, type: mimes.lookup(response.fileName)}
          setPhotos([...photos, dd])
        } else {
          const dd = {
            id: generateLicenseUUID(),
            uri: response.uri,
            name: generateLicenseUUID() + '.' + (mimes.extension(mimes.lookup(response.uri))),
            type: mimes.lookup(response.uri)
          }

          setPhotos([...photos, dd])
        }
      }
    })
  }

  return (
    <View style={styles.licenseItem}>
      {!!license.id &&
        <Button style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 10, marginBottom: 10}} small rounded danger onPress={onRemove} disabled={saving}>
          <Text>Remove</Text>
        </Button>
      }

      <View style={styles.section}>
        <View style={styles.sectionForm}>
          <Item fixedLabel onPress={() => licenseNameRef.current._root.focus()}>
            <Label style={styles.sectionFormText}>License Name</Label>
            <Input
              value={name}
              ref={licenseNameRef}
              onChangeText={licenseName => setName(licenseName)}
              required
              style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
            />
          </Item>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionForm}>
          <Item fixedLabel onPress={() => licenseNumRef.current._root.focus()}>
            <Label style={styles.sectionFormText}>License #</Label>
            <Input
              value={number}
              ref={licenseNumRef}
              onChangeText={licenseNum => setNumber(licenseNum)}
              required
              style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
            />
          </Item>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionForm}>
          <Item fixedLabel onPress={() => licenseExpireRef.current._root.focus()}>
            <Label style={styles.sectionFormText}>License Expiration</Label>
            <Input
              value={expiration}
              ref={licenseExpireRef}
              onChangeText={licenseExpiration => setExpiration(licenseExpiration)}
              required
              style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              placeholder={'MM/DD/YYYY'}
            />
          </Item>
        </View>

        <View>
          {!moment(expiration, 'MM/DD/YYYY', true).isValid() && <Text style={[styles.dangerText, {fontSize: 16}]}>Invalid Date</Text>}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionFormText}>Certificates</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 7}}>
          {photos.map((img, i) =>
            <Button
              key={img.id}
              style={styles.galleryImgButton}
              transparent
              onPress={() => navigation.navigate('PreviewPhotoModal')}
              onLongPress={() => {
                ActionSheet.show(
                  {
                    options: ['Delete', 'Cancel'],
                    cancelButtonIndex: 1,
                    destructiveButtonIndex: 0,
                    title: 'Are you sure you want to delete this image?'
                  },
                  async buttonIndex => {
                    if (buttonIndex === 0) {
                      const filteredPhotos = photos.filter(p => p.id !== img.id)
                      setPhotos(filteredPhotos)
                    }
                  }
                )
              }}
            >
              <Image source={{uri: img.url || img.uri}} style={styles.galleryImgBig} />
            </Button>
          )}

          <Button transparent style={[styles.galleryImgButton, {alignItems: 'center', justifyContent: 'center'}]} onPress={_onAddImage}>
            <Icon style={{fontSize: 30}} name={'add'} />
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionForm}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Label style={[styles.sectionFormText, {marginBottom: 0}]}>Are you insured?</Label>
            <Switch value={insured} onChange={() => setInsured(!insured)} />
          </View>
        </View>
      </View>
    </View>
  )
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

  constructor (props) {
    super(props)
    this.eLicense = this.props.navigation.getParam('license', {})

    this.state = {
      license: {
        id: this.eLicense.id,
        name: this.eLicense.name || '',
        number: this.eLicense.number || '',
        expiration: this.eLicense.expiration ? moment(this.eLicense.expiration).format('MM/DD/YYYY') : moment().format('MM/DD/YYYY'),
        insured: !!this.eLicense.is_insured,
        photos: this.eLicense.photos ? this.eLicense.photos.data : []
      }
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'License and Certificates',
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

    if (!this.props.deleting && oldProps.deleting) {
      this.props.navigation.setParams({rightBtnLoading: false})
      if (this.props.deleteError) {
        this.props.navigation.navigate('AlertModal', {title: `Delete failed`, message: `Please check your internet connection or try again later.`})
      } else {
        this.props.navigation.goBack(null)
      }
    }
  }

  _save = () => {
    const found = this.state.license

    if (found && found.valid) {
      let formData = new FormData()

      formData.append('name', found.name)
      formData.append('number', found.number)
      formData.append('expiration', moment(found.expiration).format('YYYY-MM-DD'))
      formData.append('is_insured', found.insured ? 1 : 0)

      if (this.eLicense.id) {
        formData.append('_method', 'put')

        if (found.photos && found.photos.length) {
          found.photos.forEach((photo, i) => {
            if (photo.url) {
              formData.append(`photos[${i}][id]`, photo.id)
            } else {
              formData.append(`photos[${i}][photo]`, photo)
            }
          })
        }
      } else {
        if (found.photos && found.photos.length) {
          found.photos.forEach((photo, i) => {
            formData.append(`photos[${i}][photo]`, photo)
          })
        }
      }

      this.props.navigation.setParams({rightBtnLoading: true})
      this.props.submitLicense(formData, this.eLicense.id)
    } else {
      this.props.navigation.navigate('AlertModal', {title: `Invalid License`, message: `Please verify that you entered the correct details.`})
    }
  }

  _onRemoveLicense = () => {
    if (this.state.license && this.state.license.id) {
      ActionSheet.show(
        {
          options: ['Delete', 'Cancel'],
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          title: 'Are you sure you want to '
        },
        async buttonIndex => {
          if (buttonIndex === 0) {
            this.props.navigation.setParams({rightBtnLoading: false})
            this.props.deleteLicense(this.state.license.id)
          }
        }
      )
    }
  }

  _onSetFormValue = (license) => {
    this.setState(state => {
      state.license = license
      return state
    })
  }

  render () {
    const { saving, error } = this.props
    const { license } = this.state

    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <LicenseForm
            setFormValue={(data) => this._onSetFormValue(data)}
            navigation={this.props.navigation}
            onRemove={() => this._onRemoveLicense()}
            license={license}
            saving={this.props.uploading}
          />
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uploading: state.license.uploading,
    error: state.license.uploadError,
    deleting: state.license.deleting,
    deleteError: state.license.deleteError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data)),
    submitLicense: (data, id) => dispatch(LicenseActions.licenseUploadRequest(data, id)),
    deleteLicense: (id) => dispatch(LicenseActions.licenseDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
