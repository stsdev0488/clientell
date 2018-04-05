import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import styles from './styles'
import { Content, List, ListItem, Text, ActionSheet } from 'native-base'
import { Images } from 'Themes/'
import { NavigationActions } from 'react-navigation'

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
          this.props.navigate('Auth')
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
    navigate: (route, data = {}) => dispatch(NavigationActions.navigate({ routeName: route, params: data }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
