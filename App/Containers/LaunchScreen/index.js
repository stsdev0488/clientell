import React, { Component } from 'react'
import { ScrollView, Text, Image, View, AsyncStorage } from 'react-native'
import { Images } from 'Themes/'
import { Content, Form, Item, Input, Button } from 'native-base';

// Styles
import styles from './styles'

export default class LaunchScreen extends Component {
  _signIn = async () => {
    await AsyncStorage.setItem('userToken', 'abcdefg')
    this.props.navigation.navigate('App');
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Content style={styles.container}>
          <View style={styles.logoWrapper}>
            <Text style={{fontSize: 40, textAlign: 'center'}}>Clientell</Text>
          </View>

          <Form style={styles.loginForm}>
            <Item style={styles.loginItem}>
              <Input placeholder="Email" />
            </Item>
            <Item style={styles.loginItem}>
              <Input placeholder="Password" secureTextEntry />
            </Item>

            <Button block bordered success style={styles.loginButton} onPress={() => this._signIn()}>
              <Text>Sign in</Text>
            </Button>

            <Button block bordered primary style={styles.loginButton} onPress={() => this.props.navigation.navigate('SignUpScreen')}>
              <Text>Sign up</Text>
            </Button>
          </Form>
        </Content>
      </View>
    )
  }
}
