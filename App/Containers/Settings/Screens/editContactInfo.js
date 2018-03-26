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
    tabBarLabel: 'Search Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-search-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  state = {
    first_name: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _submitChanges = () => {
    const formData = new FormData()

    formData.append('first_name', this.state.first_name)

    // this.props.update(formData)
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
          <PhoneInput ref={ref => { this.main_phone = ref }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Alternate Phone Number</Text>
          <PhoneInput ref={ref => { this.alt_phone = ref }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Street address</Text>
          <Input
            defaultValue={user.street_address || ''}
            onChangeText={street_address => this.setState({street_address})}
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
