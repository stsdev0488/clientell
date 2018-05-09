import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, TouchableWithoutFeedback} from 'react-native'
import {Button, Text as NBText, Icon, Input, Item} from 'native-base'
import styles from './styles'

import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

export default class DTPicker extends Component {
  static defaultProps = { datePickerProps: {} }
  static propTypes = {
    mode: PropTypes.string,
    visible: PropTypes.bool,
    toggle: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    date: PropTypes.object,
    label: PropTypes.string,
    styles: PropTypes.object,
    inputStyles: PropTypes.object,
  }

  render () {
    const {mode, date, label, hide, show, visible, onConfirm, inputStyles, datePickerProps} = this.props

    return (
      <View style={[styles.wrapper, this.props.styles]}>
        <NBText style={styles.label}>{label}</NBText>

        <TouchableWithoutFeedback onPress={show}>
          <View style={[styles.input, styles.inputDisplay]}>
            <NBText style={[styles.textField, inputStyles]}>{moment(date).format('MM-DD-YYYY')}</NBText>

            <Button onPress={show} transparent style={{margin: 0, paddingTop: 0, paddingBottom: 0}}>
              <Icon name='md-calendar' style={{fontSize: 24}} />
            </Button>
          </View>
        </TouchableWithoutFeedback>

        <DateTimePicker
          mode={mode || 'date'}
          isVisible={visible}
          onConfirm={onConfirm}
          onCancel={hide}
          {...datePickerProps}
        />
      </View>
    )
  }
}
