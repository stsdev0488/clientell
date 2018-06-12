import React, { Component } from 'react'
import { View, Text, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import Picker from 'Lib/CustomPicker'
import { US_STATES, capitalize } from 'Lib/Utils'

import Secrets from 'react-native-config'

// Styles
import styles from '../styles'

class AddressStep extends Component {
  state = {
    countries: [],
    ...this.props.initialData
  }

  _reset = () => {
    this.setState(state => {
      state = {
        street_address: '',
        street_address2: '',
        country_id: 840,
        city: '',
        state: '',
        postal_code: ''
      }
      return state
    })
  }

  _handleSubmit () {
    Keyboard.dismiss()

    const {countries, ...info} = this.state

    return info
  }

  _onTextChange = (a) => {
    this.props.navigation.setParams({
      formTouched: true,
      sample: this.props.resetForm
    })
    this.setState({...a})
  }

  componentDidMount () {
    // this._getCountries()
  }

  _validateForm = () => {
    const requiredFields = ['street_address', 'city', 'state']
    let errors = []
    for (const key in this.state) {
      if (requiredFields.indexOf(key) !== -1 && this.state[key] === '') {
        errors.push(key)
      }
    }
    return errors
  }

  _getCountries = async () => {
    const cc = await (await fetch(Secrets.API_URL + 'country')).json()
    this.setState({countries: [{name: 'Select Country', id: 0}, ...cc.data]})
  }

  _onChangeCountry = (a) => {
    this.setState({country_id: a})
  }

  _onChangeState = (a) => {
    this.setState({state: a})
  }

  render () {
    const {street_address, street_address2, city, state, postal_code:postal, country_id: country} = this.state
    const fieldErrors = this._validateForm()
    const stateName = US_STATES.find(ccc => ccc.id == state)

    return (
      <Form style={{marginTop: 20}}>
        {
          // <View style={styles.section}>
          //   <Text style={styles.sectionText}>Country <Text style={styles.sup}>*</Text></Text>
          //   <TouchableOpacity
          //     style={{height: 50}}
          //     onPress={() => this.picker.show()}
          //   >
          //     <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
          //       {countryName ? countryName.name : 'Select country'}
          //     </Text>
          //   </TouchableOpacity>
          // </View>
        }

        <View style={styles.formUpper}>
          <Icon style={styles.upperIcon} name='ios-list-box-outline' />
          <NBText style={styles.upperText} uppercase>Address</NBText>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Address Line 1 <Text style={styles.sup}>*</Text></Label>
              <Input
                defaultValue={street_address}
                onChangeText={street_address => this._onTextChange({ street_address })}
                onSubmitEditing={() => {this.address2._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
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

          {
            // <View style={styles.section}>
            //   <Text style={styles.sectionText}>State <Text style={styles.sup}>*</Text></Text>
            //   <Item fixedLabel>
            //     <Icon active name='ios-navigate'/>
            //     <Input
            //       ref={ref => {this.stateInput = ref}}
            //       style={styles.textarea}
            //       defaultValue={state}
            //       onChangeText={state => this.setState({ state })}
            //       onSubmitEditing={() => {this.postalInput._root.focus()}}
            //       returnKeyType='next'
            //     />
            //   </Item>
            // </View>
          }

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
            <Item fixedLabel>
              <Label style={styles.sectionText}>Postal code</Label>
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
        </View>

        {
          // <Picker
          //   ref={ref => {
          //   this.picker = ref;
          // }}
          //   selectedOption={country}
          //   onSubmit={(a) => this._onChangeCountry(a)}
          //   options={this.state.countries || []}
          // />
        }

        <Picker
          ref={ref => {
            this.statePicker = ref;
          }}
          selectedOption={state}
          onSubmit={(a) => this._onChangeState(a)}
          options={US_STATES}
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

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(AddressStep)
