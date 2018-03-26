import React, { Component } from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text } from 'native-base'

// Redux actions
import UserActions from 'Redux/UserRedux'

import Input from 'Components/Input'
import Picker from 'Components/Picker'
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
    first_name: '',
    middle_name: '',
    last_name: '',
    account_type: 'individual',
    company_name: '',
    description: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _submitChanges = () => {
    const formData = new FormData()

    formData.append('first_name', this.state.first_name)
    formData.append('middle_name', this.state.middle_name)
    formData.append('last_name', this.state.last_name)
    formData.append('account_type', this.state.account_type)
    formData.append('company_name', this.state.company_name)
    formData.append('description', this.state.description)

    this.props.update(formData)
  }

  render () {
    const { user, saving, error } = this.props

    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>

        <View style={styles.centered}>
          <Image source={Images.launch} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>First name</Text>
          <Input
            defaultValue={user.first_name || ''}
            onChangeText={first_name => this.setState({first_name})}
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Middle name / initial</Text>
          <Input
            defaultValue={user.middle_name || ''}
            onChangeText={middle_name => this.setState({middle_name})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Last name</Text>
          <Input
            defaultValue={user.last_name || ''}
            onChangeText={last_name => this.setState({last_name})}
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Type</Text>
          <Picker
            defaultValue={this.state.account_type}
            options={['individual', 'company']}
            onSelect={account_type => this.setState({account_type})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Company name</Text>
          <Input
            defaultValue={user.company_name || ''}
            onChangeText={company_name => this.setState({company_name})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Description</Text>
          <Input
            defaultValue={user.description || ''}
            onChangeText={description => this.setState({description})}
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
