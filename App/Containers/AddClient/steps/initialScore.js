import React, { Component } from 'react'
import { View, Keyboard, TextInput } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text, Spinner, Icon} from 'native-base'
import { Images } from 'Themes/'

import moment from 'moment'
import ThumbsRating from 'Components/ThumbsRating'
import StarRating from 'react-native-star-rating'

// Styles
import styles from '../styles'

const charLen = 300
class RatingStep extends Component {
  state = {
    initial_star_rating: 4,
    paymentRating: null,
    characterRating: null,
    repeatRating: null,
    comment: '',
    charRemaining: charLen
  }

  _reset = () => {
    this.setState(state => {
      state = {
        initial_star_rating: 4,
        paymentRating: null,
        characterRating: null,
        repeatRating: null,
        comment: '',
        charRemaining: charLen
      }
      return state
    })
  }

  _handleSubmit = () => {
    let data = {}

    data['review[star_rating]'] = this.state.initial_star_rating
    data['review[payment_rating]'] = this.state.paymentRating
    data['review[character_rating]'] = this.state.characterRating
    data['review[repeat_rating]'] = this.state.repeatRating
    data['review[comment]'] = this.state.comment

    return data
  }

  _onTextChange = (a) => {
    this.props.navigation.setParams({
      formTouched: true,
      sample: this.props.resetForm
    })
    this.setState({...a})
  }

  handleThumbsRating (type, key) {
    let existingVal = this.state[key]
    let newVal = null
    if (type === 'thumbs-up') {
      newVal = existingVal === 'Thumbs up' ? null : 'Thumbs up'
    } else if (type === 'thumbs-down') {
      newVal = existingVal === 'Thumbs down' ? null : 'Thumbs down'
    }
    let newState = {}
    newState[key] = newVal
    this.setState(newState)
  }

  handleCommentField (comment) {
    let charRemaining = charLen - comment.length
    if (charRemaining > -1) {
      this.setState({charRemaining, comment})
    }
  }

  render () {

    return (
      <View style={{marginTop: 20, marginBottom: 40}}>
        <View style={styles.formUpper}>
          <Icon style={styles.upperIcon} name='ios-list-box-outline' />
          <Text style={styles.upperText} uppercase>Review</Text>
        </View>

        <View style={[styles.formWrapper, {paddingLeft: 20}]}>
          <Text style={styles.sectionText}>Rate client from 1 (lowest) - 5 (highest)</Text>

          <View style={styles.sectionCol}>
            <View style={styles.labelBox}>
              <Text style={styles.thumbRateLabel}>{`Rating`.toUpperCase()}</Text>
            </View>
            <StarRating
              starSize={30}
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

          <View style={[styles.sectionCol]}>
            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <Text style={styles.thumbRateLabel}>{`Payment Rating`.toUpperCase()}</Text>
              </View>
              <ThumbsRating
                rate={this.state.paymentRating}
                toggle={type => this.handleThumbsRating(type, 'paymentRating')}
              />
            </View>
          </View>

          <View style={[styles.sectionCol]}>
            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <Text style={styles.thumbRateLabel}>{`Character Rating`.toUpperCase()}</Text>
              </View>

              <ThumbsRating
                rate={this.state.characterRating}
                toggle={type => this.handleThumbsRating(type, 'characterRating')}
              />
            </View>
          </View>

          <View style={[styles.sectionCol]}>
            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <Text style={styles.thumbRateLabel}>{`Repeat Rating`.toUpperCase()}</Text>
              </View>
              <ThumbsRating
                rate={this.state.repeatRating}
                toggle={type => this.handleThumbsRating(type, 'repeatRating')}
              />
            </View>
          </View>

          <View style={[styles.sectionCol, {flexDirection: 'column'}]}>
            <Text style={styles.commentLabel}>{`Enter comment (${this.state.charRemaining} characters remaining)`.toUpperCase()}</Text>

            <TextInput
              multiline
              style={styles.commentField}
              onChangeText={this.handleCommentField.bind(this)}
              value={this.state.comment}
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
