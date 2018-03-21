import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Modal, Picker } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const PickerItem = Picker.Item;

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedOption: this.props.selectedOption || this.props.options[0],
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOption: nextProps.selectedOption,
    });
  }

  selectCountry(selectedOption) {
    this.setState({
      selectedOption,
    });
  }

  onPressCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  onPressSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedOption);
    }

    this.setState({
      modalVisible: false,
    });
  }

  onValueChange(selectedOption) {
    this.setState({
      selectedOption,
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  renderItem(item, index) {
    return <PickerItem key={item} value={item} label={item} />;
  }

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('Picker has been closed.');
        }}
      >
        <View style={styles.basicContainer}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: this.props.pickerBackgroundColor || 'white' },
            ]}
          >
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBox}>
              <Picker
                ref={(ref) => {
                  this.picker = ref;
                }}
                style={styles.bottomPicker}
                selectedValue={this.state.selectedOption}
                onValueChange={country => this.onValueChange(country)}
                itemStyle={itemStyle}
                mode="dialog"
              >
                {this.props.options.map((item, index) => this.renderItem(item, index))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
