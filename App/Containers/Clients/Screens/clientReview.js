import React from 'react'
import {View, TouchableOpacity, TextInput, Image} from 'react-native'
import {Container, Content, Text as NBText, Button, Icon, ActionSheet,Spinner} from 'native-base'
import { connect } from 'react-redux'
import {formDiscardHandler} from 'Lib/Utils'

// Redux actions
import ReviewActions from 'Redux/ReviewRedux'
import DrawerActions from 'Redux/DrawerRedux'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'
import DTPicker from 'Components/DTPicker'
import moment from 'moment'
import StarRating from 'react-native-star-rating'
import ThumbsRating from 'Components/ThumbsRating'
// Styles
import {Colors, Images} from 'Themes'
import styles from '../styles'

import { parseClientAddress } from 'Lib/Utils'

const charLen = 300

class clientReview extends React.PureComponent {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarOnPress: t => formDiscardHandler(navigation, t),
      tabBarLabel: params.unreviewed ? 'Unreviewed' : 'My Clients',
      tabBarIcon: ({tintColor}) => {
        if (params.unreviewed) {
          return (
            <View style={{flexDirection: 'row'}}>
              <Icon
                name={'ios-people'}
                style={{color: tintColor, fontSize: 30, alignSelf: 'center'}}
              />
              <NBText style={{color: tintColor, fontSize: 20, alignSelf: 'center'}}>?</NBText>
            </View>
          )
        } else {
          return (
            <Icon
              name={'ios-people'}
              style={{color: tintColor, fontSize: 30}}
            />
          )
        }
      },
      header: () => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  client = this.props.navigation.getParam('client')
  review = this.props.navigation.getParam('review', {})

  state = {
    scrollOffsetY: 0,
    date: this.review.service_date ? moment(this.review.service_date) : new Date(),
    datepickerVisible: false,
    rating: this.review.star_rating || 1,
    paymentRating: this.review.payment_rating || null,
    characterRating: this.review.character_rating || null,
    repeatRating: this.review.repeat_rating || null,
    comment: this.review.comment || '',
    charRemaining: charLen
  }

  componentDidMount = () => {
    const deleteReviewBtn = this.review.id ? {
      rightBtnIcon: 'ios-trash',
      rightBtnPress: () => this._showDeleteConfirm()
    } : {}

    this.props.navigation.setParams({
      title: this.review.id ? 'Edit Review' : 'New Review',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null),
      ...deleteReviewBtn
    })
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

  renderClientHeader = () => {
    return (
      <View style={{textAlign: 'center', alignItems: 'center', marginBottom: 25}}>
        <Image source={Images.user} style={styles.topContentImage} />
        <NBText uppercase style={styles.upperContentText}>
          {this.client.display_name}
        </NBText>
        <NBText style={styles.ratingText}>{parseClientAddress(this.client).toUpperCase()}</NBText>
      </View>
    )
  }

  render () {
    const deleteReviewBtn = this.review.id ? {
      rightBtnIcon: 'ios-trash',
      rightBtnPress: () => this._showDeleteConfirm()
    } : {}

    return (
      <View style={styles.container}>
        <Content extraHeight={120} padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})} style={styles.mContainer}>
          {this.renderClientHeader()}

          <View style={[styles.sectionCol]}>
            <NBText style={[styles.formLabel]}>{`Overall rating`.toUpperCase()}</NBText>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={35}
              rating={this.state.rating}
              selectedStar={rating => this.setState({rating})}
              emptyStar={Images.starGrey}
              fullStar={Images.star}
              halfStar={Images.starHalf}
              starStyle={{marginRight: 2}}
              containerStyle={{marginTop: 5}}
              buttonStyle={{marginHorizontal: 2}}
            />
          </View>

          <View style={styles.sectionCol}>
            <DTPicker
              visible={this.state.datepickerVisible}
              date={this.state.date}
              label={"Review date".toUpperCase()}
              onConfirm={date => this.setState({date, datepickerVisible: false})}
              hide={() => this.setState({datepickerVisible: false})}
              show={() => this.setState({datepickerVisible: true})}
              styles={{ alignSelf: 'center', justifyContent: 'space-between', flex: 1 }}
              inputStyles={{ width: 150 }}
              datePickerProps={{
                maximumDate: new Date()
              }}
            />
          </View>

          <View style={[styles.sectionCol]}>
            <View style={[styles.inlineField, styles.thumbRating]}>
              <View style={styles.labelBox}>
                <NBText style={styles.thumbRateLabel}>{`Payment Rating`.toUpperCase()}</NBText>
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
                <NBText style={styles.thumbRateLabel}>{`Character Rating`.toUpperCase()}</NBText>
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
                <NBText style={styles.thumbRateLabel}>{`Repeat Rating`.toUpperCase()}</NBText>
              </View>
              <ThumbsRating
                rate={this.state.repeatRating}
                toggle={type => this.handleThumbsRating(type, 'repeatRating')}
              />
            </View>
          </View>

          <View style={[styles.sectionCol, {flexDirection: 'column'}]}>
            <NBText style={[styles.formLabel, {alignSelf: 'flex-start', fontWeight: 'bold'}]}>{`Enter comment (${this.state.charRemaining} characters remaining)`.toUpperCase()}</NBText>
            <TextInput
              multiline
              style={styles.commentField}
              onChangeText={this.handleCommentField.bind(this)}
              value={this.state.comment}
            />
          </View>

          <Button primary disabled={this.props.fetching || this.props.editing} block style={[{marginBottom: 30}]} onPress={this._submitReview}>
            {this.props.fetching === true || this.props.editing ? <Spinner /> : null}
            <NBText>{this.review.id ? 'Save Changes' : 'Add Review'}</NBText>
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
    deleteReview: (id, clientId) => dispatch(ReviewActions.deleteReview(id, clientId)),
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(clientReview)
