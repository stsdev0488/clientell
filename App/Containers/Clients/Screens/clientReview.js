import React from 'react'
import {View, TouchableOpacity, TextInput} from 'react-native'
import {Container, Content, Text as NBText, Button, Icon} from 'native-base'
import { connect } from 'react-redux'

import HeaderBar from '../../../Components/HeaderBar'
import DTPicker from '../../../Components/DTPicker'
import moment from 'moment'
import StarRating from 'react-native-star-rating'
import ThumbsRating from '../../../Components/ThumbsRating'
// Styles
import {Colors} from '../../../Themes'
import styles from '../styles'

const charLen = 4

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

  state = {
    scrollOffsetY: 0,
    date: new Date(),
    datepickerVisible: false,
    rating: 0,
    paymentRating: null,
    characterRating: null,
    repeatRating: null,
    comment: '',
    charRemaining: charLen
  }
  reviewId = this.props.navigation.getParam('id', 0)
  clientName = this.props.navigation.getParam('clientName', 'Client')
  clientAddress = this.props.navigation.getParam('clientAddress')

  renderDatePicker () {
    return (
      <View style={[styles.section, styles.inlineField]}>
        <NBText style={styles.datePickerLabel}>Review date</NBText>
        <PickerComp
          style={{width: 150, marginLeft: 10}}
          date={this.state.date}
          mode="date"
          placeholder="Select date"
          format={dateFormat}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginRight: 37,
              borderColor: Colors.steel
            },
            dateText: {
              fontSize: 16
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
    )
  }

  handleThumbsRating (type, key) {
    let existingVal = this.state[key]
    let newVal = null
    if (type === 'thumbs-up') {
      newVal = existingVal === 1 ? null : 1
    } else if (type === 'thumbs-down') {
      newVal = existingVal === 0 ? null : 0
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
      <View style={styles.container}>
        <HeaderBar
          topTitle={this.reviewId ? 'Edit review for' : 'New review for'}
          title={this.clientName}
          subTitle={this.clientAddress}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <Content padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>

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

          <Button block style={{marginBottom: 30}}>
            <NBText>{this.reviewId ? 'Edit' : 'Add'} Rating</NBText>
          </Button>

        </Content>
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(clientReview)
