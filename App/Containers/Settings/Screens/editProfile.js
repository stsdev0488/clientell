import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text, Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import mimes from 'react-native-mime-types'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

import Input from 'Components/Input'
import Picker from 'Components/Picker'
import Image from 'Components/Image'
import ErrorRenderer from 'Components/ErrorRenderer'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'home'}
        size={30}
        style={{color: tintColor, fontSize: 35}}
        type='FontAwesome'
      />
    )
  }

  user = this.props.navigation.getParam('user')

  state = {
    first_name: this.user.first_name || '',
    middle_name: this.user.middle_name || '',
    last_name: this.user.last_name || '',
    account_type: this.user.account_type || 'individual',
    company_name: this.user.company_name || '',
    description: this.user.description || '',
    image: this.user.avatar_path ? {uri: this.user.avatar_path} : ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentWillReceiveProps (newProps) {
    if (!newProps.updatingAvatar && this.props.updatingAvatar) {
      if (newProps.userData && newProps.userData.avatar_path) {
        this.setState({image: {uri: newProps.userData.avatar_path}})
      }
    }
  }

  _submitChanges = () => {
    const { user } = this.props
    const formData = new FormData()

    formData.append('first_name', this.state.first_name)
    formData.append('middle_name', this.state.middle_name)
    formData.append('last_name', this.state.last_name)
    formData.append('account_type', this.state.account_type)
    formData.append('company_name', this.state.company_name)
    formData.append('description', this.state.description)

    //Required by the `/api/v1/auth/user/update-profile` api
    formData.append('email', this.user.email)
    formData.append('phone_number', this.user.phone_number)
    formData.append('city', this.user.city)
    formData.append('state', this.user.state)

    this.props.update(formData)
  }

  _updateProfilePicture = () => {
    var options = {
      title: 'Update Photo',
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

          this.setState({image: dd})
        } else {
          const dd = {
            uri: response.uri,
            name: response.fileName || randomstring() + '.' + (mimes.extension(mimes.lookup(response.uri))),
            type: response.fileName ? mimes.lookup(response.fileName) : mimes.lookup(response.uri)
          }

          // this.setState({image: dd})
          const { uri } = response
          const parts = uri.split('/')
          const filename = parts[parts.length - 1]

          const formData = new FormData()
          formData.append('avatar', dd)
          this.props.updateAvatar(formData)
        }
      }
    })
  }

  render () {
    const { saving, error } = this.props
    const user = this.user

    return (
      <View style={styles.container}>
        <HeaderBar
          title={''}
          leftBtnIcon='ios-menu'
          leftBtnPress={() => this.props.openDrawer()}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <View style={[styles.contentUpperBG, {height: '50%'}]} />

        <SubHeaderBar
          title={'Edit Profile'}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
        />

        <Content style={styles.mContainer}>
          <View style={styles.centered}>
            <TouchableWithoutFeedback onPress={() => this._updateProfilePicture()}>
              <View style={styles.logo}>
                <Image source={this.state.image || Images.launch} />
                {this.props.updatingAvatar && <Spinner style={styles.avatarSpinner} color='#000' />}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>First name</Text>
            <Input
              bref={ref => this.fnameInput = ref}
              defaultValue={user.first_name || ''}
              onChangeText={first_name => this.setState({first_name})}
              required
              onSubmitEditing={() => this.mnameInput._root.focus()}
              returnKeyType='next'
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Middle name / initial</Text>
            <Input
              bref={ref => this.mnameInput = ref}
              defaultValue={user.middle_name || ''}
              onChangeText={middle_name => this.setState({middle_name})}
              onSubmitEditing={() => this.lnameInput._root.focus()}
              returnKeyType='next'
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Last name</Text>
            <Input
              bref={ref => this.lnameInput = ref}
              defaultValue={user.last_name || ''}
              onChangeText={last_name => this.setState({last_name})}
              required
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Type</Text>
            <Picker
              defaultValue={this.state.account_type}
              options={['individual', 'company']}
              onSelect={account_type => this.setState({account_type})}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Company name</Text>
            <Input
              bref={ref => this.companyInput = ref}
              defaultValue={user.company_name || ''}
              onChangeText={company_name => this.setState({company_name})}
              onSubmitEditing={() => this.descInput._root.focus()}
              returnKeyType='next'
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Description</Text>
            <Input
              bref={ref => this.descInput = ref}
              defaultValue={user.description || ''}
              onChangeText={description => this.setState({description})}
            />
          </View>

          <View style={styles.section}>
            <ErrorRenderer error={error} />
          </View>

          <View style={styles.section}>
            <Button primary block onPress={() => this._submitChanges()}>
              <Text>Update</Text>
            </Button>
          </View>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.user.updating,
    error: state.user.updateError || null,
    updatingAvatar: state.user.updatingAvatar,
    userData: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data)),
    updateAvatar: data => dispatch(UserActions.avatarUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
