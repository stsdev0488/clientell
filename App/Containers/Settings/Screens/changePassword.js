import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Text } from 'native-base'

import Input from 'Components/Input'
import ErrorRenderer from 'Components/ErrorRenderer'

// Redux actions
import UserActions from 'Redux/UserRedux'

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
    password: '',
    password_confirmation: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _submit = () => {
    const formData = new FormData()

    formData.append('password', this.state.password)
    formData.append('password_confirmation', this.state.password_confirmation)

    this.props.update(formData)
  }

  render () {
    const { user, saving, error } = this.props

    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Change Password</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>New Password</Text>
          <Input
            bref={ref => this.passwordInput = ref}
            placeholder=''
            secureTextEntry
            onChangeText={password => this.setState({password})}
            onSubmitEditing={() => this.confirmPassInput._root.focus()}
            returnKeyType='next'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Confirm New Password</Text>
          <Input
            bref={ref => this.confirmPassInput = ref}
            placeholder=''
            secureTextEntry
            onChangeText={password_confirmation => this.setState({password_confirmation})}
          />
        </View>

        <View style={styles.section}>
          <ErrorRenderer error={error.errors} />
        </View>

        <View style={styles.section}>
          <Button disabled={saving} primary block bordered onPress={() => this._submit()}>
            <Text>Submit</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Button warning block transparent onPress={() => this.props.navigation.goBack()}>
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
    error: state.user.updateError || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
