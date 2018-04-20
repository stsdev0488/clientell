import React, { Component } from 'react'
import { View, Text, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import Picker from 'Lib/CustomPicker'
import { countries, capitalize } from 'Lib/Utils'

import Secrets from 'react-native-config'

// Styles
import styles from '../styles'

class AddressStep extends Component {
  state = {
    countries: [],
    ...this.props.initialData
  }

  _handleSubmit () {
    Keyboard.dismiss()

    const {countries, ...info} = this.state

    this.props.submitInfo(info)
  }

  componentWillMount () {
    this._getCountries()
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

  render () {
    const {street_address, street_address2, city, state, postal_code:postal, country_id: country} = this.state
    const fieldErrors = this._validateForm()
    const countryName = (this.state.countries).find(ccc => ccc.id == country)

    return (
      <Form style={{marginTop: 20}}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Country <Text style={styles.sup}>*</Text></Text>
          <TouchableOpacity
            style={{height: 50}}
            onPress={() => this.picker.show()}
          >
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
              {countryName ? countryName.name : 'Select country'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Address Line 1 <Text style={styles.sup}>*</Text></Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              defaultValue={street_address}
              onChangeText={street_address => this.setState({ street_address })}
              onSubmitEditing={() => {this.address2._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Address Line 2</Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              ref={ref => {this.address2 = ref}}
              defaultValue={street_address2}
              onChangeText={street_address2 => this.setState({ street_address2 })}
              onSubmitEditing={() => {this.cityInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>City <Text style={styles.sup}>*</Text></Text>
          <Item regular>
            <Icon active name='ios-navigate' />
            <Input
              ref={ref => {this.cityInput = ref}}
              style={styles.textarea}
              defaultValue={city}
              onChangeText={city => this.setState({ city })}
              onSubmitEditing={() => {this.stateInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>State <Text style={styles.sup}>*</Text></Text>
          <Item regular>
            <Icon active name='ios-navigate' />
            <Input
              ref={ref => {this.stateInput = ref}}
              style={styles.textarea}
              defaultValue={state}
              onChangeText={state => this.setState({ state })}
              onSubmitEditing={() => {this.postalInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Postal code</Text>
          <Item regular>
            <Icon active name='ios-navigate' />
            <Input
              ref={ref => {this.postalInput = ref}}
              style={styles.textarea}
              defaultValue={postal}
              onChangeText={postal_code => this.setState({ postal_code })}
              onSubmitEditing={() => this.props.submitInfo(this.state)}
              returnKeyType='go'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Button block onPress={() => this._handleSubmit()} disabled={fieldErrors.length > 0}>
            <NBText>Submit</NBText>
          </Button>
        </View>

        <Picker
          ref={ref => {
            this.picker = ref;
          }}
          selectedOption={country}
          onSubmit={(a) => this._onChangeCountry(a)}
          options={this.state.countries || []}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressStep)
