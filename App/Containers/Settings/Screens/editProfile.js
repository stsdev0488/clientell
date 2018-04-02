import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import mimes from 'react-native-mime-types'

// Redux actions
import UserActions from 'Redux/UserRedux'

import Input from 'Components/Input'
import Picker from 'Components/Picker'
import Image from 'Components/Image'
import ErrorRenderer from 'Components/ErrorRenderer'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-settings-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  state = {
    first_name: '',
    middle_name: '',
    last_name: '',
    account_type: 'individual',
    company_name: '',
    description: '',
    image: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _submitChanges = () => {
    const formData = new FormData()

    formData.append('first_name', this.state.first_name)
    formData.append('middle_name', this.state.middle_name)
    formData.append('last_name', this.state.last_name)
    formData.append('account_type', this.state.account_type)
    formData.append('company_name', this.state.company_name)
    formData.append('description', this.state.description)

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

          this.setState({image: dd})
        }
      }
    })
  }

  render () {
    const { user, saving, error } = this.props

    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>

        <View style={styles.centered}>
          <TouchableWithoutFeedback onPress={() => this._updateProfilePicture()}>
            <View style={styles.logo}>
              <Image source={this.state.image || Images.launch} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>First name</Text>
          <Input
            defaultValue={user.first_name || ''}
            onChangeText={first_name => this.setState({first_name})}
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Middle name / initial</Text>
          <Input
            defaultValue={user.middle_name || ''}
            onChangeText={middle_name => this.setState({middle_name})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Last name</Text>
          <Input
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
            defaultValue={user.company_name || ''}
            onChangeText={company_name => this.setState({company_name})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Description</Text>
          <Input
            defaultValue={user.description || ''}
            onChangeText={description => this.setState({description})}
          />
        </View>

        <View style={styles.section}>
          <ErrorRenderer error={error} />
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => this._submitChanges()}>
            <Text>Update</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Button disabled={saving} warning block transparent onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </Button>
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data || {},
    saving: state.user.updating,
    error: state.user.updateError || null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
