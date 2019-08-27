import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text } from 'native-base'

// Styles
import styles from './styles'
import { Images } from 'Themes/'

class PhotoPreviewModal extends Component {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.imgWrap}>
            <Image style={styles.img} source={{uri: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} />
          </View>

          <View style={styles.section}>
            <Button success onPress={() => this.props.navigation.goBack()}>
              <Text> Close </Text>
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPreviewModal)
