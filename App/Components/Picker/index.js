import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types';
import styles from './styles'

import Picker from 'Lib/CustomPicker'
import { capitalize } from 'Lib/Utils'

export default class PickerC extends Component {
  // // Prop type warnings
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    required: PropTypes.bool,
    onSelect: PropTypes.func
  }

  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  state = {
    selected: this.props.defaultValue
  }

  _onChangeOption = (a) => {
    this.setState({selected: a})

    if (this.props.onSelect) {
      this.props.onSelect(a)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{height: 50}}
          onPress={() => this.picker.show()}
        >
          <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
            {capitalize(this.state.selected)}
          </Text>
        </TouchableOpacity>

        <Picker
          ref={ref => {
            this.picker = ref;
          }}
          selectedOption={this.state.selected}
          onSubmit={(a) => this._onChangeOption(a)}
          options={this.props.options}
        />
      </View>
    )
  }
}
