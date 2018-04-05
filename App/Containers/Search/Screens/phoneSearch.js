import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner } from 'native-base'
import PhoneInput from 'react-native-phone-input'
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
    phone: '',
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
            this.props.navigation.navigate('SearchResults', {results: newProps.data.data, searchKey: this.state.phone})
          } else {
            this.setState({error: {message: 'Your search did not yield any results.'}})
          }
        }
      }
    }
  }

  _executeSearch = () => {
    this.setState({error: null})
    this.props.searchClient({search_by: 'phone number', phone_number: this.state.phone})
  }

  render () {
    return (
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Search</Text>
          <Text style={styles.subTitleText}>by phone number</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Client's phone number</Text>
          <Item regular>
            <PhoneInput
              ref={ref => { this.phone = ref }}
              style={{paddingHorizontal: 8}}
              textStyle={{height: 50}}
              onChangePhoneNumber={num => this.setState({phone: num})}
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
