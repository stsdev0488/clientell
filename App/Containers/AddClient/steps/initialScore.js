import React, { Component } from 'react'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text} from 'native-base'

import StarRating from 'react-native-star-rating'
// Styles
import styles from '../styles'

class RatingStep extends Component {
  state = {
    ...this.props.initialData
  }

  render () {

    return (
      <View style={{padding: 20}}>
        <Text style={styles.sectionText}>Rate client from 0 (lowest) - 5 (highest)</Text>

        <View style={styles.section}>
          <StarRating
            starSize={40}
            maxStars={5}
            rating={this.state.initial_star_rating}
            fullStarColor='#FFD700'
            emptyStarColor='#D6D6D6'
            containerStyle={{}}
            selectedStar={(initial_star_rating) => this.setState({initial_star_rating})}
          />
        </View>

        <View style={styles.section}>
          <Button block onPress={() => this.props.submitInfo(this.state.initial_star_rating)}>
            <Text>Submit</Text>
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RatingStep)