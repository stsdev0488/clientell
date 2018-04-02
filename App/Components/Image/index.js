import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'
import Placeholder from 'rn-placeholder'
import * as Animatable from 'react-native-animatable'
import PropTypes from 'prop-types'

export default class ImageWithPlaceholder extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool
  }

  state = {
    imageFetched: false
  }

  _imageLoaded = () => {
    // this.ai.fadeIn(1200)
    this.setState({imageFetched: true})
  }

  render () {
    const { source, wrapperStyle, ...rest } = this.props

    return (
      <View style={[styles.upperBG, wrapperStyle]}>
        <Placeholder.Media
          animate='fade'
          size={this.props.size || '100%'}
          onReady={this.state.imageFetched}
        />

        <Animatable.Image
          ref={a => { this.ai = a }}
          source={source}
          style={this.state.imageFetched ? [{width: '100%', height: '100%'}, this.props.style] : {width: 1, height: 1}}
          onLoadEnd={() => this._imageLoaded()}
          blurRadius={this.props.blurRadius || 0}
        />
      </View>
    )
  }
}
