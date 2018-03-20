import { TabNavigator, StackNavigator } from 'react-navigation';

/**
 * Screens
 */
import Clients from 'Containers/Clients'
import AddClient from 'Containers/AddClient'
import Search from 'Containers/Search'
import Settings from 'Containers/Settings'

/**
 * Modals
 */
import {
  UserProfileModal
} from 'Modals/'

/**
 * Search sub-screens
 */
import SearchByPhone from 'Containers/Search/Screens/phoneSearch'
import SearchByEmail from 'Containers/Search/Screens/emailSearch'
import SearchByNameAddress from 'Containers/Search/Screens/nameAddressSearch'

const SearchStack = StackNavigator({
  Search: { screen: Search },
  PhoneSearch: { screen: SearchByPhone },
  EmailSearch: { screen: SearchByEmail },
  NameAddressSearch: { screen: SearchByNameAddress }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Search'
});

const TabNav = TabNavigator({
  Clients: { screen: Clients },
  AddClient: { screen: AddClient },
  Search: { screen: SearchStack },
  Settings: { screen: Settings }
}, {
  animationEnabled: true
});

export default StackNavigator(
  {
    Main: {
      screen: TabNav
    },
    ProfileModal: {
      screen: UserProfileModal
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);