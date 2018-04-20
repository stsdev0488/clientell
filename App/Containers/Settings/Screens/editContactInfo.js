import React, { Component } from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text } from 'native-base'
import Picker from 'Lib/CustomPicker'

import Secrets from 'react-native-config'

// Redux actions
import UserActions from 'Redux/UserRedux'

import Input from 'Components/Input'
import PhoneInput from 'Components/PhoneInput'
import ErrorRenderer from 'Components/ErrorRenderer'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-home-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  user = this.props.navigation.getParam('user')

  state = {
    street_address: this.user.street_address || '',
    street_address2: this.user.street_address2 || '',
    city: this.user.city || '',
    state: this.user.state || '',
    postal_code: this.user.postal_code || '',
    email: this.user.email || '',
    business_url: this.user.business_url || '',
    facebook_url: this.user.facebook_url || '',
    country_id: this.user.country_id || 0,
    countries: []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentWillMount () {
    this._getCountries()
  }

  _getCountries = async () => {
    const cc = await (await fetch(Secrets.API_URL + 'country')).json()
    this.setState({countries: [{name: 'Select Country', id: 0}, ...cc.data]})
  }

  _submitChanges = () => {
    const formData = new FormData()
    const { user } = this.props

    formData.append('street_address', this.state.street_address)
    formData.append('street_address2', this.state.street_address2)
    formData.append('city', this.state.city)
    formData.append('state', this.state.state)
    formData.append('postal_code', this.state.postal_code)
    formData.append('email', this.state.email)
    formData.append('phone_number', this.main_phone.getPhoneNumber())
    formData.append('phone_number_ext', this.main_phone.getCountryCode())
    formData.append('alt_phone_number', this.alt_phone.getPhoneNumber())
    formData.append('alt_phone_number_ext', this.alt_phone.getCountryCode())

    if (this.state.country_id)
      formData.append('country_id', this.state.country_id)

    if (this.state.business_url)
      formData.append('business_url', this.state.business_url)

    if (this.state.facebook_url)
      formData.append('facebook_url', this.state.facebook_url)

    if (this.state.twitter_url)
      formData.append('twitter_url', this.state.twitter_url)

    this.props.update(formData)
  }

  _onChangeCountry = (a) => {
    this.setState({country_id: a})
  }

  render () {
    const { saving, error } = this.props
    const user = this.user
    const {country_id: country} = this.state
    const countryName = (this.state.countries).find(ccc => ccc.id == country)

    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Contact Information</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Country <Text style={styles.sup}>*</Text></Text>
          <TouchableOpacity
            style={{height: 50}}
            onPress={() => this.picker.show()}
          >
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
              {countryName ? countryName.name : 'Select country'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Phone Number</Text>
          <PhoneInput
            ref={ref => { this.main_phone = ref }}
            value={user.phone_number ? user.phone_number : '+1'}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Alternate Phone Number</Text>
          <PhoneInput
            ref={ref => { this.alt_phone = ref }}
            value={user.alt_phone_number ? user.alt_phone_number : '+1'}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Street address</Text>
          <Input
            bref={ref => this.streetInput = ref}
            defaultValue={user.street_address || ''}
            onChangeText={street_address => this.setState({street_address})}
            required
            onSubmitEditing={() => {this.street2Input._root.focus()}}
            returnKeyType='next'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Street address 2</Text>
          <Input
            bref={ref => this.street2Input = ref}
            defaultValue={user.street_address2 || ''}
            onChangeText={street_address2 => this.setState({street_address2})}
            onSubmitEditing={() => {this.cityInput._root.focus()}}
            returnKeyType='next'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>City</Text>
          <Input
            bref={ref => this.cityInput = ref}
            defaultValue={user.city || ''}
            onChangeText={city => this.setState({city})}
            onSubmitEditing={() => {this.stateInput._root.focus()}}
            returnKeyType='next'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>State</Text>
          <Input
            bref={ref => this.stateInput = ref}
            defaultValue={user.state || ''}
            onChangeText={state => this.setState({state})}
            onSubmitEditing={() => {this.postalInput._root.focus()}}
            returnKeyType='next'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Postal Code</Text>
          <Input
            bref={ref => this.postalInput = ref}
            defaultValue={user.postal_code || ''}
            onChangeText={postal_code => this.setState({postal_code})}
            onSubmitEditing={() => {this.emailInput._root.focus()}}
            returnKeyType='next'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Email</Text>
          <Input
            bref={ref => this.emailInput = ref}
            defaultValue={user.email || ''}
            onChangeText={email => this.setState({email})}
            onSubmitEditing={() => {this.businessInput._root.focus()}}
            returnKeyType='next'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Business URL</Text>
          <Input
            bref={ref => this.businessInput = ref}
            defaultValue={user.business_url || ''}
            onChangeText={business_url => this.setState({business_url})}
            onSubmitEditing={() => {this.fbInput._root.focus()}}
            returnKeyType='next'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Facebook URL</Text>
          <Input
            bref={ref => this.fbInput = ref}
            defaultValue={user.facebook_url || ''}
            onChangeText={facebook_url => this.setState({facebook_url})}
            onSubmitEditing={() => {this.twitterInput._root.focus()}}
            returnKeyType='next'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Twitter URL</Text>
          <Input
            bref={ref => this.twitterInput = ref}
            defaultValue={user.twitter_url || ''}
            onChangeText={twitter_url => this.setState({twitter_url})}
            autoCapitalize='none'
          />
        </View>

        <View style={styles.section}>
          <ErrorRenderer error={error} />
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => this._submitChanges()}>
            <Text>Update</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Button disabled={saving} warning block transparent onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </Button>
        </View>

        <Picker
          ref={ref => {
            this.picker = ref;
          }}
          selectedOption={country}
          onSubmit={(a) => this._onChangeCountry(a)}
          options={this.state.countries || []}
        />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.user.updating,
    error: state.user.updateError || null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
