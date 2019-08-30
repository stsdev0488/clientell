import React, { Component } from 'react'
import {View, Image} from 'react-native'
import { connect } from 'react-redux'
import {Content, Form, Item, Picker, Label, CheckBox, Icon, Button, Text, Input} from 'native-base'
import {formDiscardHandler, SKILLS} from 'Lib/Utils'
import { US_STATES } from '../../Lib/Utils'
import { Images } from 'Themes/'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'
import SearchContractorsActions from 'Redux/ContractorSearchRedux'

// Styles
import styles from './styles'

class Search extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarOnPress: t => formDiscardHandler(navigation, t),
      tabBarLabel: 'Search Reviews',
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
    serviceType: '',
    otherService: false,
    currentLoc: true,
    useDifferentLoc: false,
    showTextInput: false,
    textInput: '',
    city: '',
    state: ''
  }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Contractors',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })
  }



  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching && this.props.navigation.isFocused()) {
      if (!newProps.error) {
        if (newProps.data) {
          this.props.navigation.navigate(
            'ContractorSearchResults',
            {
              data: newProps.data,
              searchKey: this.state.serviceType || this.state.textInput,
            }
          )

          this.setState({
            textInput: '',
            showTextInput: false
          })
        } else {
          this.props.navigation.navigate(
            'ContractorSearchResults',
            {
              data: [],
              searchKey: this.state.serviceType || this.state.textInput,
            }
          )

          this.setState({
            textInput: '',
            showTextInput: false
          })
        }
      }
    }
  }

  _searchBox = () => {
    const { showTextInput } = this.state
    if(showTextInput){
      return(
          <Item style={{marginTop: 10}}>
            <Input
                onChangeText={(input) => this.setState({textInput: input.charAt(0).toUpperCase() + input.slice(1)})}
                placeholder='Search'
                returnKeyType='search'
                onSubmitEditing={this._onSearchSubmit.bind(this)}
            />
            <Icon name='search' style={{fontSize: 22}}/>
          </Item>
      )
    }
    return(
        <View style={{marginTop: 30}} />
    )
  }

  _searchCityAndState = () => {
    if(this.state.useDifferentLoc){
      return(
        <View>
          <View style={styles.section}>
            <Item fixedLabel >
              <Label style={styles.sectionText}>City <Text style={styles.sup}>*</Text></Label>
              <Input
                  ref={ref => {this.cityInput = ref}}
                  style={[styles.textarea, {textAlign: 'right', marginBottom: 8, paddingRight: 10}]}
                  returnKeyType='next'
                  onChangeText={(input) => this.setState({city: input.charAt(0).toUpperCase() + input.slice(1)})}
              />
            </Item>
          </View>

          <View style={styles.section}>
            <Item fixedLabel>
              <Label style={styles.sectionText}>State <Text style={styles.sup}>*</Text></Label>
              <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select Skills / Trades"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.state}
                  onValueChange={this._onStateCatChange}
              >
                {
                  US_STATES.map(item => (
                      <Picker.Item label={item.name} value={item.name} />
                  ))
                }
              </Picker>
            </Item>

          </View>
        </View>
      )
    }
    return null
  }

  _onStateCatChange = (selectState) => {
    this.setState({state: selectState})
  }

  _onContractorCatChange = serviceType => {
    this.setState({
      serviceType,
      otherService: false
    })
  }

  _onSearchSubmit = () => {
    this.props.searchRequest({
      skills: this.state.serviceType,
      city: this.state.city,
      state: this.state.state
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.screenTopContent}>
            <Image source={Images.logo} style={styles.topImage} />
            <Text style={[styles.upperContentText, {fontSize: 26, fontWeight: 'normal'}]}>Search Contractors</Text>
          </View>

          <Form style={styles.section}>
            <Item picker style={styles.catPicker}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Skills / Trades"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.serviceType}
                onValueChange={this._onContractorCatChange}
              >
                {
                  SKILLS.map(item => (
                    <Picker.Item label={item} value={item} />
                  ))
                }
              </Picker>
            </Item>

            <View style={styles.checkboxField}>
              <CheckBox
                checked={this.state.showTextInput}
                onPress={() => this.setState( state => ({ showTextInput: !state.showTextInput, serviceType: null}))}
              />
              <Text
                onPress={() => this.setState( state => ({ showTextInput: !state.showTextInput, serviceType: null}))}
                style={styles.checkboxLabel}
              >other</Text>
            </View>
            { this._searchBox() }

            <View style={[styles.checkboxField]}>
              <CheckBox
                checked={this.state.currentLoc}
                onPress={() => this.setState({ currentLoc: !this.state.currentLoc, useDifferentLoc: !this.state.useDifferentLoc })}
              />
              <Text
                onPress={() => this.setState({ currentLoc: !this.state.currentLoc, useDifferentLoc: !this.state.useDifferentLoc })}
                style={styles.checkboxLabel}
              >use current location</Text>
            </View>
            <View style={[styles.checkboxField]}>
              <CheckBox
                checked={this.state.useDifferentLoc}
                onPress={() => this.setState({ useDifferentLoc: !this.state.useDifferentLoc, currentLoc: !this.state.currentLoc })}
              />
              <Text
                onPress={() => this.setState({ useDifferentLoc: !this.state.useDifferentLoc, currentLoc: !this.state.currentLoc })}
                style={styles.checkboxLabel}
              >use different location</Text>
            </View>

            { this._searchCityAndState() }

            <View style={[styles.section, {marginTop: 40}]}>
              <Button
                primary
                block
                onPress={this._onSearchSubmit}
                disabled={!this.state.serviceType && !this.state.otherService && !this.state.textInput && !this.state.city && !this.state.state}
              >
                <Text>SEARCH</Text>
              </Button>
            </View>

          </Form>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.contractorSearch.fetching,
    data: state.contractorSearch.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    searchRequest: (data) => dispatch(SearchContractorsActions.contractorSearchRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
