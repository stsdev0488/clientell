import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner } from 'native-base'
import ErrorRenderer from 'Components/ErrorRenderer'

// Redux action
import SearchAction from 'Redux/SearchRedux'

// Styles
import styles from '../styles'

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
    last_name: '',
    city: '',
    state: '',
    address: '',
    error: null
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching) {
      if (!newProps.error) {
        if (newProps.data) {
          if (newProps.data.data.length > 0) {
            const { first_name, last_name } = this.state
            this.props.navigation.navigate('SearchResults', {results: newProps.data.data, searchKey: first_name + ' ' + last_name})
          } else {
            this.setState({error: {message: 'Your search did not yield any results.'}})
          }
        }
      }
    }
  }

  _executeSearch = () => {
    const { first_name, last_name, city, state, address: street_address } = this.state

    this.setState({error: null})
    this.props.searchClient(
      {
        search_by: 'name and address',
        first_name,
        last_name,
        city,
        state,
        street_address
      }
    )
  }

  render () {
    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Search</Text>
          <Text style={styles.subTitleText}>by name and address</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Last name</Text>
          <Item regular>
            <Input
              ref={ref => this.lnameInput = ref}
              placeholder=''
              onChangeText={last_name => this.setState({ last_name })}
              onSubmitEditing={() => {this.fnameInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>First name</Text>
          <Item regular>
            <Input
              ref={ref => this.fnameInput = ref}
              placeholder=''
              onChangeText={first_name => this.setState({ first_name })}
              onSubmitEditing={() => {this.cityInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>City</Text>
          <Item regular>
            <Input
              ref={ref => this.cityInput = ref}
              placeholder=''
              onChangeText={city => this.setState({ city })}
              onSubmitEditing={() => {this.stateInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>State</Text>
          <Item regular>
            <Input
              ref={ref => this.stateInput = ref}
              placeholder=''
              onChangeText={state => this.setState({ state })}
              onSubmitEditing={() => {this.streetInput._root.focus()}}
              returnKeyType='next'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Street address</Text>
          <Item regular>
            <Input
              ref={ref => this.streetInput = ref}
              placeholder=''
              onChangeText={address => this.setState({ address })}
              onSubmitEditing={this._executeSearch.bind(this)}
              returnKeyType='search'
            />
          </Item>
        </View>

        <View style={styles.section}>
          <ErrorRenderer error={this.props.error || this.state.error} />
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => this._executeSearch()}>
            {this.props.fetching === true && <Spinner />}
            <Text>Search</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Button warning block transparent onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </Button>
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.search.fetching,
    error: state.search.error,
    data: state.search.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchClient: (value) => dispatch(SearchAction.searchRequest(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
