import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'
import Feedback from 'Components/Feedback'

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

  state = {
    reviews: [
      {
        userName: 'You',
        rating: 3,
        created: new Date(),
        payment: 1,
        character: 1,
        repeat: 0,
        feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        userName: 'Bill Gates',
        rating: 4,
        created: new Date(),
        payment: 1,
        character: null,
        repeat: null,
        feedback: 'Very accomodating!'
      },
      {
        userName: 'Steve Jobs',
        rating: 5,
        created: new Date(),
        payment: 1,
        character: 1,
        repeat: 1,
        feedback: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }
    ]
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Search Results</Text>
          <Text style={styles.subTitleText}>john.doe@email.com</Text>
        </View>

          {
            this.state.reviews.map((item, i) => {
              return (
                <Feedback key={i} data={item} />
              )
            })
          }
      </Content>
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
