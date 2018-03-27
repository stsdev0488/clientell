import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText} from 'native-base'
import StepIndicator from 'react-native-step-indicator'
import ErrorRenderer from 'Components/ErrorRenderer'
import * as Animatable from 'react-native-animatable'

import HeaderBar from 'Components/HeaderBar'

// Redux
import ClientActions from 'Redux/ClientRedux'

// Styles
import styles from './styles'

// Steps
import PersonalInfoStep from './steps/personal'
import AddressStep from './steps/address'
import BillingStep from './steps/billing'
import RatingStep from './steps/initialScore'

import { parseEditClient } from 'Lib/Utils'

const labels = ['Personal Info', 'Address', 'Rating']
const labelsOrg = ['Personal Info', 'Address', 'Billing', 'Rating']

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

  constructor (props) {
    super(props)
    const c = this.props.navigation.getParam('client')
    if (c) {
      this.state = parseEditClient(c)
    } else {
      this.state = {
        clientType: 'individual',
        scrollOffsetY: 0,
        currentPosition: 0,
        personalData: {
          organization_name: '',
          first_name: '',
          last_name: '',
          middle_name: '',
          email: ''
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
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching && this.props.navigation.isFocused()) {
      if (!newProps.error) {
        const client = this.props.navigation.getParam('client')
        if (!client) {
          this.props.clients()
          this.props.navigation.navigate('Clients')
        } else {
          this.props.clients()
          this.props.navigation.goBack()
        }
      }
    }
  }

  handleSubmit (initialRating) {
    Keyboard.dismiss()

    const client = this.props.navigation.getParam('client')
    if (!client) {
      this.props.addClient({...this.state.clientData, initial_star_rating: initialRating}, 0)
    } else {
      this.props.addClient({...this.state.clientData, initial_star_rating: initialRating}, client.id)
    }
  }

  _submitStepInfo = (data) => {
    this.scrollBar.scrollTo({x: 0, y: 0, animated: false})

    this.setState(state => {
      state.clientData = {...state.clientData, ...data}
      return state
    })

    this.setState(state => {
      const count = this.state.clientType === 'individual' ? 3 : 4

      if ((state.currentPosition + 1) < count) {
        state.currentPosition = state.currentPosition + 1
      }
      return state
    })
  }

  _stepPressed = (number) => {
    this.setState({currentPosition: number})
  }

  _renderBilling = () => {
    if (this.state.clientType === 'organization' && this.state.currentPosition === 2) {
      return (
        <Animatable.View animation='fadeInUp' duration={400}>
          <BillingStep
            initialData={this.state.billingData}
            submitInfo={
                    (d) => {
                      this.setState({billingData: d})
                      this._submitStepInfo(d)
                    }
                  }
          />
        </Animatable.View>
      )
    }
  }

  _renderRating = () => {
    if (this.state.clientType === 'organization' && this.state.currentPosition === 3) {
      return (
        <Animatable.View animation='fadeInUp' duration={400}>
          <RatingStep
            initialData={this.state.ratingData}
            submitInfo={
                  (d) => {
                    this.setState({ratingData: {initial_star_rating: d}})
                    this.handleSubmit(d)
                  }
                }
          />
        </Animatable.View>
      )
    } else if (this.state.clientType !== 'organization' && this.state.currentPosition === 2) {
      return (
        <Animatable.View animation='fadeInUp' duration={400}>
          <RatingStep
            initialData={this.state.ratingData}
            submitInfo={
                  (d) => {
                    this.setState({ratingData: {initial_star_rating: d}})
                    this.handleSubmit(d)
                  }
                }
          />
        </Animatable.View>
      )
    }
  }

  render () {
    const client = this.props.navigation.getParam('client')
    return (
      <View style={styles.container}>
        {client ?
          <HeaderBar
            title={'Edit Client'}
            leftBtnIcon='ios-arrow-back'
            leftBtnPress={() => this.props.navigation.goBack(null)}
          /> : null
        }


        <Content innerRef={ref => { this.scrollBar = ref }} padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>
          {!client ?
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>Add Client</Text>
            </View> : null
          }

          <StepIndicator
            stepCount={this.state.clientType === 'individual' ? 3 : 4}
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={this.state.clientType === 'individual' ? labels : labelsOrg}
            onPress={this._stepPressed}
          />

          <ErrorRenderer error={this.props.error} />

          {this.state.currentPosition === 0 &&
            <Animatable.View animation='fadeInUp' duration={400}>
              <PersonalInfoStep
                clientTypeChanged={ct => this.setState({clientType: ct})}
                initialData={{...this.state.personalData, client_type: this.state.clientType}}
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
              <AddressStep
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

          {this._renderBilling()}

          {this._renderRating()}
          
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
    addClient: (data, edit) => dispatch(ClientActions.addClient(data, edit)),
    clients: () => {dispatch(ClientActions.clientRequest())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)
