import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Item } from 'native-base'
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

  state = {
    phone_number: ''
  }

  getCountryCode = () => {
    return this.phone.getCountryCode()
  }

  getPhoneNumber = () => {
    return this.phone.getValue()
  }

  render () {
    return (
      <Item regular>
        <PhoneInput
          ref={ref => { this.phone = ref }}
          style={{paddingHorizontal: 8}}
          textStyle={{height: 50}}
        />
      </Item>
    )
  }
}
