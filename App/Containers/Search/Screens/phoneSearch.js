import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner, Label } from 'native-base'
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
        name={'ios-search'}
        size={20}
        style={{color: tintColor, fontSize: 25}}
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

        <SubHeaderBar
          title='Search'
          rightBtnIcon='ios-search'
          rightBtnPress={() => this._executeSearch()}
          rightBtnLoading={this.props.fetching}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
        />

        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <ErrorRenderer error={this.props.error || this.state.error} />
          </View>

          <View style={styles.screenTopContent}>
            <Icon name='ios-search-outline' style={styles.topContentIcon} />
            <Text style={styles.upperContentText} uppercase>By phone number</Text>
          </View>

          <View style={[styles.section, {marginTop: 25}]}>
            <Item fixedLabel>
              <View>
                <Label style={styles.sectionText}>Phone number <Text uppercase style={styles.sup}>*</Text></Label>
              </View>

              <PhoneInput
                ref={ref => { this.phone = ref }}
                style={{paddingHorizontal: 8, flex: 1}}
                textStyle={{height: 50, textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                flagStyle={{width: 0, height: 0}}
                onChangePhoneNumber={num => this.setState({phone: num})}
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
