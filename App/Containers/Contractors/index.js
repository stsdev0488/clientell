import React, { Component } from 'react'
import { ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Content, Form, Item, Picker, Label, CheckBox, Icon, Button, Text, ActionSheet, Input } from 'native-base'
import {formDiscardHandler, SKILLS} from 'Lib/Utils'
import { Images } from 'Themes/'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'

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
    textInput: ''
  }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Contractors',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })
  }

  _searchBox = () => {
    const { showTextInput } = this.state
    if(showTextInput){
      return(
          <Item style={{marginTop: 10}}>
            <Input
                onChangeText={(input) => this.setState({textInput: input})}
                placeholder='Search'
            />
            <Icon name='search' style={{fontSize: 22}}/>
          </Item>
      )
    }
    return(
        <View style={{marginTop: 30}} />
    )
  }

  _onContractorCatChange = serviceType => {
    this.setState({
      serviceType,
      otherService: false
    })
  }

  _onSearchSubmit = () => {
    this.props.navigation.navigate(
      'ContractorSearchResults',
      {
        data: [],
        searchKey: this.state.serviceType || 'Other'
      }
    )
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

            <View style={[styles.section, {marginTop: 40}]}>
              <Button
                primary
                block
                onPress={this._onSearchSubmit}
                disabled={!this.state.serviceType && !this.state.otherService && !this.state.textInput}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
