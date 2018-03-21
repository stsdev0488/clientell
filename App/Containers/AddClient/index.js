import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import StepIndicator from 'react-native-step-indicator'

// Styles
import styles from './styles'

// Steps
import PersonalInfoStep from './steps/personal'
import AddressStep from './steps/address'
import BillingStep from './steps/billing'
import RatingStep from './steps/initialScore'

const labels = ['Personal Info', 'Address', 'Billing', 'Rating']
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

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
    address: '',
    currentPosition: 0
  }

  handleSubmit () {
    Keyboard.dismiss()
    console.tron.log('Submit!')
  }

  _submitStepInfo = () => {
    this.setState(state => {
      if ((state.currentPosition + 1) < 4) {
        state.currentPosition = state.currentPosition + 1
      }
      return state
    })
  }

  render () {
    const {name, phone, address} = this.state

    return (
      <View style={styles.container}>
        <Content padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Add Client</Text>
          </View>

          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
          />

          {this.state.currentPosition === 0 &&
            <PersonalInfoStep submitInfo={(d) => this._submitStepInfo(d)} />
          }

          {this.state.currentPosition === 1 &&
            <AddressStep submitInfo={(d) => this._submitStepInfo(d)} />
          }

          {this.state.currentPosition === 2 &&
            <BillingStep submitInfo={(d) => this._submitStepInfo(d)} />
          }

          {this.state.currentPosition === 3 &&
            <RatingStep submitInfo={(d) => this._submitStepInfo(d)} />
          }
          
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
