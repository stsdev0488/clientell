import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from './styles'

class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-settings-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render () {
    return (
      <Content style={styles.container}>
        <Text style={styles.titleText}>Settings</Text>

        <View style={{margin: 20}}>
          <Button primary block bordered onPress={this._signOut}>
            <Text>Logout</Text>
          </Button>
        </View>
      </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
