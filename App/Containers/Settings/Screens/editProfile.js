import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Icon, Button, Item, Input, Text } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

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
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>

        <View style={styles.centered}>
          <Image source={Images.launch} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>First name</Text>
          <Item regular>
            <Input placeholder='' />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Middle name / initial</Text>
          <Item regular>
            <Input placeholder='' />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Last name</Text>
          <Item regular>
            <Input placeholder='' />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Company name</Text>
          <Item regular>
            <Input placeholder='' />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Description</Text>
          <Item regular>
            <Input placeholder='' />
          </Item>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Main phone number</Text>
          <Item regular>
            <Input placeholder='' />
          </Item>
        </View>

        <View style={styles.section}>
          <Button primary block bordered onPress={() => {}}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
