import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text } from 'native-base'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from './styles'

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
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

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
        />

        <View style={styles.section}>
          <Text uppercase style={styles.upperContentText}>How would you like to search for a client?</Text>
        </View>

        <Content style={styles.mContainer}>
          <View style={[styles.section, {marginTop: 25}]}>
            <Button style={styles.appButton} primary block onPress={() => this.props.navigation.navigate('PhoneSearch')}>
              <Text>By phone number</Text>
            </Button>
          </View>

          <View style={styles.section}>
            <Button style={styles.appButton} primary block onPress={() => this.props.navigation.navigate('EmailSearch')}>
              <Text>By email</Text>
            </Button>
          </View>

          <View style={styles.section}>
            <Button style={styles.appButton} primary block onPress={() => this.props.navigation.navigate('NameAddressSearch')}>
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
