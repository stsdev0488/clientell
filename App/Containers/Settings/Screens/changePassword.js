import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Text } from 'native-base'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'


import Input from 'Components/Input'
import ErrorRenderer from 'Components/ErrorRenderer'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-home-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  user = this.props.navigation.getParam('user')

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
    const { saving, error } = this.props

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
          title={'Change Password'}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
        />

        <Content style={styles.mContainer}>
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
            <Button primary block onPress={() => this._submit()} disabled={saving}>
              <Text>Submit</Text>
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
    error: state.user.updateError || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
