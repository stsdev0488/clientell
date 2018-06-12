import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text, ActionSheet } from 'native-base'
import {formDiscardHandler} from 'Lib/Utils'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from './styles'

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

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Search',
      leftBtnIcon: 'ios-menu',
      leftBtnPress: () => this.props.openDrawer()
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.screenTopContent}>
            <Icon name='ios-search-outline' style={styles.topContentIcon} />
            <Text style={styles.upperContentText} uppercase>How would you like to search for a client?</Text>
          </View>

          <View style={[styles.section]}>
            <Button bordered primary block onPress={() => this.props.navigation.navigate('PhoneSearch')}>
              <Text>By phone number</Text>
            </Button>
          </View>

          <View style={styles.section}>
            <Button bordered primary block onPress={() => this.props.navigation.navigate('EmailSearch')}>
              <Text>By email</Text>
            </Button>
          </View>

          <View style={styles.section}>
            <Button bordered primary block onPress={() => this.props.navigation.navigate('NameAddressSearch')}>
              <Text>By name and address</Text>
            </Button>
          </View>
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
