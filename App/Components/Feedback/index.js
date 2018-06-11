import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import {Button, Text as NBText, Icon} from 'native-base'
import styles from './styles'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'
import { Images } from 'Themes/'

class Feedback extends Component {
  static propTypes = {
    data: PropTypes.object,
    noEdit: PropTypes.bool
  }

  renderLeftCol () {
    const {data} = this.props
    const user = data.user.data || data.user
    const client = data.client.data || data.client

    return (
      <View style={styles.left}>
        <NBText style={styles.basicData}>{client.first_name} {client.last_name}, {client.city} {client.state}</NBText>

        <StarRating
          disabled
          starSize={20}
          maxStars={5}
          rating={data.star_rating}
          emptyStar={Images.starGrey}
          fullStar={Images.star}
          halfStar={Images.starHalf}
          starStyle={{marginRight: 3}}
          containerStyle={{width: 100}}
        />
      </View>
    )
  }

  renderAuthorBtn (userName, client, review) {
    if (userName === 'You') {
      if (!this.props.noEdit) {
        return (
          <Button small style={styles.appButton} onPress={() => this.props.navigate('ClientReview', {client, review})}>
            <NBText>Edit Review</NBText>
          </Button>
        )
      }
    } else {
      return (
        <Button small style={styles.appButton} onPress={() => this.props.navigate('ProfileModal', {user: review.user})}>
          <NBText>Reviewer's Profile</NBText>
        </Button>
      )
    }
  }

  renderRateItem (rate, label) {
    let addTheme = {}
    let icon = <Icon name='ios-remove' style={styles.rateIcon} />
    if (rate === 'Thumbs down') {
      icon = <Icon name='ios-thumbs-down' style={[styles.rateIcon, styles.thumbsDown]} />
      addTheme.danger = true
    }
    else if (rate === 'Thumbs up') {
      icon = <Icon name='ios-thumbs-up' style={[styles.rateIcon, styles.thumbsUp]} />
      addTheme.success = true
    }

    return (
      <Button rounded bordered iconLeft small {...addTheme}>
        {icon}
        <NBText style={styles.rateLabel}>{label}</NBText>
      </Button>
    )
  }

  renderRightCol () {
    const {data} = this.props
    const user = data.user.data || data.user
    const client = data.client.data || data.client
    const name = this.props.currentUser.id === this.props.data.user_id ? 'You' : user.name

    return (
      <View style={styles.right}>
        <NBText style={styles.date}>{moment(data.created_at).format('MM/DD/YYYY')}</NBText>
        <View style={styles.authorBox}>
          <NBText uppercase style={styles.author}>By <NBText uppercase style={styles.authorName}>{name}</NBText></NBText>
        </View>
      </View>
    )
  }

  renderRatings () {
    const {data} = this.props
    return (
      <View style={styles.ratings}>
        {this.renderRateItem(data.payment_rating, 'Payment')}
        {this.renderRateItem(data.character_rating, 'Character')}
        {this.renderRateItem(data.repeat_rating, 'Repeat')}
      </View>
    )
  }

  render () {
    const {data} = this.props
    const user = data.user.data || data.user
    const client = data.client.data || data.client

    const name = this.props.currentUser.id === this.props.data.user_id ? 'You' : user.name

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.header}>
          {this.renderLeftCol()}
          {this.renderRightCol()}
        </View>

        {this.renderRatings()}


        <NBText style={styles.feedback}>{data.comment}</NBText>

        {this.renderAuthorBtn(name, client, data)}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route, data = {}) => dispatch(NavigationActions.navigate({ routeName: route, params: data }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
