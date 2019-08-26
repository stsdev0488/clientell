import React, { Component } from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Content, Icon, Button, Text, Label, Input, Item, Form} from 'native-base'
import Picker from 'Lib/CustomPicker'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import Secrets from 'react-native-config'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

import PhoneInput from 'Components/PhoneInput'
import ErrorRenderer from 'Components/ErrorRenderer'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

class Search extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'ios-home'}
          size={20}
          style={{color: tintColor, fontSize: 25}}
        />
      ),
      header: (a) => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  user = this.props.navigation.getParam('user')

  state = {
    phone_number: this.user.phone_number || '',
    alt_phone_number: this.user.alt_phone_number || '',
    street_address: this.user.street_address || '',
    street_address2: this.user.street_address2 || '',
    city: this.user.city || '',
    state: this.user.state || '',
    postal_code: this.user.postal_code || '',
    email: this.user.email || '',
    business_url: this.user.business_url || '',
    facebook_url: this.user.facebook_url || '',
    country_id: 840,
    countries: []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Contact Information',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })

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
    formData.append('phone_number', this.state.phone_number)
    // formData.append('phone_number_ext', this.main_phone.getCountryCode())
    formData.append('alt_phone_number', this.state.alt_phone_number)
    // formData.append('alt_phone_number_ext', this.alt_phone.getCountryCode())

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
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          {
            // <View style={styles.sectionForm}>
            //   <Text style={styles.sectionText}>Country <Text style={styles.sup}>*</Text></Text>
            //   <TouchableOpacity
            //     style={{height: 50}}
            //     onPress={() => this.picker.show()}
            //   >
            //     <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 8, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd'}}>
            //       {countryName ? countryName.name : 'Select country'}
            //     </Text>
            //   </TouchableOpacity>
            // </View>
          }
          <Form style={{paddingVertical: 20, paddingHorizontal: 15}}>
            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.phone._root.focus()}>
                <Label style={styles.sectionFormText}>Phone Number <Text uppercase style={styles.sup}>*</Text></Label>
                {
                  // <PhoneInput
                  //   ref={ref => { this.main_phone = ref }}
                  //   value={user.phone_number ? user.phone_number : '+1'}
                  // />
                }

                <Input
                  ref={ref => {this.phone = ref}}
                  defaultValue={this.state.phone_number ? this.state.phone_number : ''}
                  onChangeText={phone_number => this.setState({ phone_number })}
                  keyboardType='phone-pad'
                  onSubmitEditing={() => {this.phone_alternate.focus()}}
                  returnKeyType='next'
                  autoCapitalize='none'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.phone_alternate._root.focus()}>
                <Label style={styles.sectionFormText}>Alternate Phone Number</Label>
                {
                  // <PhoneInput
                  //   ref={ref => { this.alt_phone = ref }}
                  //   value={user.alt_phone_number ? user.alt_phone_number : '+1'}
                  // />
                }

                <Input
                  ref={ref => {this.phone_alternate = ref}}
                  defaultValue={this.state.alt_phone_number ? this.state.alt_phone_number : ''}
                  onChangeText={alt_phone_number => this.setState({ alt_phone_number })}
                  keyboardType='phone-pad'
                  onSubmitEditing={() => {this.phone_alternate.focus()}}
                  returnKeyType='next'
                  autoCapitalize='none'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.streetInput._root.focus()}>
                <Label style={styles.sectionFormText}>Street address <Text uppercase style={styles.sup}>*</Text></Label>
                <Input
                  ref={ref => this.streetInput = ref}
                  defaultValue={user.street_address || ''}
                  onChangeText={street_address => this.setState({street_address})}
                  required
                  onSubmitEditing={() => {this.street2Input._root.focus()}}
                  returnKeyType='next'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.street2Input._root.focus()}>
                <Label style={styles.sectionFormText}>Street address 2</Label>
                <Input
                  ref={ref => this.street2Input = ref}
                  defaultValue={user.street_address2 || ''}
                  onChangeText={street_address2 => this.setState({street_address2})}
                  onSubmitEditing={() => {this.cityInput._root.focus()}}
                  returnKeyType='next'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.cityInput._root.focus()}>
                <Label style={styles.sectionFormText}>City <Text uppercase style={styles.sup}>*</Text></Label>
                <Input
                  ref={ref => this.cityInput = ref}
                  defaultValue={user.city || ''}
                  onChangeText={city => this.setState({city})}
                  onSubmitEditing={() => {this.stateInput._root.focus()}}
                  returnKeyType='next'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.stateInput._root.focus()}>
                <Label style={styles.sectionFormText}>State <Text uppercase style={styles.sup}>*</Text></Label>
                <Input
                  ref={ref => this.stateInput = ref}
                  defaultValue={user.state || ''}
                  onChangeText={state => this.setState({state})}
                  onSubmitEditing={() => {this.postalInput._root.focus()}}
                  returnKeyType='next'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.postalInput._root.focus()}>
                <Label style={styles.sectionFormText}>Postal Code <Text uppercase style={styles.sup}>*</Text></Label>
                <Input
                  ref={ref => this.postalInput = ref}
                  defaultValue={user.postal_code || ''}
                  onChangeText={postal_code => this.setState({postal_code})}
                  onSubmitEditing={() => {this.emailInput._root.focus()}}
                  returnKeyType='next'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.emailInput._root.focus()}>
                <Label style={styles.sectionFormText}>Email <Text uppercase style={styles.sup}>*</Text></Label>
                <Input
                  ref={ref => this.emailInput = ref}
                  defaultValue={user.email || ''}
                  onChangeText={email => this.setState({email})}
                  onSubmitEditing={() => {this.businessInput._root.focus()}}
                  returnKeyType='next'
                  autoCapitalize='none'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.businessInput._root.focus()}>
                <Label style={styles.sectionFormText}>Business URL</Label>
                <Input
                  ref={ref => this.businessInput = ref}
                  defaultValue={user.business_url || ''}
                  onChangeText={business_url => this.setState({business_url})}
                  onSubmitEditing={() => {this.fbInput._root.focus()}}
                  returnKeyType='next'
                  autoCapitalize='none'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.fbInput.focus()}>
                <Label style={styles.sectionFormText}>Facebook URL</Label>
                <Input
                  ref={ref => this.fbInput = ref}
                  defaultValue={user.facebook_url || ''}
                  onChangeText={facebook_url => this.setState({facebook_url})}
                  onSubmitEditing={() => {this.twitterInput._root.focus()}}
                  returnKeyType='next'
                  autoCapitalize='none'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.sectionForm}>
              <Item fixedLabel onPress={() => this.twitterInput._root.focus()}>
                <Label style={styles.sectionFormText}>Twitter URL</Label>
                <Input
                  ref={ref => this.twitterInput = ref}
                  defaultValue={user.twitter_url || ''}
                  onChangeText={twitter_url => this.setState({twitter_url})}
                  autoCapitalize='none'
                  style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                />
              </Item>
            </View>

            <View style={styles.section}>
              <ErrorRenderer error={error} />
            </View>

            <View style={styles.section}>
              <Button primary block onPress={() => this._submitChanges()}>
                <Text>Update</Text>
              </Button>
            </View>
          </Form>

          <Picker
            ref={ref => {
              this.picker = ref;
            }}
            selectedOption={country}
            onSubmit={(a) => this._onChangeCountry(a)}
            options={this.state.countries || []}
          />
        </Content>
      </View>
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
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
