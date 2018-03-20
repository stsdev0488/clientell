import { StackNavigator, SwitchNavigator } from 'react-navigation'
import SignUpScreen from '../Containers/SignUpScreen'
import LaunchScreen from 'Containers/LaunchScreen'
import AuthenticatedScreens from './AuthenticatedNavigation'
import AuthLoadingScreen from './AuthLoadingScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
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
