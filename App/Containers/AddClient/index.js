import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import HeaderBar from '../../Components/HeaderBar'
import StarRating from 'react-native-star-rating'

// Styles
import styles from './styles'

class AddClient extends Component {
  static navigationOptions = {
    tabBarLabel: 'Add Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'md-person-add'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  state = {
    scrollOffsetY: 0,
    name: '',
    phone: '',
    address: ''
  }

  handleSubmit () {
    Keyboard.dismiss()
    console.tron.log('Submit!')
  }

  render () {
    const {name, phone, address} = this.state

    return (
      <View style={styles.container}>
        <HeaderBar
          topTitle='Add New'
          title='Client'
          scrollOffsetY={this.state.scrollOffsetY}
        />
        <Content padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>
          <Form>
            <View style={styles.section}>
              <Text style={styles.sectionText}>Name / Organization</Text>
              <Item regular>
                <Icon active name='ios-person' />
                <Input
                  defaultValue={name}
                  onChangeText={name => this.setState({ name })}
                  onSubmitEditing={() => {this.phoneInput._root.focus()}}
                  returnKeyType='next'
                />
              </Item>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>Phone Number</Text>
              <Item regular>
                <Icon active name='ios-call' />
                <Input
                  ref={ref => {this.phoneInput = ref}}
                  defaultValue={phone}
                  onChangeText={phone => this.setState({ phone })}
                  onSubmitEditing={() => {this.addressInput._root.focus()}}
                  returnKeyType='next'
                  keyboardType='phone-pad'
                />
              </Item>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>Address</Text>
              <Item regular>
                <Icon active name='ios-navigate' />
                <Input
                  ref={ref => {this.addressInput = ref}}
                  multiline
                  style={styles.textarea}
                  defaultValue={address}
                  onChangeText={address => this.setState({ address })}
                  returnKeyType='go'
                  onSubmitEditing={this.handleSubmit.bind(this)}
                />
              </Item>
            </View>
            <Button block onPress={this.handleSubmit.bind(this)}>
              <NBText>Submit</NBText>
            </Button>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)
