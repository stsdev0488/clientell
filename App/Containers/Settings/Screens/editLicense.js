import React, { Component } from 'react'
import {ScrollView, View, Image, Platform, Switch} from 'react-native'
import { connect } from 'react-redux'
import {Content, Item, Icon, Button, Text, CheckBox, Body as NBody, ListItem, Input, Label, Form} from 'native-base'
import SubHeaderBar from 'Components/SubHeaderBar'
import ErrorRenderer from 'Components/ErrorRenderer'
import { SKILLS } from '../../../Lib/Utils'
import ImagePicker from 'react-native-image-picker'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'
import mimes from "react-native-mime-types";


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
    photos: [],
    licenseNum: '',
    licenseExpiration: ''
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
      rightBtnText: 'Save',
      rightBtnPress: () => this.props.navigation.goBack(null),
    })
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
            name: response.fileName || randomstring() + '.' + (mimes.extension(mimes.lookup(response.uri))),
            type: response.fileName ? mimes.lookup(response.fileName) : mimes.lookup(response.uri)
          }

          this.setState(state => {
            state.photos = [...state.photos, dd]
            return state
          })
        }
      }
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

          <View style={styles.section}>
            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.license._root.focus()}>
                <Label style={styles.sectionFormText}>License #</Label>
                <Input
                  ref={ref => this.license = ref}
                  onChangeText={licenseNum => this.setState({licenseNum})}
                  required
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.license._root.focus()}>
                <Label style={styles.sectionFormText}>License Expiration</Label>
                <Input
                  ref={ref => this.licenseExpiration = ref}
                  onChangeText={licenseExpiration => this.setState({licenseExpiration})}
                  required
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                  placeholder={'MM/DD/YYYY'}
                />
              </Item>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionFormText}>Certificates</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 7}}>
              {this.state.photos.map((img, i) =>
                <Button style={styles.galleryImgButton} transparent onPress={() => this.props.navigation.navigate('PreviewPhotoModal')}>
                  <Image key={i} source={img} style={styles.galleryImgBig} />
                </Button>
              )}

              <Button transparent style={[styles.galleryImgButton, {alignItems: 'center', justifyContent: 'center'}]} onPress={this._onAddImage}>
                <Icon style={{fontSize: 30}} name={'add'} />
              </Button>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionForm}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Label style={[styles.sectionFormText, {marginBottom: 0}]}>Are you insured?</Label>
                <Switch value={false} />
              </View>
            </View>
          </View>
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
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
