import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import UserActions from '../Redux/UserRedux'
import {connect} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@LoginStore:token')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.getAuthUser()

    // hide splashscreen
    SplashScreen.hide()

    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

// export default AuthLoadingScreen
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: () => dispatch(UserActions.userRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
