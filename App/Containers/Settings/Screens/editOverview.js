import React, { Component } from 'react'
import {ScrollView, View, Image, Platform, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { Content, Item, Icon, Button, Text, CheckBox, Body as NBody, ListItem, Input} from 'native-base'
import SubHeaderBar from 'Components/SubHeaderBar'
import ErrorRenderer from 'Components/ErrorRenderer'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'


class Gallery extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'ios-home'}
          size={20}
          style={{color: tintColor, fontSize: 25}}
        />
      ),
      header: (a) => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  state = {
    overview: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Overview',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null),
      rightBtnText: 'Save',
      rightBtnPress: () => this.props.navigation.goBack(null),
    })
  }

  handleCommentField = (overview) => {
    this.setState({overview})
  }

  render () {
    const { saving, error } = this.props

    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <ErrorRenderer error={error.errors} />
          </View>

          <View style={styles.section}>
            <View style={[styles.sectionCol, {flexDirection: 'column'}]}>
              <Text style={styles.commentLabel}  onPress={() => this.overview.focus()}>
                Description of your business
              </Text>

              <TextInput
                ref={r => this.overview = r}
                multiline
                style={styles.commentField}
                onChangeText={this.handleCommentField.bind(this)}
                value={this.state.overview}
              />
            </View>
          </View>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.user.updating,
    error: state.user.updateError || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
