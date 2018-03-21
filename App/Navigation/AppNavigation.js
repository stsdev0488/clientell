import { StackNavigator, SwitchNavigator } from 'react-navigation'
import SignUpScreen from 'Containers/SignUpScreen'
import LaunchScreen from 'Containers/LaunchScreen'
import ForgotPassword from 'Containers/LaunchScreen/requestPassword'
import AuthenticatedScreens from './AuthenticatedNavigation'
import AuthLoadingScreen from './AuthLoadingScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ForgotPassword: { screen: ForgotPassword },
  SignUpScreen: { screen: SignUpScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.headers
  }
})

const SwitchNav = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AuthenticatedScreens,
    Auth: PrimaryNav
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default SwitchNav
