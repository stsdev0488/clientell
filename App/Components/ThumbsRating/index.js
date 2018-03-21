import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity} from 'react-native'
import {Icon} from 'native-base'
import styles from './styles'

export default class ThumbsRating extends Component {
  static propTypes = {
    styles: PropTypes.object,
    toggle: PropTypes.func
  }

  render () {

    let rate = ''
    if (this.props.rate === 1) {
      rate = 'thumbs-up'
    } else if (this.props.rate === 0) {
      rate = 'thumbs-down'
    }

    return (
      <View style={[styles.wrapper, this.props.styles]}>
        <TouchableOpacity
          onPress={() => this.props.toggle('thumbs-up')}
          style={styles.btn}
        >
          <Icon
            name='md-thumbs-up'
            style={[styles.icon, {color: rate === 'thumbs-up' ? '#00FF00' : '#D6D6D6'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.toggle('thumbs-down')}
          style={styles.btn}
        >
          <Icon
            name='md-thumbs-down'
            style={[styles.icon, {color: rate === 'thumbs-down' ? '#FF0000' : '#D6D6D6'}]}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
