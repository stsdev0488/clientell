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
    data: PropTypes.object
  }

  renderLeftCol () {
    const {data} = this.props
    const user = data.user.data || data.user
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
          <NBText style={styles.author}>By <NBText style={styles.authorName}>{user.name}</NBText></NBText>
          {this.renderAuthorBtn(user.name)}
        </View>
      </View>
    )
  }

  renderAuthorBtn (userName) {
    if (userName === 'You') {
      return (
        <Button transparent small style={styles.authorBtn} onPress={() => this.props.navigate('ClientReview', { id: 1, clientName: 'John Doe', clientAddress: '1345 Toad Street, Tampa, FL 33618'})}>
          <Icon name='ios-create-outline' style={styles.authorBtnIcon} />
        </Button>
      )
    } else {
      return (
        <Button transparent small style={styles.authorBtn} onPress={() => this.props.navigate('ProfileModal')}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route, data = {}) => dispatch(NavigationActions.navigate({ routeName: route, params: data }))
  }
}

export default connect(null, mapDispatchToProps)(Feedback)
