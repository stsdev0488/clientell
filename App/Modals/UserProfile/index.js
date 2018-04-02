import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Content } from 'native-base'
import moment from 'moment'

import StarRating from 'react-native-star-rating'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from './styles'
import { Images } from 'Themes/'

class UserProfileModal extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  user = this.props.navigation.getParam('user', {})

  render () {
    const user = this.user

    return (
      <View style={styles.container}>
        <Content>
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

        <View style={styles.modalBack}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name='ios-arrow-round-back' style={{fontSize: 40}} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModal)
