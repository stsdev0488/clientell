import { StackNavigator } from 'react-navigation'
import LaunchScreen from 'Containers/LaunchScreen'
import AuthenticatedScreens from './AuthenticatedNavigation'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  AuthenticatedScreen: { screen: AuthenticatedScreens }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.headers
  }
})

export default PrimaryNav
