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

  _reset = () => {
    this.setState(state => {
      state = {
        client_type: 'individual',
        organization_name: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone_number: '+1',
        phone_number_ext: '',
        alt_phone_number: '+1',
        alt_phone_number_ext: ''
      }

      this.props.navigation.setParams({
        formTouched: false
      })

      return state
    })
  }

  handleSubmit () {
    Keyboard.dismiss()
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _renderConditionalInputs = () => {
    if (this.state.client_type === 'organization') {
      return (
        <View style={styles.section}>
          <Item  fixedLabel>
            <Label style={styles.sectionText}>Organization name <NBText uppercase style={styles.sup}>*</NBText></Label>
            <Input
              ref={ref => {this.orgInput = ref}}
              defaultValue={this.state.organization_name}
              onChangeText={organization_name => this._onTextChange({ organization_name })}
              style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
            />
          </Item>
        </View>
      )
    }
  }

  _submitDetails = () => {
    Keyboard.dismiss()
    let finalData = {...this.state}
    // const phone = this.phone.getValue();
    // const alt_phone = this.phone_alternate.getValue()

    // finalData.phone_number = phone
    // finalData.phone_number_ext = getPhoneExtension(phone)

    // const altPhonePrefix = '+' + this.phone_alternate.getCountryCode()
    // finalData.alt_phone_number = alt_phone !== altPhonePrefix ? alt_phone : ''
    // finalData.alt_phone_number_ext = getPhoneExtension(alt_phone)

    // this.props.submitInfo(finalData)
    return finalData
  }

  _onChangetype = (a) => {
    this.setState({client_type: a})
    this.props.clientTypeChanged(a)
  }

  _onTextChange = (a) => {
    this.props.navigation.setParams({
      formTouched: true,
      resetter: this.props.resetForm
    })
    this.setState({...a})
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
        <View style={styles.formUpper}>
          <Icon style={styles.upperIcon} name='ios-list-box-outline' />
          <NBText style={styles.upperText} uppercase>Basic info</NBText>
        </View>
        
        <View style={styles.formWrapper}>
          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Type</Label>
              <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', height: 50}}
                onPress={() => this.picker.show()}
              >
                <NBText style={styles.disabledInput}>{this.capitalize(this.state.client_type)}</NBText>
              </TouchableOpacity>
            </Item>
          </View>

          {this._renderConditionalInputs()}

          <View style={styles.section}>
            <Item  fixedLabel>
              <Label style={styles.sectionText}>First name <NBText uppercase style={styles.sup}>*</NBText></Label>
              <Input
                ref={ref => {this.fnameInput = ref}}
                defaultValue={this.state.first_name}
                onChangeText={first_name => this._onTextChange({ first_name })}
                onSubmitEditing={() => {this.mnameInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Middle name</Label>
              <Input
                ref={ref => {this.mnameInput = ref}}
                defaultValue={this.state.middle_name}
                onChangeText={middle_name => this._onTextChange({ middle_name })}
                onSubmitEditing={() => {this.lnameInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Last name <NBText uppercase style={styles.sup}>*</NBText></Label>
              <Input
                ref={ref => {this.lnameInput = ref}}
                defaultValue={this.state.last_name}
                onChangeText={last_name => this._onTextChange({ last_name })}
                onSubmitEditing={() => {this.emailInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Email</Label>
              <Input
                ref={ref => {this.emailInput = ref}}
                defaultValue={this.state.email}
                onChangeText={email => this._onTextChange({ email })}
                keyboardType='email-address'
                onSubmitEditing={() => {this.phone.focus()}}
                returnKeyType='next'
                autoCapitalize='none'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel style={styles.fixedInput}>
              <View>
                <Label style={styles.sectionText}>Phone number <NBText uppercase style={styles.sup}>*</NBText></Label>
              </View>
              {
              // <PhoneInput
              //   ref={ref => { this.phone = ref }}
              //   style={{paddingHorizontal: 8, flex: 1}}
              //   textStyle={{height: 50, textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              //   flagStyle={{width: 0, height: 0}}
              //   value={this.state.phone_number ? this.state.phone_number : '+1'}
              // />
              }
              <Input
                ref={ref => {this.phone = ref}}
                defaultValue={this.state.phone_number ? this.state.phone_number : '+1'}
                onChangeText={phone_number => this._onTextChange({ phone_number })}
                keyboardType='phone-pad'
                onSubmitEditing={() => {this.phone_alternate.focus()}}
                returnKeyType='next'
                autoCapitalize='none'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item  fixedLabel>
              <Label style={styles.sectionText}>Phone number extension</Label>
              <Input
                style={{textAlign: 'center'}}
                defaultValue={this.state.phone_number_ext}
                onChangeText={phone_number_ext => this._onTextChange({ phone_number_ext })}
                keyboardType='phone-pad'
                onSubmitEditing={() => {this.phone_alternate.focus()}}
                returnKeyType='next'
                placeholder='ext'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item  fixedLabel>
              <Label style={styles.sectionText}>Alternate Phone number</Label>
              {
              // <PhoneInput
              //   ref={ref => { this.phone_alternate = ref }}
              //   style={{paddingHorizontal: 8, flex: 1}}
              //   textStyle={{height: 50, textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              //   flagStyle={{width: 0, height: 0}}
              //   value={this.state.alt_phone_number ? this.state.alt_phone_number : '+1'}
              // />
              }

              <Input
                ref={ref => {this.phone_alternate = ref}}
                defaultValue={this.state.alt_phone_number ? this.state.alt_phone_number : '+1'}
                onChangeText={alt_phone_number => this._onTextChange({ alt_phone_number })}
                keyboardType='phone-pad'
                onSubmitEditing={() => {this.phone_alternate.focus()}}
                returnKeyType='next'
                autoCapitalize='none'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item  fixedLabel>
              <Label style={styles.sectionText}>Alternate Phone number extension</Label>
              <Input
                style={{textAlign: 'center'}}
                defaultValue={this.state.alt_phone_number_ext}
                onChangeText={alt_phone_number_ext => this._onTextChange({ alt_phone_number_ext })}
                keyboardType='phone-pad'
                onSubmitEditing={() => this._submitDetails()}
                returnKeyType='go'
                placeholder='ext'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PersonalInfoStep)
