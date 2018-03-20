import React, { Component } from 'react'
import { ScrollView, Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Content, Form, Item, Input, Button } from 'native-base';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from './styles'

class SignUpScreen extends Component {
  _signIn = async () => {
    await AsyncStorage.setItem('userToken', 'abcdefg')
    this.props.navigation.navigate('App');
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Content style={styles.container}>
          <View style={styles.logoWrapper}>
            <Text style={{fontSize: 40, textAlign: 'center'}}>Register</Text>
          </View>

          <Form style={styles.loginForm}>
            <Item style={styles.loginItem}>
              <Input placeholder="First name" />
            </Item>
            <Item style={styles.loginItem}>
              <Input placeholder="Last name" />
            </Item>
            <Item style={styles.loginItem}>
              <Input placeholder="Email" />
            </Item>
            <Item style={styles.loginItem}>
              <Input placeholder="Password" secureTextEntry />
            </Item>
            <Item style={styles.loginItem}>
              <Input placeholder="Confirm password" secureTextEntry />
            </Item>

            <Button block bordered success style={styles.loginButton} onPress={() => this._signIn()}>
              <Text>Submit</Text>
            </Button>

            <View style={styles.section}>
              <Button warning block transparent onPress={() => this.props.navigation.goBack()}>
                <Text>Back</Text>
              </Button>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
