import React from 'react'
import {View, TouchableOpacity, TextInput} from 'react-native'
import {Container, Content, Text as NBText, Button, Icon, ActionSheet} from 'native-base'
import { connect } from 'react-redux'

// Redux actions
import ReviewActions from 'Redux/ReviewRedux'

import HeaderBar from 'Components/HeaderBar'
import DTPicker from 'Components/DTPicker'
import moment from 'moment'
import StarRating from 'react-native-star-rating'
import ThumbsRating from 'Components/ThumbsRating'
// Styles
import {Colors} from 'Themes'
import styles from '../styles'

import { parseClientAddress } from 'Lib/Utils'

const charLen = 300

class clientReview extends React.PureComponent {

  static navigationOptions = {
    tabBarLabel: 'Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-contacts-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  client = this.props.navigation.getParam('client')
  review = this.props.navigation.getParam('review', {})

  state = {
    scrollOffsetY: 0,
    date: this.review.service_date ? moment(this.review.service_date) : new Date(),
    datepickerVisible: false,
    rating: this.review.star_rating || 0,
    paymentRating: this.review.payment_rating || null,
    characterRating: this.review.character_rating || null,
    repeatRating: this.review.repeat_rating || null,
    comment: this.review.comment || '',
    charRemaining: charLen
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching) {
      if (!newProps.error) {
        this.props.navigation.goBack()
      }
    }

    if (this.props.editing && !newProps.editing) {
      if (!newProps.editError) {
        this.props.navigation.goBack()
      }
    }

    if (this.props.deleting && !newProps.deleting) {
      if (!newProps.deleteError) {
        this.props.navigation.goBack()
      } else {
        this.props.navigation.navigate('AlertModal', {title: `Delete review failed`, message: `Please check your internet connection or try again later.`})
      }
    }
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

  _submitReview = () => {
    const { paymentRating, characterRating, repeatRating, comment, date, rating } = this.state

    const data = {
      service_date: moment(date).format('YYYY-MM-DD'),
      star_rating: rating,
      payment_rating: paymentRating,
      character_rating: characterRating,
      repeat_rating: repeatRating,
      comment
    }

    if (!this.review.id) {
      this.props.addReview(this.client.id, data)
    } else {
      this.props.editReview(this.review.id, data)
    }
  }

  _showDeleteConfirm = () => {
    const BUTTONS = ["Delete", "Cancel"]

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: "Delete this review?"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.deleteReview(this.review.id, this.client.id)
        }
      }
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          topTitle={this.reviewId ? 'Edit review for' : 'New review for'}
          title={this.client.name}
          subTitle={parseClientAddress(this.client)}
          rightBtnIcon='ios-trash'
          rightBtnPress={() => this._showDeleteConfirm()}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <Content padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>
          {this._testFragment()}
          <View style={styles.section}>
            <DTPicker
              visible={this.state.datepickerVisible}
              date={this.state.date}
              label="Review date"
              onConfirm={date => this.setState({date, datepickerVisible: false})}
              hide={() => this.setState({datepickerVisible: false})}
              show={() => this.setState({datepickerVisible: true})}
              styles={{ alignSelf: 'center' }}
              inputStyles={{ width: 150 }}
            />
          </View>

          <View style={[styles.section, {marginVertical: 20}]}>
            <NBText style={[styles.formLabel]}>Enter your overall rating:</NBText>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.rating}
              selectedStar={rating => this.setState({rating})}
              fullStarColor='#FFD700'
              emptyStarColor='#D6D6D6'
              containerStyle={{marginTop: 5}}
              buttonStyle={{marginHorizontal: 2}}
            />
          </View>

          <View style={[styles.section, {marginVertical: 20}]}>
            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <NBText style={styles.thumbRateLabel}>Enter Payment</NBText>
                <NBText style={styles.thumbRateLabel}>rating:</NBText>
              </View>
              <ThumbsRating
                rate={this.state.paymentRating}
                toggle={type => this.handleThumbsRating(type, 'paymentRating')}
              />
            </View>

            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <NBText style={styles.thumbRateLabel}>Enter Character</NBText>
                <NBText style={styles.thumbRateLabel}>rating:</NBText>
              </View>
              <ThumbsRating
                rate={this.state.characterRating}
                toggle={type => this.handleThumbsRating(type, 'characterRating')}
              />
            </View>

            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <NBText style={styles.thumbRateLabel}>Enter Repeat</NBText>
                <NBText style={styles.thumbRateLabel}>rating:</NBText>
              </View>
              <ThumbsRating
                rate={this.state.repeatRating}
                toggle={type => this.handleThumbsRating(type, 'repeatRating')}
              />
            </View>
          </View>

          <View style={[styles.section, {marginVertical: 20}]}>
            <NBText style={[styles.formLabel]}>Enter comment ({this.state.charRemaining} characters remaining):</NBText>
            <TextInput
              multiline
              style={styles.commentField}
              onChangeText={this.handleCommentField.bind(this)}
              value={this.state.comment}
            />
          </View>

          <Button disabled={this.props.fetching || this.props.editing} block style={{marginBottom: 30}} onPress={this._submitReview}>
            <NBText>{this.review.id ? 'Edit' : 'Add'} Rating</NBText>
          </Button>

        </Content>
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    fetching: state.review.fetching,
    error: state.review.error,
    editing: state.review.editing,
    editError: state.review.editError,
    deleting: state.review.deleting,
    deleteError: state.review.deleteError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (id, data) => dispatch(ReviewActions.reviewRequest(id, data)),
    editReview: (id, data) => dispatch(ReviewActions.editReview(id, data)),
    deleteReview: (id, clientId) => dispatch(ReviewActions.deleteReview(id, clientId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(clientReview)
