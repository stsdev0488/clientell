import React, { Component } from 'react'
import { Text, View, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Fab, ActionSheet } from 'native-base'
import StarRating from 'react-native-star-rating'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from './styles'
import { Images } from 'Themes/'
import moment from 'moment'
import {Call, Email, Text as SMSText, Web, Twitter, Facebook} from 'react-native-openanything'

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
    if (user) {
      console.tron.log(user)
    }
    return (
      <View style={styles.container}>
        <Content style={{flex: 1}}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Profile</Text>
          </View>

          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
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
          position="topRight"
          onPress={() => this.setState({menuActive: !this.state.menuActive})}>
          <Icon name="ios-menu-outline" />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('EditProfile', {user: this.props.user})}>
            <Icon name="md-create" />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('EditMyContactInfo', {user: this.props.user})}>
            <Icon name="md-globe" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.props.navigation.navigate('ChangePassword', {user: this.props.user})}>
            <Icon name="ios-lock" />
          </Button>
          <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this._signOut()}>
            <Icon name="ios-power" />
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
