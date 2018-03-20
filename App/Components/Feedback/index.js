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
    return (
      <View style={styles.left}>
        <NBText style={styles.date}>{moment(data.created).format('MM/DD/YYYY')}</NBText>
        <StarRating
          disabled
          starSize={20}
          maxStars={5}
          rating={data.rating}
          fullStarColor='#FFD700'
          emptyStarColor='#D6D6D6'
          containerStyle={{width: 100}}
        />
        <View style={styles.authorBox}>
          <NBText style={styles.author}>By <NBText style={styles.authorName}>{data.userName}</NBText></NBText>
          {this.renderAuthorBtn(data.userName)}
        </View>
      </View>
    )
  }

  renderAuthorBtn (userName) {
    if (userName === 'You') {
      return (
        <Button transparent small style={styles.authorBtn}>
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
    if (rate === 0) {
      icon = <Icon name='ios-thumbs-down' style={[styles.rateIcon, styles.thumbsDown]} />
    }
    else if (rate === 1) {
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
        {this.renderRateItem(data.payment, 'Payment')}
        {this.renderRateItem(data.character, 'Character')}
        {this.renderRateItem(data.repeat, 'Repeat')}
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
        <NBText style={styles.feedback}>{data.feedback}</NBText>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (route) => dispatch(NavigationActions.navigate({ routeName: route }))
  }
}

export default connect(null, mapDispatchToProps)(Feedback)