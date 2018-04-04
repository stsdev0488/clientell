import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Image, View, AsyncStorage } from 'react-native'
import { Images } from 'Themes/'
import { Content, Form, Item, Input, Button, Text, Spinner } from 'native-base'
import ErrorRenderer from 'Components/ErrorRenderer'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

// Redux Actions
import AuthActions from 'Redux/AuthRedux'

// Styles
import styles from './styles'

class LaunchScreen extends Component {
  state = {
    email: '',
    password: ''
  }

  _signIn = async () => {
    const {email, password} = this.state
    if (!email || !password) return

    this.props.login(email, password)
  }

  handleFbLogin = () => {
    this.socialLogin = true
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_birthday']).then(
      (result) => {
        if (result.isCancelled) {
          console.tron.log('Login cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.props.socialLogin(data.accessToken, 'facebook')
            }
          )
        }
        this.socialLogin = false
      },
      (error) => {
        this.socialLogin = false
        console.tron.log('Login fail with error: ' + error)
      }
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Content style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image source={Images.logoWide} style={styles.logo} />
          </View>

          <View style={styles.fbBtnWrapper}>
            <Button
              block
              style={styles.fbBtn}
              onPress={this.handleFbLogin}
              disabled={this.props.fetching}
            >
              {this.props.fetching === true && this.socialLogin && <Spinner color="#fff" />}
              {!this.props.fetching === true && <Text>Sign in with Facebook</Text>}
            </Button>
            <Text style={styles.or}>Or</Text>
          </View>

          <Form style={styles.loginForm}>
            <Item style={styles.loginItem}>
              <Input
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.input}
                value={this.state.email}
                returnKeyType='next'
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.password._root.focus()}
                placeholder='Username or Email'
                keyboardType='email-address'
              />
            </Item>
            <Item style={styles.loginItem}>
              <Input
                secureTextEntry
                style={[styles.input]}
                ref={a => { this.password = a }}
                returnKeyType='go'
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this._signIn}
                placeholder='Password'
              />
            </Item>

            <ErrorRenderer error={this.props.error} />

            <Button disabled={this.props.fetching} block bordered success style={styles.loginButton} onPress={() => this._signIn()}>
              {this.props.fetching === true && <Spinner />}

              <Text>Sign in</Text>
            </Button>

            <Button transparent primary style={[ styles.forgotPassword]} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text>Forgot password?</Text>
            </Button>
          </Form>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.auth.fetching,
    busy: state.auth.busy,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(AuthActions.login(email, password)),
    socialLogin: (accessToken, provider) => dispatch(AuthActions.loginSocial(accessToken, provider))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
