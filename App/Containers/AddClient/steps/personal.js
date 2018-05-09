import React, { Component } from 'react'
import { View, Text, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import PhoneInput from 'react-native-phone-input'
import Picker from 'Lib/CustomPicker'

import { getPhoneExtension } from 'Lib/Utils'

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
            <NBText uppercase style={styles.sectionText}>Organization name <NBText uppercase style={styles.sup}>*</NBText></NBText>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                ref={ref => {this.orgInput = ref}}
                defaultValue={this.state.organization_name}
                onChangeText={organization_name => this.setState({ organization_name })}
              />
            </Item>
          </View>
        </View>
      )
    }
  }

  _submitDetails = () => {
    Keyboard.dismiss()
    let finalData = {...this.state}
    const phone = this.phone.getValue();
    const alt_phone = this.phone_alternate.getValue()

    finalData.phone_number = phone
    // finalData.phone_number_ext = getPhoneExtension(phone)

    const altPhonePrefix = '+' + this.phone_alternate.getCountryCode()
    finalData.alt_phone_number = alt_phone !== altPhonePrefix ? alt_phone : ''
    // finalData.alt_phone_number_ext = getPhoneExtension(alt_phone)

    this.props.submitInfo(finalData)
  }

  _onChangetype = (a) => {
    this.setState({client_type: a})

    this.props.clientTypeChanged(a)
  }

  _validateForm = () => {
    let requiredFields = ['first_name', 'last_name', 'phone_number']
    if (this.state.client_type === 'organization') {
      requiredFields.push('organization_name')
    }

    let errors = []
    for (const key in this.state) {
      if (requiredFields.indexOf(key) !== -1 && this.state[key] === '') {
        errors.push(key)
      }
    }
    return errors
  }

  render () {
    const fieldErrors = this._validateForm()
    return (
      <Form style={{marginTop: 20}}>
        <View style={styles.section}>
          <NBText uppercase style={styles.sectionText} upperCase>Type</NBText>
          <TouchableOpacity
            style={{height: 50}}
            onPress={() => this.picker.show()}
          >
            <Text uppercase style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
              {this.capitalize(this.state.client_type)}
            </Text>
          </TouchableOpacity>
        </View>

        {this._renderConditionalInputs()}

        <View>
          <View style={styles.section}>
            <NBText uppercase style={styles.sectionText}>First name <NBText uppercase style={styles.sup}>*</NBText></NBText>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                ref={ref => {this.fnameInput = ref}}
                defaultValue={this.state.first_name}
                onChangeText={first_name => this.setState({ first_name })}
                onSubmitEditing={() => {this.mnameInput._root.focus()}}
                returnKeyType='next'
              />
            </Item>
          </View>

          <View style={styles.section}>
            <NBText uppercase style={styles.sectionText}>Middle name</NBText>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                ref={ref => {this.mnameInput = ref}}
                defaultValue={this.state.middle_name}
                onChangeText={middle_name => this.setState({ middle_name })}
                onSubmitEditing={() => {this.lnameInput._root.focus()}}
                returnKeyType='next'
              />
            </Item>
          </View>

          <View style={styles.section}>
            <NBText uppercase style={styles.sectionText}>Last name <NBText uppercase style={styles.sup}>*</NBText></NBText>
            <Item regular>
              <Icon active name='ios-person' />
              <Input
                ref={ref => {this.lnameInput = ref}}
                defaultValue={this.state.last_name}
                onChangeText={last_name => this.setState({ last_name })}
                onSubmitEditing={() => {this.emailInput._root.focus()}}
                returnKeyType='next'
              />
            </Item>
          </View>
        </View>

        <View style={styles.section}>
          <NBText uppercase style={styles.sectionText}>Email</NBText>
          <Item regular>
            <Icon active name='ios-mail' />
            <Input
              ref={ref => {this.emailInput = ref}}
              defaultValue={this.state.email}
              onChangeText={email => this.setState({ email })}
              keyboardType='email-address'
              onSubmitEditing={() => {this.phone.focus()}}
              returnKeyType='next'
              autoCapitalize='none'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <NBText uppercase style={styles.sectionText}>Phone number <NBText uppercase style={styles.sup}>*</NBText></NBText>
          <View style={{flexDirection: 'row'}}>
            <Item regular style={{flex: 1}}>
              <PhoneInput
                ref={ref => { this.phone = ref }}
                style={{paddingHorizontal: 8}}
                textStyle={{height: 50}}
                flagStyle={{width: 0, height: 0}}
                value={this.state.phone_number ? this.state.phone_number : '+1'}
              />
            </Item>

            <Item regular style={{width: 60}}>
              <Input
                style={{textAlign: 'center'}}
                defaultValue={this.state.phone_number_ext}
                onChangeText={phone_number_ext => this.setState({ phone_number_ext })}
                keyboardType='phone-pad'
                onSubmitEditing={() => {this.phone_alternate.focus()}}
                returnKeyType='next'
                placeholder='ext'
              />
            </Item>
          </View>
        </View>

        <View style={styles.section}>
          <NBText uppercase style={styles.sectionText}>Alternate Phone number</NBText>
          <View style={{flexDirection: 'row'}}>
            <Item regular style={{flex: 1}}>
              <PhoneInput
                ref={ref => { this.phone_alternate = ref }}
                style={{paddingHorizontal: 8}}
                textStyle={{height: 50}}
                flagStyle={{width: 0, height: 0}}
                value={this.state.alt_phone_number ? this.state.alt_phone_number : '+1'}
              />

            </Item>

            <Item regular style={{width: 60}}>
              <Input
                style={{textAlign: 'center'}}
                defaultValue={this.state.alt_phone_number_ext}
                onChangeText={alt_phone_number_ext => this.setState({ alt_phone_number_ext })}
                keyboardType='phone-pad'
                onSubmitEditing={() => this._submitDetails()}
                returnKeyType='go'
                placeholder='ext'
              />
            </Item>
          </View>
        </View>

        <View style={styles.section}>
          <Button
            block
            onPress={() => this._submitDetails()}
            disabled={fieldErrors.length > 0}
            style={styles.appButton}
          >
            <NBText uppercase>Submit</NBText>
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
