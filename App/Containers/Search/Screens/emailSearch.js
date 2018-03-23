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
    email: ''
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching) {
      if (!newProps.error) {
        this.props.navigation.navigate('SearchResults', {results: newProps.data, searchKey: this.state.email})
      }
    }
  }

  _executeSearch = () => {
    this.props.searchClient({search_by: 2, email: this.state.email})
  }

  render () {
    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Search</Text>
          <Text style={styles.subTitleText}>by email</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Client's email address</Text>
          <Item regular>
            <Input placeholder='' onChangeText={email => this.setState({ email })} />
          </Item>
        </View>

        <View style={styles.section}>
          <ErrorRenderer error={this.props.error} />
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
    error: state.search.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchClient: (value) => dispatch(SearchAction.searchRequest(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
