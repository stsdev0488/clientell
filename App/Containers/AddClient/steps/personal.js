import React, { Component } from 'react'
import { View, Text, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import PhoneInput from 'react-native-phone-input'
import Picker from 'Lib/CustomPicker'

// Styles
import styles from '../styles'

class PersonalInfoStep extends Component {
  state = {...this.props.initialData}

  handleSubmit () {
    Keyboard.dismiss()
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _renderConditionalInputs = () => {
    if (this.state.client_type === 'organization') {
      return (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Organization name</Text>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                defaultValue={this.state.organization_name}
                onChangeText={organization_name => this.setState({ organization_name })}
              />
            </Item>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>First name</Text>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                defaultValue={this.state.first_name}
                onChangeText={first_name => this.setState({ first_name })}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Middle name</Text>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                defaultValue={this.state.middle_name}
                onChangeText={middle_name => this.setState({ middle_name })}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Last name</Text>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                defaultValue={this.state.last_name}
                onChangeText={last_name => this.setState({ last_name })}
              />
            </Item>
          </View>
        </View>
      )
    }
  }

  _submitDetails = () => {
    let finalData = {...this.state}
    finalData.phone_number_ext = this.phone.getCountryCode()
    finalData.phone_number = this.phone.getValue()
    finalData.alt_phone_number_ext = this.phone_alternate.getCountryCode()
    finalData.alt_phone_number = this.phone_alternate.getValue()

    this.props.submitInfo(finalData)
  }

  _onChangetype = (a) => {
    this.setState({client_type: a})

    this.props.clientTypeChanged(a)
  }

  render () {
    const {name, phone, address} = this.state

    return (
      <Form style={{marginTop: 20}}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Type</Text>
          <TouchableOpacity
            style={{height: 50}}
            onPress={() => this.picker.show()}
          >
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
              {this.capitalize(this.state.client_type)}
            </Text>
          </TouchableOpacity>
        </View>

        {this._renderConditionalInputs()}

        <View style={styles.section}>
          <Text style={styles.sectionText}>Phone number</Text>
          <Item regular>
            <PhoneInput
              ref={ref => { this.phone = ref }}
              style={{paddingHorizontal: 8}}
              textStyle={{height: 50}}
              value={this.state.phone_number}
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Alternate Phone number</Text>
          <Item regular>
            <PhoneInput
              ref={ref => { this.phone_alternate = ref }}
              style={{paddingHorizontal: 8}}
              textStyle={{height: 50}}
              value={this.state.alt_phone_number}
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Button block onPress={() => this._submitDetails()}>
            <NBText>Submit</NBText>
          </Button>
        </View>

        <Picker
          ref={ref => {
            this.picker = ref;
          }}
          selectedOption={this.state.client_type}
          onSubmit={(a) => this._onChangetype(a)}
          options={['individual', 'organization']}
        />
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoStep)