// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'

export default class AlertMessage extends React.Component {
  render () {
    let t

    switch (this.props.type) {
      case 'warning':
        t = styles.warningText
        break
      case 'error':
        t = styles.errorText
        break
    }

    return (
      <View style={[styles.container, styles[this.props.type], this.props.style]}>

        {this.props.icon !== '' && <Icon style={[t, {marginRight: 7}]} name={this.props.icon} />}

        <Text style={[t, {textAlign: 'left'}, this.props.textStyle]}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}
