import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Item, Input, Label } from 'native-base'
import PhoneInput from 'react-native-phone-input'
import styles from './styles'

export default class PhoneInputC extends Component {
  // // Prop type warnings
  static propTypes = {
    required: PropTypes.bool
  }

  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor (props) {
    super(props)

    this.state = {
      phone_number: props.value
    }
  }

  getCountryCode = () => {
    return this.phone.getCountryCode()
  }

  getPhoneNumber = () => {
    return this.state.phone_number
  }

  render () {
    return (
      <Input
        ref={ref => {this.phone = ref}}
        defaultValue={this.state.phone_number ? this.state.phone_number : '+1'}
        onChangeText={phone_number => this.setState({ phone_number })}
        keyboardType='phone-pad'
        returnKeyType='next'
        autoCapitalize='none'
        style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
      />
    )
  }
}
