import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner } from 'native-base'
import PhoneInput from 'react-native-phone-input'
import ErrorRenderer from 'Components/ErrorRenderer'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'

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
    if (this.props.fetching && !newProps.fetching && this.props.navigation.isFocused()) {
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
          <Text uppercase style={styles.upperContentText}>By phone number</Text>
        </View>

        <Content style={styles.mContainer}>

          <View style={styles.section}>
            <Text uppercase style={styles.sectionText}>Client's phone number</Text>
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
            <Button style={styles.appButton} primary block onPress={() => this._executeSearch()}>
              {this.props.fetching === true && <Spinner />}
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
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
