import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Fab } from 'native-base'
import Feedback from 'Components/Feedback'
import AlertMessage from 'Components/AlertMessage'
import HeaderBar from 'Components/HeaderBar'

// Styles
import styles from '../styles'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Search Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-search-outline'}
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
          title={'Search Results'}
          subTitle={ this.navParams.searchKey || 'Client' }
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
        />

        <Content>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
