import React, { Component } from 'react'
import { Text, View, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Fab, ActionSheet } from 'native-base'
import StarRating from 'react-native-star-rating'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'
import Collapsible from 'Components/Collapsible'
import DrawerActions from 'Redux/DrawerRedux'
import {formDiscardHandler} from 'Lib/Utils'
import styles from "../../Containers/Settings/styles";
import ContactCollapse from "../../Containers/Settings/CollapseContent/contactInfo";
import SkillsCollapse from "../../Containers/Settings/CollapseContent/skillsInfo";
import LicenseCollapse from "../../Containers/Settings/CollapseContent/licenseInfo";
import OverviewCollapse from "../../Containers/Settings/CollapseContent/overview";
import GalleryCollapse from "../../Containers/Settings/CollapseContent/gallery";
import moment from "../../Containers/Settings";
import { Images} from '../../Themes'
class UserProfileModal extends Component {
  static navigationOptions = {
    header: null
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  user = this.props.navigation.getParam('user', {})
  navParams = this.props.navigation.state.params


  render () {
    const user = this.user
    return (
        <View style={styles.container}>
          <Content onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})} style={styles.mContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.subTitleText, {marginTop: 30}]}>{this.navParams.person}</Text>
              <View style={styles.centered}>
                <Image source={Images.user} style={styles.logo} />
              </View>
            </View>

            {/*No available information*/}
            <View style={styles.section}>
              <Collapsible
                  items={[
                    {title: 'Contact Info', content: <ContactCollapse/>},
                    {title: 'Skills / Trades', content: <SkillsCollapse  />},
                    {title: 'License / Certs', content: <LicenseCollapse />},
                    {title: 'Overview', content: <OverviewCollapse />},
                    {title: 'Gallery', content: <GalleryCollapse />}
                  ]}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Submitted with 2 reviews
              </Text>
              <Text style={styles.sectionText}>
                With an average rating of:
              </Text>

              <View style={{alignItems: 'center'}}>
                <StarRating
                    disabled
                    starSize={20}
                    maxStars={5}
                    fullStarColor='#FFD700'
                    emptyStarColor='#D6D6D6'
                />
              </View>

              <Text style={styles.sectionText}>
              </Text>
            </View>

            <Text style={styles.sectionText}>
              Clientell member since August 2019
            </Text>

          </Content>
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
