import React, { Component } from 'react'
import { Text, View, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Fab, ActionSheet } from 'native-base'
import StarRating from 'react-native-star-rating'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from './styles'
import { Images } from 'Themes/'
import moment from 'moment'
import {Call, Email, Text as SMSText, Web, Twitter, Facebook} from 'react-native-openanything'

class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'home'}
        size={30}
        style={{color: tintColor, fontSize: 35}}
        type='FontAwesome'
      />
    )
  }

  state = {
    menuActive: false,
    scrollOffsetY: 0
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
        <HeaderBar
          title={''}
          leftBtnIcon='ios-menu'
          leftBtnPress={() => this.props.openDrawer()}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <View style={[styles.contentUpperBG, {height: '50%'}]} />

        <SubHeaderBar
          title={user.name}
        />

        <View style={styles.centered}>
          <Image source={avatar} style={styles.logo} />
        </View>

        <Content onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})} style={styles.mContainer}>
          <View style={styles.section}>
            {user.company_name && <Text style={styles.subTitleText}>{user.company_name}</Text>}

            <Text style={styles.sectionText}>{`${user.city || ''}${user.state ? ', ' : ''}${user.state || ''} ${user.postal_code || ''}`}</Text>
            <Text style={styles.sectionText}>{`${user.street_address || ''} ${user.street_address2 || ''}`}</Text>
            {user.phone_number && <Text style={styles.sectionText}>{user.phone_number}</Text>}
            {user.business_url && <Text style={styles.sectionText}>{user.business_url}</Text>}
            <Text style={styles.sectionText}>{user.email || ''}</Text>
          </View>

          <View style={[styles.section, styles.contactIcons, {justifyContent: 'center'}]}>
            {
              user.phone_number &&
              <TouchableOpacity onPress={() => { Call(user.phone_number).catch(err => console.tron.log(err)) }}>
                <Icon name='md-call' style={styles.contactIcon} />
              </TouchableOpacity>
            }

            {
              user.phone_number &&
              <TouchableOpacity onPress={() => { SMSText(user.phone_number).catch(err => console.tron.log(err)) }}>
                <Icon name='md-text' style={styles.contactIcon} />
              </TouchableOpacity>
            }

            {
              user.email &&
              <TouchableOpacity onPress={() => { Email(user.email).catch(err => console.tron.log(err)) }}>
                <Icon name='md-mail' style={styles.contactIcon} />
              </TouchableOpacity>
            }

            {
              user.business_url &&
              <TouchableOpacity onPress={() => { Web(user.business_url).catch(err => console.tron.log(err)) }}>
                <Icon name='md-globe' style={styles.contactIcon} />
              </TouchableOpacity>
            }
          </View>

          <View style={[styles.section, styles.contactIcons, {justifyContent: 'center'}]}>
            {
              user.facebook_url &&
              <TouchableOpacity onPress={() => { Web(user.facebook_url).catch(err => console.tron.log(err)) }}>
                <Icon name='logo-facebook' style={styles.contactIcon} />
              </TouchableOpacity>
            }

            {
              user.twitter_url &&
              <TouchableOpacity onPress={() => { Web(user.twitter_url).catch(err => console.tron.log(err)) }}>
                <Icon name='logo-twitter' style={styles.contactIcon} />
              </TouchableOpacity>
            }
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
              Submitted {user.reviews_submitted || 0} review{user.reviews_submitted !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.sectionText}>
              With an average rating of:
            </Text>

            <View style={{alignItems: 'center'}}>
              <StarRating
                disabled
                starSize={20}
                maxStars={5}
                rating={parseFloat(user.reviews_submitted_average) || 0}
                fullStarColor='#FFD700'
                emptyStarColor='#D6D6D6'
              />
            </View>

            <Text style={styles.sectionText}>
              Clientell member since {moment(user.created_at).format('MMMM YYYY')}
            </Text>
          </View>
        </Content>
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
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
