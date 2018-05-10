import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner } from 'native-base'
import ErrorRenderer from 'Components/ErrorRenderer'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

// Redux action
import SearchAction from 'Redux/SearchRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Search Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'search'}
        type="FontAwesome"
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
    if (this.props.fetching && !newProps.fetching && this.props.navigation.isFocused()) {
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
      <View style={styles.container}>
        <HeaderBar
          title={''}
          leftBtnIcon='ios-menu'
          leftBtnPress={() => this.props.openDrawer()}
        />

        <View style={styles.contentUpperBG} />

        <SubHeaderBar
          title='Search'
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
        />

        <View style={styles.section}>
          <Text uppercase uppercase style={styles.upperContentText}>By name and address</Text>
        </View>

        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <Text uppercase style={styles.sectionText}>Last name</Text>
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
            <Text uppercase style={styles.sectionText}>First name</Text>
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
            <Text uppercase style={styles.sectionText}>City</Text>
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
            <Text uppercase style={styles.sectionText}>State</Text>
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
            <Text uppercase style={styles.sectionText}>Street address</Text>
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
            <Button style={styles.appButton} primary block onPress={() => this._executeSearch()}>
              {this.props.fetching === true && <Spinner />}
              <Text uppercase>Search</Text>
            </Button>
          </View>
        </Content>
      </View>
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
    searchClient: (value) => dispatch(SearchAction.searchRequest(value)),
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
