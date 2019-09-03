import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text, Label, Input, Item, Form } from 'native-base'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import ErrorRenderer from 'Components/ErrorRenderer'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

class Search extends Component {
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

  user = this.props.navigation.getParam('user')

  state = {
    password: '',
    password_confirmation: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.clearErrors()
    this.props.navigation.setParams({
      title: 'Change Password',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })
  }

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
        <Content style={styles.mContainer}>
          <Form style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.passwordInput._root.focus()}>
                <Label style={styles.sectionFormText}>New Password</Label>
                <Input
                  ref={ref => this.passwordInput = ref}
                  placeholder=''
                  secureTextEntry
                  onChangeText={password => this.setState({password})}
                  onSubmitEditing={() => this.confirmPassInput._root.focus()}
                  returnKeyType='next'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.confirmPassInput._root.focus()}>
                <Label style={styles.sectionFormText}>Confirm New Password</Label>
                <Input
                  ref={ref => this.confirmPassInput = ref}
                  placeholder=''
                  secureTextEntry
                  onChangeText={password_confirmation => this.setState({password_confirmation})}
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.section}>
              <ErrorRenderer error={error.errors} />
            </View>

            <View style={styles.section}>
              <Button primary block onPress={() => this._submit()} disabled={saving}>
                <Text>Submit</Text>
              </Button>
            </View>
          </Form>
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
    clearErrors: () => dispatch(UserActions.clearErrorUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
