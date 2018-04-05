import React, { Component } from 'react'
import { Text, View, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Fab, ActionSheet } from 'native-base'
import StarRating from 'react-native-star-rating'
import hoistNonReactStatics from 'hoist-non-react-statics'

import withDrawer from 'Components/Drawer'

// Styles
import styles from './styles'
import { Images } from 'Themes/'
import moment from 'moment'

class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-settings-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  state = {
    menuActive: false
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
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
          await AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
        }
      }
    )

  }

  render () {
    const {user} = this.props
    const avatar = user.avatar_path ? {uri: user.avatar_path} : Images.launch
    return (
      <View style={styles.container}>
        <Content style={{flex: 1}}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Profile</Text>
          </View>

          <View style={styles.centered}>
            <Image source={avatar} style={styles.logo} />
          </View>

          <View style={styles.section}>
            <Text style={styles.subTitleText}>{user.name}</Text>
            {user.company_name && <Text style={styles.subTitleText}>{user.company_name}</Text>}

            <Text style={styles.sectionText}>{`${user.city || ''}${user.state ? ', ' : ''}${user.state || ''} ${user.postal_code || ''}`}</Text>
            <Text style={styles.sectionText}>{`${user.street_address || ''} ${user.street_address2 || ''}`}</Text>
            {user.phone_number && <Text style={styles.sectionText}>{user.phone_number}</Text>}
            {user.business_url && <Text style={styles.sectionText}>{user.business_url}</Text>}
            <Text style={styles.sectionText}>{user.email || ''}</Text>
          </View>

          <View style={[styles.section, styles.contactIcons]}>
            <TouchableOpacity onPress={() => {}}>
              <Icon name='md-call' style={styles.contactIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Icon name='md-text' style={styles.contactIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Icon name='md-mail' style={styles.contactIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Icon name='md-globe' style={styles.contactIcon} />
            </TouchableOpacity>
          </View>

          <View style={[styles.section, styles.contactIcons, {justifyContent: 'center'}]}>
            <TouchableOpacity onPress={() => {}}>
              <Icon name='logo-facebook' style={styles.contactIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Icon name='logo-twitter' style={styles.contactIcon} />
            </TouchableOpacity>
          </View>

          {
            user.desciption &&
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                ${user.desciption}
              </Text>
            </View>
          }

          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Submitted 90 reviews
            </Text>
            <Text style={styles.sectionText}>
              With an average rating of:
            </Text>

            <View style={{alignItems: 'center'}}>
              <StarRating
                disabled
                starSize={20}
                maxStars={5}
                rating={3}
                fullStarColor='#FFD700'
                emptyStarColor='#D6D6D6'
              />
            </View>

            <Text style={styles.sectionText}>
              Clientell member since {moment(user.created_at).format('MMMM YYYY')}
            </Text>
          </View>
        </Content>

        <Fab
          active={this.state.menuActive}
          direction="down"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="topLeft"
          onPress={() => this.props.drawer.openDrawer()}>
          <Icon name="ios-menu-outline" />
          
        </Fab>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    fetching: state.user.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const FScreen = hoistNonReactStatics(withDrawer(Settings), Settings)

export default connect(mapStateToProps, mapDispatchToProps)(FScreen)
