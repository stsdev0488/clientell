import React, { Component } from 'react'
import { View, Text, Keyboard, Image } from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Icon, Form, Item, Input, Button, Label, Text as NBText, ActionSheet} from 'native-base'
import StepIndicator from 'react-native-step-indicator'
import ErrorRenderer from 'Components/ErrorRenderer'
import * as Animatable from 'react-native-animatable'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

// Redux
import ClientActions from 'Redux/ClientRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from './styles'

// Steps
import PersonalInfoStep from './steps/personal'
import AddressStep from './steps/address'
import BillingStep from './steps/billing'
import RatingStep from './steps/initialScore'

import { parseEditClient, parseClientError } from 'Lib/Utils'

const labels = ['Personal Info', 'Address', 'Rating']
const labelsOrg = ['Personal Info', 'Address', 'Billing', 'Rating']
const labelsEdit = ['Personal Info', 'Address']
const labelsOrgEdit = ['Personal Info', 'Address', 'Billing']

import { Colors, Images } from 'Themes/'

class AddClient extends Component {
  static navigationOptions = {
    tabBarLabel: 'Add Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-person-add-outline'}
        size={20}
        style={{color: tintColor, fontSize: 30}}
      />
    )
  }

  constructor (props) {
    super(props)
    const c = this.props.navigation.getParam('client')
    if (c) {
      this.state = parseEditClient(c)
    } else {
      this.state = this._resetForm()
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching && this.props.navigation.isFocused()) {
      if (!newProps.error) {
        const client = this.props.navigation.getParam('client')
        if (!client) {
          this.setState(state => {
            state = this._resetForm()
            return state
          })
          this.props.clients()
          this.props.navigation.navigate('Clients')
        } else {
          this.props.clients()
          this.props.navigation.goBack()
        }
      } else if (newProps.error) {
        const errors = parseClientError(newProps.error.errors || {}, this.state.clientType)
        if (errors[0].length) {
          this.setState({currentPosition: 0})
        } else if (errors[1].length) {
          this.setState({currentPosition: 1})
        } else if (errors[2].length) {
          this.setState({currentPosition: 2})
        }
      }
    }

    if (this.props.deleting && !newProps.deleting && this.props.navigation.isFocused()) {
      if (!newProps.deleteError) {
        this.props.navigation.popToTop()
      } else {
        this.props.navigation.navigate('AlertModal', {title: `Delete client failed`, message: `Please check your internet connection or try again later.`})
      }
    }
  }

  _resetForm = () => {
    return {
      clientType: 'individual',
      scrollOffsetY: 0,
      currentPosition: 0,
      personalData: {
        organization_name: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone_number_ext: '',
        alt_phone_number_ext: ''
      },
      addressData: {
        street_address: '',
        street_address2: '',
        country_id: 840,
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
        billing_postal_code: '',
        billing_phone_number_ext: ''
      },
      ratingData: {
        initial_star_rating: 4
      },
      clientData: {}
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
    const client = this.props.navigation.getParam('client')

    this.setState(state => {
      let count
      if (!client) {
        count = this.state.clientType === 'individual' ? 3 : 4
      } else {
        count = this.state.clientType === 'individual' ? 2 : 3
      }

      state.clientData = {...state.clientData, ...data}

      if ((state.currentPosition + 1) < count) {
        state.currentPosition = state.currentPosition + 1
      } else {
        if (!client) {
          this.props.addClient({...state.clientData}, 0)
        } else {
          this.props.addClient({...state.clientData}, client.id)
        }
      }
      return state
    })
  }

  _submitForm = () => {
    let billingData = {}
    const personalData = this.s1.getWrappedInstance()._submitDetails()
    const addressData = this.s2.getWrappedInstance()._handleSubmit()
    const ratingData = this.s4.getWrappedInstance()._handleSubmit()
    const client = this.props.navigation.getParam('client')

    if (this.s3) {
      billingData = this.s3._handleSubmit()
    }

    this.setState(state => {
      state.clientData = {...state.clientData, ...personalData, ...addressData, ...billingData, ...ratingData}

      if (!client) {
        this.props.addClient({...state.clientData}, 0)
      } else {
        this.props.addClient({...state.clientData}, client.id)
      }
      return state
    })
  }

  _stepPressed = (number) => {
    this.setState({currentPosition: number})
  }

  _renderBilling = () => {
    if (this.state.clientType === 'organization') {
      return (
        <Animatable.View animation='fadeInUp' duration={400}>
          <BillingStep
            ref={r => this.s3 = r}
            initialData={this.state.billingData}
            submitInfo={
              (d) => {
                console.tron.log(d)
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
    return (
      <Animatable.View animation='fadeInUp' duration={400}>
        <RatingStep
          ref={r => this.s4 = r}
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

  _showDeleteConfirm = () => {
    const BUTTONS = ["Delete", "Cancel"]
    const client = this.props.navigation.getParam('client')

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: "Delete this review?"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.deleteClient(client.id)
        }
      }
    )
  }

  render () {
    const client = this.props.navigation.getParam('client')
    const errors = parseClientError(this.props.error ? this.props.error.errors : {}, this.state.clientType)
    const currentErrors = errors[this.state.currentPosition] || null
    let stepLabels
    let sCount
    let subValues = {
      title: 'Add Client'
    }

    if (!client) {
      stepLabels = this.state.clientType === 'individual' ? labels : labelsOrg
      sCount = this.state.clientType === 'individual' ? 3 : 4
      subValues = {
        title: 'Add Client',
        rightBtnText: 'Submit',
        rightBtnPress: () => this._submitForm()
      }
    } else {
      stepLabels = this.state.clientType === 'individual' ? labelsEdit : labelsOrgEdit
      sCount = this.state.clientType === 'individual' ? 2 : 3
      subValues = {
        title: 'Edit Client',
        rightBtnIcon: 'ios-trash',
        rightBtnPress: () => this._showDeleteConfirm(),
        leftBtnIcon: 'ios-arrow-back',
        leftBtnPress: () => this.props.navigation.goBack(null)
      }
    }

    return (
      <View style={styles.container}>
        <HeaderBar
          title={''}
          leftBtnIcon='ios-menu'
          leftBtnPress={() => this.props.openDrawer()}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <SubHeaderBar
          {...subValues}
        />

        <Content style={[styles.mContainer]}innerRef={ref => { this.scrollBar = ref }} padder onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>
          <View style={{textAlign: 'center', alignItems: 'center'}}>
            <Image source={Images.user} style={styles.topImage} />
            <NBText uppercase>Personal details</NBText>
          </View>
          
          <View style={[styles.section, {paddingVertical: 0, marginBottom: 0}]}>
            <ErrorRenderer error={currentErrors} />
          </View>

          <Animatable.View animation='fadeInUp' duration={400}>
            <PersonalInfoStep
              ref={r => this.s1 = r}
              clientTypeChanged={ct => this.setState({clientType: ct})}
              initialData={{...this.state.personalData, client_type: this.state.clientType}}
              submitInfo={
                (d) => {
                  this.setState({personalData: d})
                  this._submitStepInfo(d)
                }
              }
            />
          </Animatable.View>

          <Animatable.View animation='fadeInUp' duration={400}>
            <AddressStep
              ref={r => this.s2 = r}
              initialData={this.state.addressData}
              submitInfo={
                (d) => {
                  this.setState({addressData: d})
                  this._submitStepInfo(d)
                }
              }
            />
          </Animatable.View>

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
    error: state.client.addError || null,
    deleting: state.client.deleting,
    deleteError: state.client.deleteError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (data, edit) => dispatch(ClientActions.addClient(data, edit)),
    deleteClient: (id) => {dispatch(ClientActions.deleteClient(id))},
    clients: () => {dispatch(ClientActions.clientRequest())},
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)
