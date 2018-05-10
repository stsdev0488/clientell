import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Modal, Picker, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { capitalize } from '../Utils'
import { delay } from 'redux-saga'

import styles from './styles';

const PickerItem = Picker.Item;

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedOption: this.props.selectedOption || (typeof this.props.options[0] === 'object' ? this.props.options[0].id : this.props.options[0]),
      extraStyle: {}
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

  async onPressCancel() {
    this.setState({
      extraStyle: {}
    })

    await delay(50)

    this.setState({
      modalVisible: false
    })
  }

  async onPressSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedOption);
    }

    this.setState({
      extraStyle: {}
    })

    await delay(50)

    this.setState({
      modalVisible: false
    })
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
    if (typeof item === 'object') {
      return <PickerItem key={item.id} value={item.id} label={item.name} />;
    } else {
      return <PickerItem key={item} value={item} label={capitalize(item)} />;
    }
  }

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={async () => {
          this.setState({
            extraStyle: {}
          })

          await delay(50)

          this.setState({
            modalVisible: false
          })
        }}
        onShow={() => {
          if (Platform.OS === 'android') {
            setTimeout(() => {
              if (this.state.modalVisible)
                this.setState({extraStyle: {backgroundColor: 'rgba(0,0,0,0.4)'}})
            }, 150)
          }
        }}
      >
        <View style={[styles.basicContainer, this.state.extraStyle]}>
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
                <PickerItem value={''} label={''} />
                {this.props.options.map((item, index) => this.renderItem(item, index))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
