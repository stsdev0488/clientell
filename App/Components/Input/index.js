import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import { Item, Input } from 'native-base'

export default class InputC extends Component {
  // // Prop type warnings
  static propTypes = {
    required: PropTypes.bool
  }

  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  state = {
    value: this.props.defaultValue || '',
    error: {error: false}
  }

  _checkRequired = (val) => {
    if (this.props.required) {
      if (!val) {
        this.setState({error: {error: true}})
      } else {
        this.setState({error: {error: false}})
      }
    }
  }

  render () {
    const { required, onChangeText, ...rest } = this.props

    return (
      <Item regular {...this.state.error}>
        <Input
          ref={ref => typeof this.props.bref === "function" ? this.props.bref(ref) : null}
          onChangeText={text => {
            this.setState({value: text})
            onChangeText(text)

            this._checkRequired(text)
          }}
          {...rest}
        />
      </Item>
    )
  }
}
