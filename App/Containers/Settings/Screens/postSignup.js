import React, { Component } from 'react'
import {View, TouchableOpacity, Alert, Text} from 'react-native'
import { connect } from 'react-redux'
import {Content, Form, Item, Input, Button, Icon, Text as NBText, Label, CheckBox, ListItem} from 'native-base'
import Picker from 'Lib/CustomPicker'
import { Colors } from 'Themes'
import SubHeaderBar from 'Components/SubHeaderBar'
import { US_STATES, capitalize } from 'Lib/Utils'
import UserActions from 'Redux/UserRedux'

// Styles
import styles from './styles'

class PostSignUpScreen extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'ios-home-outline'}
          size={20}
          style={{color: tintColor, fontSize: 25}}
        />
      ),
      header: (a) => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  user = this.props.navigation.getParam('user')

  // state = {
  //   password: '',
  //   confirm_password: '',
  //   client_type: 'individual',
  //   organization_name: '',
  //   first_name: '',
  //   last_name: '',
  //   middle_name: '',
  //   email: '',
  //   phone_number: '',
  //   phone_number_ext: '',
  //   alt_phone_number: '',
  //   alt_phone_number_ext: '',
  //   agree: false,
  //   street_address: '',
  //   street_address2: '',
  //   country_id: 840,
  //   city: '',
  //   state: '',
  //   postal_code: ''
  // }

  state = {
    client_type: 'individual',
    organization_name: '',
    first_name: 'Ian',
    last_name: 'Me',
    middle_name: 'D',
    email: this.user.email,
    phone_number: '2015550123',
    phone_number_ext: '',
    alt_phone_number: '',
    alt_phone_number_ext: '',
    street_address: 'test address suite 12',
    street_address2: '',
    city: 'Las Vegas',
    state: 'MI',
    postal_code: '61110'
  }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Update Profile',
      rightBtnPress: this._submit,
      rightBtnText: 'Submit'
    })
  }

  capitalize (str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  isValid = () => {
    const {
      email, first_name, last_name, state, city, postal_code, phone_number
    } = this.state

    if (email && first_name && last_name && state && city && postal_code && phone_number) {
      return true
    }

    return false
  }

  _submit = async () => {
    if (!this.isValid()) {
      Alert.alert('Please fill up all required fields')
    }

    const {
      email, first_name, last_name, state, city, postal_code, phone_number,
      street_address, street_address2, alt_phone_number, middle_name
    } = this.state
    const formData = new FormData()

    formData.append('first_name', first_name)
    formData.append('middle_name', middle_name)
    formData.append('last_name', last_name)
    formData.append('account_type', 'individual')
    formData.append('street_address', street_address)
    formData.append('street_address2', street_address2)
    formData.append('email', email)
    formData.append('phone_number', phone_number)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('postal_code', postal_code)

    this.props.update(formData)
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
        <Content style={styles.container}>
          <Form style={{marginTop: 20, paddingLeft: 15, paddingRight: 20, paddingBottom: 50}}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => dispatch(UserActions.userUpdateRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSignUpScreen)
