import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Content, Button, Text } from 'native-base'

import StarRating from 'react-native-star-rating'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from 'Redux/YourRedux'

// Styles
import styles from './styles'
import { Images } from 'Themes/'

class UserProfileModal extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.titleText}>Sample Alert</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.screenText}>A sample alert message here</Text>
          </View>

          <View style={styles.section}>
            <Button success onPress={() => this.props.navigation.goBack()}><Text> Ok </Text></Button>
          </View>
        </View>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModal)
