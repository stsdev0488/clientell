import React, { Component } from 'react'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text, Spinner, Icon} from 'native-base'
import { Images } from 'Themes/'

import StarRating from 'react-native-star-rating'
// Styles
import styles from '../styles'

class RatingStep extends Component {
  state = {
    ...this.props.initialData
  }

  _reset = () => {
    this.setState(state => {
      state = {
        initial_star_rating: 4
      }
      return state
    })
  }

  _handleSubmit = () => {
    return {initial_star_rating: this.state.initial_star_rating}
  }

  _onTextChange = (a) => {
    this.props.navigation.setParams({
      formTouched: true,
      sample: this.props.resetForm
    })
    this.setState({...a})
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
              containerStyle={{}}
              selectedStar={(initial_star_rating) => this._onTextChange({initial_star_rating})}
              emptyStar={Images.starGrey}
              fullStar={Images.star}
              halfStar={Images.starHalf}
              starStyle={{marginRight: 3}}
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
