import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Linking, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Content, Button, Text } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from './styles'
import { Images } from 'Themes/'

class Modal extends Component {
  static navigationOptions = {
    header: null
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _enableSetting = () => {
    Linking.openURL('App-Prefs:')
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.titleText}>Call Identification is disabled</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.screenText}>
              App detected that your call identification setting is disabled, enabling this will allow the app to identify potential clients in your list and show their rating on the call screen.
            </Text>

            <Text style={[styles.screenText, {marginTop: 10}]}>
              You can enable this via <Text style={{fontWeight: 'bold', color: '#37b2ea'}}>Settings > Phone > Call Blocking & Identification</Text>, and then toggle on "Clientell"
            </Text>
          </View>

          <View style={[styles.section, {flexDirection: 'row', justifyContent: 'space-around', width: '100%'}]}>
            <Button error onPress={() => this.props.navigation.goBack()}><Text> Ok </Text></Button>

            {Platform.OS === 'ios' &&
              <Button success onPress={() => this._enableSetting()}><Text> Enable </Text></Button>
            }
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
