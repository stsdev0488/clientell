import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Easing, Animated, Platform } from 'react-native'
import Header from 'Components/SubHeaderBar'

/**
 * ---------------------------------------------------------------------------------------
 * TAB SCREENS
 * ---------------------------------------------------------------------------------------
 */
import Clients from 'Containers/Clients'
import AddClient from 'Containers/AddClient'
import Search from 'Containers/Search'
import Settings from 'Containers/Settings'
import Unreviewed from 'Containers/Clients/unreviewed'
import Contractors from 'Containers/Contractors'

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
    ClientEditProfile: { screen: AddClient }
  },
  {
    headerMode: 'none',
  }
);

/**
 * ---------------------------------------------------------------------------------------
 * UNREVIEWED CLIENTS SUB-SCREENS
 * ---------------------------------------------------------------------------------------
 */
const UnreviewedStack = StackNavigator(
  {
    Unreviewed: { screen: Unreviewed },
    UnreviewedProfile: { screen: ClientProfile },
    UnreviewedReview: { screen: ClientReview },
    UnreviewedEditProfile: { screen: AddClient }
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
import PostSignUp from 'Containers/Settings/Screens/postSignup'

/**
 * ---------------------------------------------------------------------------------------
 * CONTRACTORS SUB-SCREENS
 * ---------------------------------------------------------------------------------------
 */
import ContractorSearchResults from 'Containers/Search/Screens/searchResults'

/**
 * ---------------------------------------------------------------------------------------
 * MODALS
 * ---------------------------------------------------------------------------------------
 */
import {
  UserProfileModal,
  AlertModal,
  SearchModal,
  CallDirectoryModal
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
  ChangePassword: { screen: ChangePassword },
  PostSignUp: { screen: PostSignUp }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Settings'
});

/**
 * ---------------------------------------------------------------------------------------
 * SETTINGS STACK NAVIGATOR
 * ---------------------------------------------------------------------------------------
 */
const ContractorsStack = StackNavigator({
  Contractors: { screen: Contractors },
  ContractorSearchResults: { screen: ContractorSearchResults }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Contractors'
});

/**
 * ---------------------------------------------------------------------------------------
 * MAIN TAB NAVIGATOR
 * ---------------------------------------------------------------------------------------
 */
const TabNav = TabNavigator({
  Search: { screen: SearchStack },
  Clients: { screen: ClientStack },
  AddClient: { screen: AddClient },
  Unreviewed: { screen: UnreviewedStack }
}, {
  ...TabNavigator.Presets.iOSBottomTabs,
  animationEnabled: Platform.OS === 'ios',
  tabBarPosition: 'bottom',
  lazy: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#37b2ea',
    inactiveTintColor: '#4b515f',
    style: {
      height:60,
      borderWidth: 0,
      backgroundColor: '#fff',
      shadowColor: '#ddd',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.8,
      elevation: -4
    },
    tabStyle: {
      justifyContent: 'space-around',
    },
    labelStyle: {
      marginBottom: 7
    },
    iconStyle: {}
  }
});


const StackedApp = StackNavigator({
  MainStack: { screen: TabNav },
  Settings: { screen: Settings },
  EditProfile: { screen: EditProfile },
  EditMyContactInfo: { screen: EditContactInfo },
  ChangePassword: { screen: ChangePassword },
  PostSignUp: { screen: PostSignUp },
  Contractors: { screen: ContractorsStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainStack'
});

/**
 * ---------------------------------------------------------------------------------------
 * ROOT NAVIGATOR FOR TAB AND MODALS
 * ---------------------------------------------------------------------------------------
 */
export default StackNavigator(
  {
    Main: {
      screen: StackedApp
    },
    ProfileModal: {
      screen: UserProfileModal
    },
    AlertModal: {
      screen: AlertModal
    },
    SearchModal: {
      screen: SearchModal
    },
    CallDirectoryModal: {
      screen: CallDirectoryModal
    },
  },
  {
    mode: 'modal',
    navigationOptions: {
      title: 'Clientell',
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
