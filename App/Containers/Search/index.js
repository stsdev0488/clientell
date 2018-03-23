import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Text } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

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
      <Content style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Search</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>How would you like to search for a client?</Text>
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => this.props.navigation.navigate('PhoneSearch')}>
            <Text>By phone number</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => this.props.navigation.navigate('EmailSearch')}>
            <Text>By email</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => this.props.navigation.navigate('NameAddressSearch')}>
            <Text>By name and address</Text>
          </Button>
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)