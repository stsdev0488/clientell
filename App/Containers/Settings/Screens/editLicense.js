import React, { Component, useState, useRef, useEffect } from 'react'
import { View, Image, Platform, Switch } from 'react-native'
import { connect } from 'react-redux'
import {Content, Item, Icon, Button, Text, Input, Label} from 'native-base'
import SubHeaderBar from 'Components/SubHeaderBar'
import ErrorRenderer from 'Components/ErrorRenderer'
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

const LicenseForm = ({ license = {}, setFormValue, navigation, onRemove, save }) => {
  const licenseNameRef = useRef(null)
  const licenseNumRef = useRef(null)
  const licenseExpireRef = useRef(null)

  const [name, setName] = useState(license.name)
  const [number, setNumber] = useState(license.number)
  const [expiration, setExpiration] = useState(license.expiration)
  const [insured, setInsured] = useState(license.insured)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const formValue = checkLicenseFormValid({
      id: license.id,
      name,
      number,
      expiration,
      insured
    })

    setFormValue(formValue)
  }, [name, number, expiration, insured])

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
          const dd = {uri: response.uri, name: response.fileName, type: mimes.lookup(response.fileName)}
          setPhotos([...photos, dd])
        } else {
          const dd = {
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button style={{marginTop: 10, marginLeft: 10, marginBottom: 10}} small rounded danger onPress={onRemove}>
          <Text>Remove</Text>
        </Button>

        <Button style={{marginTop: 10, marginRight: 10, marginBottom: 10}} small rounded onPress={save}>
          <Text>Save</Text>
        </Button>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionForm}>
          <Item fixedLabel onPress={() => licenseNameRef.current._root.focus()}>
            <Label style={styles.sectionFormText}>License Name</Label>
            <Input
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
            <Button style={styles.galleryImgButton} transparent onPress={() => navigation.navigate('PreviewPhotoModal')}>
              <Image key={i} source={img} style={styles.galleryImgBig} />
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

  state = {
    licenses: []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'License and Certificates',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null),
      rightBtnText: 'New',
      rightBtnPress: () => this._onNewLicense(),
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

  _save = (id) => {
    const found = this.state.licenses.find(a => a.id === id)

    if (found && found.valid) {
      let formData = new FormData()

      formData.append('name', found.name)
      formData.append('number', found.number)
      formData.append('expiration', found.expiration)
      formData.append('insured', found.insured)

      this.props.submitLicense(formData)
    } else {
      this.props.navigation.navigate('AlertModal', {title: `Invalid License`, message: `Please verify that you entered the correct details.`})
    }
  }

  _onNewLicense = () => {
    this.setState(state => {
      state.licenses = [...state.licenses, { id: generateLicenseUUID(), name: '', number: '', expiration: '', insured: false }]

      return state
    })
  }

  _onRemoveLicense = (id) => {
    this.setState(state => {
      state.licenses = state.licenses.filter((a) => a.id !== id)

      return state
    })
  }

  _onSetFormValue = (license) => {
    this.setState(state => {
      let licenses = [...state.licenses]

      licenses.forEach((l, i) => {
        if (l.id === license.id) {
          licenses[i] = license
        }
      })

      state.licenses = licenses
      return state
    })
  }

  render () {
    const { saving, error } = this.props

    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <ErrorRenderer error={error.errors} />
          </View>

          {!this.state.licenses.length &&
            <View style={styles.section}>
              <Text style={{textAlign: 'center'}}>No Existing Licenses / Certificates added, click the <Text style={{fontWeight: 'bold'}}>New</Text> button on header to start adding new licenses / certificates</Text>
            </View>
          }

          {this.state.licenses.map((license) =>
            <LicenseForm
              key={license.id}
              setFormValue={(data) => this._onSetFormValue(data)}
              navigation={this.props.navigation}
              onRemove={() => this._onRemoveLicense(license.id)}
              license={license}
              save={() => this._save(license.id)}
            />
          )}
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.user.updating,
    error: state.user.updateError || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data)),
    submitLicense: (data) => dispatch(LicenseActions.licenseUploadRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
