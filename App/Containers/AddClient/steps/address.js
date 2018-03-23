import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'

// Styles
import styles from '../styles'

class AddressStep extends Component {
  state = {
    ...this.props.initialData
  }

  handleSubmit () {
    Keyboard.dismiss()
    console.tron.log('Submit!')
  }

  render () {
    const {street_address, street_address2, city, state, postal_code:postal} = this.state

    return (
      <Form style={{marginTop: 20}}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Address Line 1</Text>
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
          <Text style={styles.sectionText}>City</Text>
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
          <Text style={styles.sectionText}>State</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressStep)