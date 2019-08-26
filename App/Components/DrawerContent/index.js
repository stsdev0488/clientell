import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { View, Image, Platform, AsyncStorage, NativeModules } from 'react-native'
import styles from './styles'
import { Content, List, ListItem, Text, ActionSheet } from 'native-base'
import { Images } from 'Themes/'
import { NavigationActions } from 'react-navigation'

// Redux Actions
import SearchActions from 'Redux/SearchRedux'
import ClientActions from 'Redux/ClientRedux'
import ReviewActions from 'Redux/ReviewRedux'
import UserActions from 'Redux/UserRedux'

class DrawerContent extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _signOut = async () => {
    ActionSheet.show(
      {
        options: ['Log Out', 'Cancel'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: 'Are you sure you want so log out?'
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          await AsyncStorage.clear()

          this.props.clearUser()
          this.props.clearSearches()
          this.props.clearClients()
          this.props.clearReviews()
          this.props.navigate('Auth')

          // delete all contacts directory identities
          if (Platform.OS === 'ios') {
            NativeModules.CallDetection.addContacts([], [])
          } else {
            NativeModules.CallDetection.addContacts([])
          }
        }
      }
    )

  }

  render () {
    return (
      <Content style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={Images.logoWide} style={styles.logo} />
        </View>
        <List>
          <ListItem
            onPress={() => {
              this.props.drawer.closeDrawer()
              this.props.navigate('Settings', {user: this.props.user})
            }}
          >
            <Text>My Profile</Text>
          </ListItem>

          <ListItem
            onPress={() => {
              this.props.drawer.closeDrawer()
              this.props.navigate('Contractors', {user: this.props.user})
            }}
          >
            <Text>Search Contractors</Text>
          </ListItem>

          <ListItem
            onPress={() => {
              this.props.drawer.closeDrawer()
              this.props.navigate('EditProfile', {user: this.props.user})
            }}
          >
              <Text>Edit Profile Info</Text>
          </ListItem>

          <ListItem
            onPress={() => {
              this.props.drawer.closeDrawer()
              this.props.navigate('EditMyContactInfo', {user: this.props.user})
            }}
          >
              <Text>Edit Contact Info</Text>
          </ListItem>

          <ListItem
            onPress={() => {
              this.props.drawer.closeDrawer()
              this.props.navigate('ChangePassword', {user: this.props.user})
            }}
          >
              <Text>Change Password</Text>
          </ListItem>

          <ListItem
            onPress={() => {
              this.props.drawer.closeDrawer()
              this._signOut()
            }}
          >
              <Text>Logout</Text>
          </ListItem>
        </List>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route, data = {}) => dispatch(NavigationActions.navigate({ routeName: route, params: data })),
    clearClients: () => dispatch(ClientActions.clientReset()),
    clearReviews: () => dispatch(ReviewActions.reviewsReset()),
    clearSearches: () => dispatch(SearchActions.searchReset()),
    clearUser: () => dispatch(UserActions.clearUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
