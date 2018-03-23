import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import StepIndicator from 'react-native-step-indicator'
import ErrorRenderer from 'Components/ErrorRenderer'
import * as Animatable from 'react-native-animatable'

// Redux
import ClientActions from 'Redux/ClientRedux'

// Styles
import styles from './styles'

// Steps
import PersonalInfoStep from './steps/personal'
import AddressStep from './steps/address'
import BillingStep from './steps/billing'
import RatingStep from './steps/initialScore'

const AnimatedPersonalInfoStep = Animatable.createAnimatableComponent(PersonalInfoStep);
const AnimatedAddressStep = Animatable.createAnimatableComponent(AddressStep);
const AnimatedBillingStep = Animatable.createAnimatableComponent(BillingStep);
const AnimatedRatingStep = Animatable.createAnimatableComponent(RatingStep);

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
    currentPosition: 0,
    personalData: {
      client_type: 'individual',
      organization_name: '',
      first_name: '',
      last_name: '',
      middle_name: ''
    },
    addressData: {
      street_address: '',
      street_address2: '',
      city: '',
      state: '',
      postal_code: ''
    },
    billingData: {
      billing_first_name: '',
      billing_middle_name: '',
      billing_last_name: '',
      billing_street_address: '',
      billing_street_address2: '',
      billing_city: '',
      billing_state: '',
      billing_postal_code: ''
    },
    ratingData: {
      initial_star_rating: 3
    },
    clientData: {}
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching) {
      if (!newProps.error) {
        this.props.navigation.navigate('Clients')
      }
    }
  }

  handleSubmit (initialRating) {
    Keyboard.dismiss()
    this.props.addClient({...this.state.clientData, star_rating: initialRating})
  }

  _submitStepInfo = (data) => {
    this.scrollBar.scrollTo({x: 0, y: 0, animated: false})

    this.setState(state => {
      state.clientData = {...state.clientData, ...data}
      return state
    })

    this.setState(state => {
      if ((state.currentPosition + 1) < 4) {
        state.currentPosition = state.currentPosition + 1
      }
      return state
    })
  }

  _stepPressed = (number) => {
    this.setState({currentPosition: number})
  }

  render () {
    const {name, phone, address} = this.state

    return (
      <View style={styles.container}>
        <Content innerRef={ref => { this.scrollBar = ref }} padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Add Client</Text>
          </View>

          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
            onPress={this._stepPressed}
          />

          <ErrorRenderer error={this.props.error} />

          {this.state.currentPosition === 0 &&
            <Animatable.View animation='fadeInUp' duration={400}>
              <PersonalInfoStep
                initialData={this.state.personalData}
                submitInfo={
                  (d) => {
                  console.tron.log(d)
                    this.setState({personalData: d})
                    this._submitStepInfo(d)
                  }
                }
              />
            </Animatable.View>
          }

          {this.state.currentPosition === 1 &&
            <Animatable.View animation='fadeInUp' duration={400}>
              <AnimatedAddressStep
                initialData={this.state.addressData}
                submitInfo={
                  (d) => {
                    this.setState({addressData: d})
                    this._submitStepInfo(d)
                  }
                }
              />
            </Animatable.View>
          }

          {this.state.currentPosition === 2 &&
            <Animatable.View animation='fadeInUp' duration={400}>
              <AnimatedBillingStep
                initialData={this.state.billingData}
                submitInfo={
                  (d) => {
                    this.setState({addressData: d})
                    this._submitStepInfo(d)
                  }
                }
              />
            </Animatable.View>
          }

          {this.state.currentPosition === 3 &&
            <Animatable.View animation='fadeInUp' duration={400}>
              <AnimatedRatingStep
                initialData={this.state.ratingData}
                submitInfo={
                  (d) => {
                    this.setState({ratingData: d})
                    this.handleSubmit(d)
                  }
                }
              />
            </Animatable.View>
          }
          
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.client.addingClient,
    error: state.client.addError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (data) => dispatch(ClientActions.addClient(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)
