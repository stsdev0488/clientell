import React, { Component } from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text } from 'native-base'

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
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-settings-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  state = {
    street_address: '',
    street_address2: '',
    city: '',
    state: '',
    postal_code: '',
    email: '',
    business_url: '',
    facebook_url: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _submitChanges = () => {
    const formData = new FormData()
    const { user } = this.props

    formData.append('street_address', this.state.street_address || user.street_address)
    formData.append('street_address2', this.state.street_address2 || user.street_address2)
    formData.append('city', this.state.city || user.city)
    formData.append('state', this.state.state || user.state)
    formData.append('postal_code', this.state.postal_code || user.postal_code)
    formData.append('email', this.state.email || user.email)
    formData.append('business_url', this.state.business_url || user.business_url)
    formData.append('facebook_url', this.state.facebook_url || user.facebook_url)
    formData.append('phone_number', this.main_phone.getPhoneNumber())
    formData.append('phone_number_ext', this.main_phone.getCountryCode())
    formData.append('alt_phone_number', this.alt_phone.getPhoneNumber())
    formData.append('alt_phone_number_ext', this.alt_phone.getCountryCode())

    this.props.update(formData)
  }

  render () {
    const { user, saving, error } = this.props

    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Contact Information</Text>
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
            defaultValue={user.street_address || ''}
            onChangeText={street_address => this.setState({street_address})}
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Street address 2</Text>
          <Input
            defaultValue={user.street_address2 || ''}
            onChangeText={street_address2 => this.setState({street_address2})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>City</Text>
          <Input
            defaultValue={user.city || ''}
            onChangeText={city => this.setState({city})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>State</Text>
          <Input
            defaultValue={user.state || ''}
            onChangeText={state => this.setState({state})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Postal Code</Text>
          <Input
            defaultValue={user.postal_code || ''}
            onChangeText={postal_code => this.setState({postal_code})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Email</Text>
          <Input
            defaultValue={user.email || ''}
            onChangeText={email => this.setState({email})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Business URL</Text>
          <Input
            defaultValue={user.business_url || ''}
            onChangeText={business_url => this.setState({business_url})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Facebook URL</Text>
          <Input
            defaultValue={user.facebook_url || ''}
            onChangeText={facebook_url => this.setState({facebook_url})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Twitter URL</Text>
          <Input
            defaultValue={user.twitter_url || ''}
            onChangeText={twitter_url => this.setState({twitter_url})}
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
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data || {},
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
