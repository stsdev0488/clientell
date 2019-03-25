import React, { Component } from 'react'
import {View, AsyncStorage, TouchableOpacity, Alert, Text} from 'react-native'
import { connect } from 'react-redux'
import {Content, Form, Item, Input, Button, Icon, Text as NBText, Label, CheckBox, ListItem} from 'native-base'
import Picker from 'Lib/CustomPicker'
import { Colors } from 'Themes'
import SubHeaderBar from 'Components/SubHeaderBar'
import { US_STATES, capitalize } from 'Lib/Utils'
import AuthActions from 'Redux/AuthRedux'
import ErrorRenderer from 'Components/ErrorRenderer'

// Styles
import styles from './styles'

class SignUpScreen extends Component {
  state = {
    password: '',
    confirm_password: '',
    client_type: 'individual',
    organization_name: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone_number: '',
    phone_number_ext: '',
    alt_phone_number: '',
    alt_phone_number_ext: '',
    agree: false,
    street_address: '',
    street_address2: '',
    country_id: 840,
    city: '',
    state: '',
    postal_code: ''
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  isValid = () => {
    const {
      email, password, confirm_password, first_name, last_name, state, city, postal_code, phone_number
    } = this.state
    
    if (email && password && confirm_password && first_name && last_name && state && city && postal_code && phone_number) {
      return true
    }
    
    return false
  }

  _submit = async () => {
    if (!this.isValid()) {
      Alert.alert('Please fill up all required fields')
    }

    if (!this.state.agree) {
      Alert.alert('You need to agree to privacy policy and terms of use')
    }

    const {
      email, password, confirm_password, first_name, last_name, state, city, postal_code, phone_number,
      street_address, street_address2, alt_phone_number, middle_name
    } = this.state

    this.props.signUp({
      account_type: 'individual',
      email,
      password,
      password_confirmation: confirm_password,
      first_name,
      last_name,
      middle_name: middle_name,
      phone_number,
      alt_phone_number,
      street_address,
      street_address2,
      city,
      state,
      postal_code
    })
  }

  _onChangetype = (a) => {
    this.setState({client_type: a})
  }

  _onTextChange = (a) => {
    this.setState({...a})
  }

  _onChangeState = (a) => {
    this.setState({state: a})
  }

  render () {
    const {street_address, street_address2, city, state, postal_code:postal} = this.state
    const stateName = US_STATES.find(ccc => ccc.id == state)

    return (
      <View style={styles.mainContainer}>
        <SubHeaderBar
          title={'Register'}
          leftBtnIcon={'arrow-back'}
          leftBtnPress={() => {
            this.props.navigation.goBack()
          }}
          rightBtnPress={this._submit}
          rightBtnText={'Submit'}
          rightBtnLoading={this.props.fetching}
        />

        <Content style={styles.container}>
          <Form style={{marginTop: 20, paddingHorizontal: 20, paddingBottom: 50}}>
            <View style={styles.formUpper}>
              <Icon style={styles.upperIcon} name='ios-list-box' />
              <NBText style={styles.upperText} uppercase>Login Details</NBText>
            </View>

            <View style={styles.formWrapper}>
              <View style={styles.groupDescription}>
                <NBText style={styles.groupDescriptionText}>
                  Enter your email address and make a password. You'll use them to log into the ClienTell app and web site. Any info marked with * is mandatory.
                </NBText>
              </View>

              <View style={styles.section}>
                <Item fixedLabel onPress={() => this.emailInput._root.focus()}>
                  <Label style={styles.sectionText}>Email <NBText uppercase style={styles.sup}>*</NBText></Label>
                  <Input
                    ref={ref => {this.emailInput = ref}}
                    defaultValue={this.state.email}
                    onChangeText={email => this._onTextChange({ email })}
                    onSubmitEditing={() => {this.phone.focus()}}
                    returnKeyType='next'
                    autoCapitalize='none'
                    style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                  />
                </Item>
              </View>

              <View style={styles.section}>
                <Item fixedLabel onPress={() => this.emailInput._root.focus()}>
                  <Label style={styles.sectionText}>Password <NBText uppercase style={styles.sup}>*</NBText></Label>
                  <Input
                    ref={ref => {this.password = ref}}
                    defaultValue={this.state.password}
                    onChangeText={password => this._onTextChange({ password })}
                    onSubmitEditing={() => {this.confirmPassword.focus()}}
                    returnKeyType='next'
                    autoCapitalize='none'
                    style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                    secureTextEntry
                  />
                </Item>
              </View>

              <View style={styles.section}>
                <Item fixedLabel onPress={() => this.emailInput._root.focus()}>
                  <Label style={styles.sectionText}>Confirm Password <NBText uppercase style={styles.sup}>*</NBText></Label>
                  <Input
                    ref={ref => {this.confirmPassword = ref}}
                    defaultValue={this.state.confirm_password}
                    onChangeText={confirm_password => this._onTextChange({ confirm_password })}
                    returnKeyType='next'
                    autoCapitalize='none'
                    style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                    secureTextEntry
                  />
                </Item>
              </View>

            </View>

            <View style={styles.formUpper}>
              <Icon style={styles.upperIcon} name='ios-list-box' />
              <NBText style={styles.upperText} uppercase>Contact Details</NBText>
            </View>

            <View style={styles.formWrapper}>
              <View style={styles.groupDescription}>
                <NBText style={styles.groupDescriptionText}>
                  Enter your name, address and phone number. The ClienTell app uses these to build its community of contractors. Any info marked with * is mandatory.
                </NBText>
              </View>

              <View style={styles.section}>
                <Item  fixedLabel onPress={() => this.fnameInput._root.focus()}>
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
                <Item fixedLabel onPress={() => this.mnameInput._root.focus()}>
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
                <Item fixedLabel onPress={() => this.lnameInput._root.focus()}>
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
                <Item fixedLabel onPress={() => this.address1._root.focus()}>
                  <Label style={styles.sectionText}>Address Line 1 <Text style={styles.sup}>*</Text></Label>
                  <Input
                    ref={r => this.address1 = r}
                    defaultValue={street_address}
                    onChangeText={street_address => this._onTextChange({ street_address })}
                    onSubmitEditing={() => {this.address2._root.focus()}}
                    returnKeyType='next'
                    style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                  />
                </Item>
              </View>

              <View style={styles.section}>
                <Item fixedLabel onPress={() => this.address2._root.focus()}>
                  <Label style={styles.sectionText}>Address Line 2</Label>
                  <Input
                    ref={ref => {this.address2 = ref}}
                    defaultValue={street_address2}
                    onChangeText={street_address2 => this._onTextChange({ street_address2 })}
                    onSubmitEditing={() => {this.cityInput._root.focus()}}
                    returnKeyType='next'
                    style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                  />
                </Item>
              </View>

              <View style={styles.section}>
                <Item fixedLabel>
                  <Label style={styles.sectionText}>State <Text style={styles.sup}>*</Text></Label>
                  <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center', height: 50}}
                    onPress={() => this.statePicker.show()}
                  >
                    <NBText style={styles.disabledInput}>{stateName ? stateName.name : 'Select state'}</NBText>
                  </TouchableOpacity>
                </Item>
              </View>


              <View style={styles.section}>
                <Item fixedLabel onPress={() => this.postalInput._root.focus()}>
                  <Label style={styles.sectionText}>Zip code</Label>
                  <Input
                    ref={ref => {this.postalInput = ref}}
                    style={styles.textarea}
                    defaultValue={postal}
                    onChangeText={postal_code => this._onTextChange({ postal_code })}
                    onSubmitEditing={() => this.props.submitInfo(this.state)}
                    returnKeyType='go'
                    style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                  />
                </Item>
              </View>

              <View style={styles.section}>
                <Item fixedLabel onPress={() => this.cityInput._root.focus()}>
                  <Label style={styles.sectionText}>City <Text style={styles.sup}>*</Text></Label>
                  <Input
                    ref={ref => {this.cityInput = ref}}
                    style={[styles.textarea, {textAlign: 'right', marginBottom: 8, paddingRight: 10}]}
                    defaultValue={city}
                    onChangeText={city => this._onTextChange({ city })}
                    returnKeyType='next'
                  />
                </Item>
              </View>

              <View style={styles.section}>
                <Item fixedLabel style={styles.fixedInput} onPress={() => this.phone._root.focus()}>
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
                    defaultValue={this.state.phone_number ? this.state.phone_number : ''}
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
                <Item  fixedLabel onPress={() => this.phone_ext._root.focus()}>
                  <Label style={styles.sectionText}>Phone number extension</Label>
                  <Input
                    ref={r => this.phone_ext = r}
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
                <Item  fixedLabel onPress={() => this.phone_alternate._root.focus()}>
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
                    defaultValue={this.state.alt_phone_number ? this.state.alt_phone_number : ''}
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
                <Item  fixedLabel onPress={() => this.alt_phone_ext._root.focus()}>
                  <Label style={styles.sectionText}>Alternate Phone number extension</Label>
                  <Input
                    ref={r => this.alt_phone_ext = r}
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

            <View style={styles.formUpper}>
              <Icon style={styles.upperIcon} name='ios-list-box' />
              <NBText style={styles.upperText} uppercase>Privacy Policy / Terms of Use</NBText>
            </View>

            <View style={styles.formWrapper}>
              <View style={styles.groupDescription}>
                <NBText style={styles.groupDescriptionText}>
                  At ClienTell, we respect your right to privacy. Please read our <NBText style={styles.link}>privacy policy</NBText> and <NBText style={styles.link}>terms and conditions</NBText> and check the box below to confirm that you agree:
                </NBText>
              </View>

              <ListItem iconLeft style={{alignItems: 'flex-start'}}>
                <CheckBox checked={this.state.agree} color={Colors.scheme2} onPress={() => this.setState({agree: !this.state.agree})} />

                <NBText style={[styles.sectionText, {paddingLeft: 14}]}>
                  I have read the privacy policy and agree to the terms of use.
                </NBText>
              </ListItem>
            </View>

            <View style={[styles.section, {paddingVertical: 0, marginBottom: 0}]}>
              <ErrorRenderer error={this.props.error && this.props.error.errors ? this.props.error.errors : this.props.error} />
            </View>

            <Picker
              ref={ref => {
                this.statePicker = ref;
              }}
              selectedOption={state}
              onSubmit={(a) => this._onChangeState(a)}
              options={US_STATES}
            />
          </Form>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.auth.registering,
    error: state.auth.registrationError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (data) => dispatch(AuthActions.register(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
