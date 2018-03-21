import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'

// Styles
import styles from '../styles'

class BillingStep extends Component {
  state = {
    billing_first_name: '',
    billing_middle_name: '',
    billing_last_name: '',
    billing_street_address: '',
    billing_street_address2: '',
    billing_city: '',
    billing_state: '',
    billing_postal_code: ''
  }

  handleSubmit () {
    Keyboard.dismiss()
    console.tron.log('Submit!')
  }

  render () {
    const {
      billing_first_name: first_name,
      billing_middle_name: middle_name,
      billing_last_name: last_name,
      billing_street_address: street_address,
      billing_street_address: street_address2,
      billing_city: city,
      billing_state: state,
      billing_postal_code: postal} = this.state

    return (
      <Form style={{marginTop: 20}}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>First Name</Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              defaultValue={first_name}
              onChangeText={billing_first_name => this.setState({ billing_first_name })}
              onSubmitEditing={() => {this.middleName._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Middle Name</Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              ref={ref => {this.middleName = ref}}
              defaultValue={middle_name}
              onChangeText={billing_middle_name => this.setState({ billing_middle_name })}
              onSubmitEditing={() => {this.lastName._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Last Name</Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              ref={ref => {this.lastName = ref}}
              defaultValue={last_name}
              onChangeText={billing_last_name => this.setState({ billing_last_name })}
              onSubmitEditing={() => {this.address._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Billing Address Line 1</Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              ref={ref => {this.address = ref}}
              defaultValue={street_address}
              onChangeText={street_address => this.setState({ billing_street_address: street_address })}
              onSubmitEditing={() => {this.address2._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Billing Address Line 2</Text>
          <Item regular>
            <Icon active name='ios-person' />
            <Input
              ref={ref => {this.address2 = ref}}
              defaultValue={street_address2}
              onChangeText={street_address2 => this.setState({ billing_street_address2: street_address2 })}
              onSubmitEditing={() => {this.cityInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>City</Text>
          <Item regular>
            <Icon active name='ios-navigate' />
            <Input
              ref={ref => {this.cityInput = ref}}
              style={styles.textarea}
              defaultValue={city}
              onChangeText={billing_city => this.setState({ billing_city })}
              onSubmitEditing={() => {this.stateInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>State</Text>
          <Item regular>
            <Icon active name='ios-navigate' />
            <Input
              ref={ref => {this.stateInput = ref}}
              style={styles.textarea}
              defaultValue={state}
              onChangeText={billing_state => this.setState({ billing_state })}
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
              onChangeText={billing_postal_code => this.setState({ billing_postal_code })}
              onSubmitEditing={() => this.props.submitInfo(this.state)}
              returnKeyType='go'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Button block onPress={() => this.props.submitInfo(this.state)}>
            <NBText>Submit</NBText>
          </Button>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillingStep)