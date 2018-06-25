import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner, Label } from 'native-base'
import ErrorRenderer from 'Components/ErrorRenderer'
import {formDiscardHandler} from 'Lib/Utils'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'

// Redux action
import SearchAction from 'Redux/SearchRedux'

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
    email: '',
    error: null
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.clearErrors()
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
            this.props.navigation.navigate('SearchResults', {data: newProps.data, searchKey: this.state.email})
          } else {
            this.setState({error: {message: 'Your search did not yield any results.'}})
          }
        }
      }
    }
  }

  _executeSearch = () => {
    this.setState({error: null})
    this.props.navigation.setParams({rightBtnLoading: true})
    this.props.searchClient({search_by: 'email', email: this.state.email})
  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.screenTopContent}>
            <Icon name='ios-search-outline' style={styles.topContentIcon} />
            <Text style={styles.upperContentText} uppercase>By email address</Text>
          </View>

          <View style={[styles.section, {marginTop: 25}]}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>Client's email address</Label>
              <Input
                placeholder=''
                onChangeText={email => this.setState({ email })}
                keyboardType='email-address'
                returnKeyType='search'
                onSubmitEditing={this._executeSearch.bind(this)}
                autoCapitalize='none'
                style={{textAlign: 'right', marginBottom: 8, paddingRight: 10}}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <ErrorRenderer error={this.props.error || this.state.error} />
          </View>

          <View style={styles.section}>
            <Button
              onPress={() => this._executeSearch()}
              style={{alignSelf: 'flex-end'}}
              disabled={this.props.fetching}
            >
              <Text>Search</Text>
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
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    clearErrors: () => dispatch(SearchAction.searchReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
