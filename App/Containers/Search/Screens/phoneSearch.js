import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text, Spinner, Label } from 'native-base'
import PhoneInput from 'react-native-phone-input'
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
    phone: '',
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
            this.props.navigation.navigate('SearchResults', {data: newProps.data, searchKey: this.state.phone})
          } else {
            this.setState({error: {message: 'Your search did not yield any results.'}})
          }
        }
      }
    }
  }

  _executeSearch = () => {
    this.setState({error: null})

    const phone = this.state.phone.replace('+1', '')
    var phoneRegex = /^(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (phoneRegex.test(phone)) {
      var formattedPhoneNumber = phone.replace(phoneRegex, "($1) $2-$3")

      this.props.navigation.setParams({rightBtnLoading: true})
      this.props.searchClient({search_by: 'phone number', phone_number: this.state.phone})
    } else {
      this.setState({error: {message: 'You have entered an invalid phone number.'}})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.screenTopContent}>
            <Icon name='ios-search-outline' style={styles.topContentIcon} />
            <Text style={styles.upperContentText} uppercase>By phone number</Text>
          </View>

          <View style={[styles.section, {marginTop: 25}]}>
            <Item fixedLabel>
              <View>
                <Label style={styles.sectionText}>Phone number <Text uppercase style={styles.sup}>*</Text></Label>
              </View>
              {
                // <PhoneInput
                //   ref={ref => { this.phone = ref }}
                //   style={{paddingHorizontal: 8, flex: 1}}
                //   textStyle={{height: 50, textAlign: 'right', marginBottom: 8, paddingRight: 10}}
                //   flagStyle={{width: 0, height: 0}}
                //   onChangePhoneNumber={num => this.setState({phone: num})}
                // />
              }

              <Input
                ref={ref => {this.phone = ref}}
                defaultValue={this.state.phone ? this.state.phone : ''}
                onChangeText={phone => this.setState({ phone })}
                keyboardType='phone-pad'
                onSubmitEditing={() => this._executeSearch()}
                returnKeyType='go'
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
              block
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
