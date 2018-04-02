import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import {Button, Text as NBText, Icon} from 'native-base'
import styles from './styles'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'

class Feedback extends Component {
  static propTypes = {
    data: PropTypes.object,
    noEdit: PropTypes.bool
  }

  renderLeftCol () {
    const {data} = this.props
    const user = data.user.data || data.user
    const client = data.client.data || data.client

    const name = this.props.currentUser.id === this.props.data.user_id ? 'You' : user.name

    return (
      <View style={styles.left}>
        <NBText style={styles.date}>{moment(data.created_at).format('MM/DD/YYYY')}</NBText>
        <StarRating
          disabled
          starSize={20}
          maxStars={5}
          rating={data.star_rating}
          fullStarColor='#FFD700'
          emptyStarColor='#D6D6D6'
          containerStyle={{width: 100}}
        />
        <View style={styles.authorBox}>
          <NBText style={styles.author}>By <NBText style={styles.authorName}>{name}</NBText></NBText>
          {this.renderAuthorBtn(name, client, data)}
        </View>
      </View>
    )
  }

  renderAuthorBtn (userName, client, review) {
    if (userName === 'You') {
      if (!this.props.noEdit) {
        return (
          <Button transparent small style={styles.authorBtn} onPress={() => this.props.navigate('ClientReview', {client, review})}>
            <Icon name='ios-create-outline' style={styles.authorBtnIcon} />
          </Button>
        )
      }
    } else {
      return (
        <Button transparent small style={styles.authorBtn} onPress={() => this.props.navigate('ProfileModal', {user: review.user})}>
          <Icon name='ios-eye' style={styles.authorBtnIcon} />
        </Button>
      )
    }
  }

  renderRateItem (rate, label) {
    let icon = <Icon name='ios-remove' style={styles.rateIcon} />
    if (rate === 'Thumbs down') {
      icon = <Icon name='ios-thumbs-down' style={[styles.rateIcon, styles.thumbsDown]} />
    }
    else if (rate === 'Thumbs up') {
      icon = <Icon name='ios-thumbs-up' style={[styles.rateIcon, styles.thumbsUp]} />
    }

    return (
      <View style={styles.rateItem}>
        <NBText style={styles.rateLabel}>{label}</NBText>
        {icon}
      </View>
    )
  }

  renderRightCol () {
    const {data} = this.props
    return (
      <View style={styles.right}>
        {this.renderRateItem(data.payment_rating, 'Payment')}
        {this.renderRateItem(data.character_rating, 'Character')}
        {this.renderRateItem(data.repeat_rating, 'Repeat')}
      </View>
    )
  }

  render () {
    const {data} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.renderLeftCol()}
          {this.renderRightCol()}
        </View>
        <NBText style={styles.feedback}>{data.comment}</NBText>
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
