import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon} from 'native-base'
import StarRating from 'react-native-star-rating'
import Collapsible from 'Components/Collapsible'
import {formDiscardHandler} from 'Lib/Utils'
import styles from '../../Containers/Settings/styles';
import ContactCollapse from '../../Containers/Settings/CollapseContent/contactInfo'
import SkillsCollapse from '../../Containers/Settings/CollapseContent/skillsInfo'
import LicenseCollapse from '../../Containers/Settings/CollapseContent/licenseInfo'
import OverviewCollapse from '../../Containers/Settings/CollapseContent/overview'
import GalleryCollapse from '../../Containers/Settings/CollapseContent/gallery'
import { Images} from '../../Themes'
import moment from 'moment'

class UserProfileModal extends Component {
  static navigationOptions = {
    header: null
  }

  user = this.props.navigation.getParam('user', {})
  navParams = this.props.navigation.state.params

  render () {
    const user = this.user
    const avatar = user.avatar_path ? {uri: user.avatar_path} : Images.launch

    return (
        <SafeAreaView style={styles.container}>
          <Content onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})} style={styles.mContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.subTitleText, {marginTop: 30}]}>{user.name}</Text>
              <View style={styles.centered}>
                <Image source={avatar} style={styles.logo} />
              </View>
            </View>

            {/*No available information*/}
            <View style={styles.section}>
              <Collapsible
                  items={[
                    {title: 'Contact Info', content: <ContactCollapse user={user} editable={false} />},
                    {title: 'Skills / Trades', content: <SkillsCollapse user={user} editable={false} />},
                    {title: 'License / Certs', content: <LicenseCollapse user={user} editable={false} modal navigation={this.props.navigation}/>},
                    {title: 'Overview', content: <OverviewCollapse user={user} editable={false} />},
                    {title: 'Gallery', content: <GalleryCollapse user={user} editable={false} modal navigation={this.props.navigation}/>}
                  ]}
              />
            </View>

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
            </View>

            <Text style={styles.sectionText}>
              Clientell member since {moment(user.created_at).format('MMMM YYYY')}
            </Text>

            <View style={styles.modalBack}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name='ios-arrow-round-back' style={{fontSize: 40}} />
              </TouchableOpacity>
            </View>
          </Content>
        </SafeAreaView>
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
