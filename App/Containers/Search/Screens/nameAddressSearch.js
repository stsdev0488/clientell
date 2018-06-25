import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner, Label } from 'native-base'
import ErrorRenderer from 'Components/ErrorRenderer'
import {formDiscardHandler} from 'Lib/Utils'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

// Redux action
import SearchAction from 'Redux/SearchRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'

class Search extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarOnPress: formDiscardHandler,
      tabBarLabel: 'Search Clients',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'ios-search'}
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

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Search',
      rightBtnIcon: 'ios-search',
      rightBtnPress: () => this._executeSearch(),
      rightBtnLoading: false,
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching && this.props.navigation.isFocused()) {
      this.props.navigation.setParams({rightBtnLoading: false})
      if (!newProps.error) {
        if (newProps.data) {
          if (newProps.data.results.length > 0 || newProps.data.resultsNoReview.length > 0) {
            const { first_name, last_name } = this.state
            this.props.navigation.navigate('SearchResults', {data: newProps.data, searchKey: first_name + ' ' + last_name})
          } else {
            this.setState({error: {message: 'Your search did not yield any results.'}})
          }
        }
      }
    }
  }

  _executeSearch = () => {
    const { first_name, last_name, city, state, address: street_address } = this.state

    if(first_name && last_name && city && state) {
      this.setState({error: null})
      this.props.navigation.setParams({rightBtnLoading: true})
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
    } else {
      let e = []

      if (!first_name) e.push('First Name is required')
      if (!last_name) e.push('Last Name is required')
      if (!city) e.push('City is required')
      if (!state) e.push('State is required')

      this.setState({error: e})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <ErrorRenderer error={this.props.error || this.state.error} />
          </View>

          <View style={styles.screenTopContent}>
            <Icon name='ios-search-outline' style={styles.topContentIcon} />
            <Text style={styles.upperContentText} uppercase>By name and address</Text>
          </View>

          <View style={[styles.section, {marginTop: 25}]}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Last name</Label>
              <Input
                ref={ref => this.lnameInput = ref}
                placeholder=''
                onChangeText={last_name => this.setState({ last_name })}
                onSubmitEditing={() => {this.fnameInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                error={this.state.error && !this.state.last_name}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>First name</Label>
              <Input
                ref={ref => this.fnameInput = ref}
                placeholder=''
                onChangeText={first_name => this.setState({ first_name })}
                onSubmitEditing={() => {this.cityInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                error={this.state.error && !this.state.first_name}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>City</Label>
              <Input
                ref={ref => this.cityInput = ref}
                placeholder=''
                onChangeText={city => this.setState({ city })}
                onSubmitEditing={() => {this.stateInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                error={this.state.error && !this.state.city}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>State</Label>
              <Input
                ref={ref => this.stateInput = ref}
                placeholder=''
                onChangeText={state => this.setState({ state })}
                onSubmitEditing={() => {this.streetInput._root.focus()}}
                returnKeyType='next'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                error={this.state.error && !this.state.state}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Street address</Label>
              <Input
                ref={ref => this.streetInput = ref}
                placeholder=''
                onChangeText={address => this.setState({ address })}
                onSubmitEditing={this._executeSearch.bind(this)}
                returnKeyType='search'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
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
