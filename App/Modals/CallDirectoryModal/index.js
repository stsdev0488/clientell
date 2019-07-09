import React, { Component } from 'react'
import { View, NativeModules, Linking, Platform, PermissionsAndroid } from 'react-native'
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

  _enableSetting = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:')
      this.props.navigation.goBack()
    } else {
      NativeModules.CallDetection.overlayPermission(async (data) => {
        if (data.enabled) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            {
              title: 'Clientell Read Phone Permission',
              message:
                'ClienTell would like to read incoming phone calls ' +
                'so we could display client related from your contact list',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          )

          const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
              title: 'Clientell Read Call Log Permission',
              message:
                'Clientell would like to read your call log ' +
                'so we could display client related from your contact list',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          )
        }
      })
    }
  }

  _onOk = () => {
    if (Platform.OS === 'ios') {
      this.props.navigation.goBack()
    } else {
      NativeModules.CallDetection.checkEnabled(async (data) => {
        if (data.enabled) {
          const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)

          if (!check) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
              {
                title: 'Clientell Read Phone State',
                message:
                  'Clientell would like to read incoming phone calls ' +
                  'so we could display client related from your contact list',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            )

            const granted2 = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
              {
                title: 'Clientell Read Call Log Permission',
                message:
                  'Clientell would like to read your call log ' +
                  'so we could display client related from your contact list',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED && granted2 === PermissionsAndroid.RESULTS.GRANTED) {
              this.props.navigation.goBack()
            } else {
              this.props.navigation.goBack()
            }
          } else {
            this.props.navigation.goBack()
          }
        } else {
          this.props.navigation.goBack()
        }
      })
    }
  }

  _renderIdentificationMsg = () => {
    if (Platform.OS === 'ios') {
      return (
        <Text style={[styles.screenText, {marginTop: 10}]}>
          You can enable this via <Text style={{fontWeight: 'bold', color: '#37b2ea'}} onPress={() => this._enableSetting()}>Settings > Phone > Call Blocking & Identification</Text>, and then toggle on "Clientell"
        </Text>
      )
    } else {
      return (
        <Text style={[styles.screenText, {marginTop: 10}]}>
          You can enable this <Text style={{fontWeight: 'bold', color: '#37b2ea'}} onPress={() => this._enableSetting()}>HERE</Text>
        </Text>
      )
    }
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

            {this._renderIdentificationMsg()}
          </View>

          <View style={[styles.section, {flexDirection: 'row', justifyContent: 'space-around', width: '100%'}]}>
            <Button error onPress={() => this._onOk()}><Text> Ok </Text></Button>
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
