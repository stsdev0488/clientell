import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Fab } from 'native-base'
import Feedback from 'Components/Feedback'
import AlertMessage from 'Components/AlertMessage'

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
        <Content>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Search Results</Text>
            <Text style={styles.subTitleText}>{ this.navParams.searchKey || 'Client' }</Text>
          </View>

          {
            this.state.reviews.length < 1 &&
            <AlertMessage
              title='You search did not yield any result'
            />
          }

          {
            this.state.reviews.map((item, i) => {
              return (
                <Feedback key={i} data={item} />
              )
            })
          }
        </Content>

        <Fab
          active={this.state.menuActive}
          direction="down"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="topLeft"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
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
