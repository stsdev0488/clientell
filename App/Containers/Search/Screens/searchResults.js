import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Fab } from 'native-base'
import Feedback from 'Components/Feedback'
import AlertMessage from 'Components/AlertMessage'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Search Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'search'}
        type="FontAwesome"
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  navParams = this.props.navigation.state.params

  state = {
    reviews: this.navParams.results || []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          title={''}
          leftBtnIcon='ios-menu'
          leftBtnPress={() => this.props.openDrawer()}
        />

        <View style={styles.contentUpperBG} />

        <SubHeaderBar
          title='Search Results'
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
        />

        <Content style={styles.mContainer}>
          {
            this.state.reviews.length < 1 &&
            <AlertMessage
              title='You search did not yield any result'
            />
          }

          {
            this.state.reviews.map((item, i) => {
              return (
                <Feedback key={i} noEdit data={item} />
              )
            })
          }
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
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
