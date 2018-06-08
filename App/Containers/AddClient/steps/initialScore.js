import React, { Component } from 'react'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text, Spinner, Icon} from 'native-base'

import StarRating from 'react-native-star-rating'
// Styles
import styles from '../styles'

class RatingStep extends Component {
  state = {
    ...this.props.initialData
  }

  _handleSubmit = () => {
    return {ratingData: this.state.initial_star_rating}
  }

  render () {

    return (
      <View style={{marginTop: 20, marginBottom: 40}}>
        <View style={styles.formUpper}>
          <Icon style={styles.upperIcon} name='ios-list-box-outline' />
          <Text style={styles.upperText} uppercase>Rating</Text>
        </View>

        <View style={[styles.formWrapper, {paddingLeft: 20}]}>
          <Text style={styles.sectionText}>Rate client from 1 (lowest) - 5 (highest)</Text>

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
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.client.addingClient
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(RatingStep)
