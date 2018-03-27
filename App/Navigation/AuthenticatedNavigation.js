import { TabNavigator, StackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native'

/**
 * ---------------------------------------------------------------------------------------
 * TAB SCREENS
 * ---------------------------------------------------------------------------------------
 */
import Clients from 'Containers/Clients'
import AddClient from 'Containers/AddClient'
import Search from 'Containers/Search'
import Settings from 'Containers/Settings'


/**
 * ---------------------------------------------------------------------------------------
 * CLIENTS SUB-SCREENS
 * ---------------------------------------------------------------------------------------
 */
import ClientProfile from 'Containers/Clients/Screens/clientProfile'
import ClientReview from 'Containers/Clients/Screens/clientReview'
const ClientStack = StackNavigator(
  {
    Clients: { screen: Clients },
    ClientProfile: { screen: ClientProfile },
    ClientReview: { screen: ClientReview },
  },
  {
    headerMode: 'none',
  }
);

/**
 * ---------------------------------------------------------------------------------------
 * SEARCH SUB-SCREENS
 * ---------------------------------------------------------------------------------------
 */
import SearchByPhone from 'Containers/Search/Screens/phoneSearch'
import SearchByEmail from 'Containers/Search/Screens/emailSearch'
import SearchByNameAddress from 'Containers/Search/Screens/nameAddressSearch'
import SearchResults from 'Containers/Search/Screens/searchResults'

/**
 * ---------------------------------------------------------------------------------------
 * SETTINGS SUB-SCREENS
 * ---------------------------------------------------------------------------------------
 */
import EditProfile from 'Containers/Settings/Screens/editProfile'
import EditContactInfo from 'Containers/Settings/Screens/editContactInfo'
import ChangePassword from 'Containers/Settings/Screens/changePassword'

/**
 * ---------------------------------------------------------------------------------------
 * MODALS
 * ---------------------------------------------------------------------------------------
 */
import {
  UserProfileModal,
  AlertModal
} from 'Modals/'

/**
 * ---------------------------------------------------------------------------------------
 * SEARCH STACK NAVIGATOR
 * ---------------------------------------------------------------------------------------
 */
const SearchStack = StackNavigator({
  Search: { screen: Search },
  PhoneSearch: { screen: SearchByPhone },
  EmailSearch: { screen: SearchByEmail },
  NameAddressSearch: { screen: SearchByNameAddress },
  SearchResults: { screen: SearchResults }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Search'
});

/**
 * ---------------------------------------------------------------------------------------
 * SETTINGS STACK NAVIGATOR
 * ---------------------------------------------------------------------------------------
 */
const SettingsStack = StackNavigator({
  Settings: { screen: Settings },
  EditProfile: { screen: EditProfile },
  EditMyContactInfo: { screen: EditContactInfo },
  ChangePassword: { screen: ChangePassword }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Settings'
});

/**
 * ---------------------------------------------------------------------------------------
 * MAIN TAB NAVIGATOR
 * ---------------------------------------------------------------------------------------
 */
const TabNav = TabNavigator({
  Clients: { screen: ClientStack },
  AddClient: { screen: AddClient },
  Search: { screen: SearchStack },
  Settings: { screen: SettingsStack }
}, {
  animationEnabled: true,
  tabBarPosition: 'bottom',
  lazy: false,
  swipeEnabled: true
});

/**
 * ---------------------------------------------------------------------------------------
 * ROOT NAVIGATOR FOR TAB AND MODALS
 * ---------------------------------------------------------------------------------------
 */
export default StackNavigator(
  {
    Main: {
      screen: TabNav
    },
    ProfileModal: {
      screen: UserProfileModal
    },
    AlertModal: {
      screen: AlertModal
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    },
    cardStyle: {
      backgroundColor: 'transparent'
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    })
  }
);
