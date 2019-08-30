import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Fab, Card, CardItem } from 'native-base'
import Feedback from 'Components/Feedback'
import AlertMessage from 'Components/AlertMessage'
import SubHeaderBar from 'Components/SubHeaderBar'
import {formDiscardHandler} from 'Lib/Utils'
import DrawerActions from 'Redux/DrawerRedux'
import SearchSkilledContractors from '../../../Components/SearchSkilledContrators'

// Styles
import styles from '../styles'

class Search extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarOnPress: t => formDiscardHandler(navigation, t),
      tabBarLabel: 'Search Reviews',
      tabBarIcon: ({tintColor}) => (
          <Icon
              name={'ios-search'}
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

  navParams = this.props.navigation.state.params

  state = {
    reviews: this.props.navigation.getParam('data', []),
    searchResult: this.navParams.searchKey || this.navParams.textInput,
    displayResult: []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Contractors Search Result',
      subTitle: this.navParams.searchKey,
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={{backgroundColor: 'transparent', marginTop: 10}}>
          {!this.state.reviews.length  &&
            <AlertMessage
                title='You search did not yield any results'
            />
          }

          {
            this.state.reviews.map((item, i) => {
              return (
                <SearchSkilledContractors goTo={(user) => this.props.navigation.navigate('ProfileModal', {user}) } person={item} key={i}/>
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
