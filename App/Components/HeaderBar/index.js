import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import {Header, Right, Left, Body, Title, Subtitle, Button, Text as NBText, Icon} from 'native-base'
import styles from './styles'

export default class FullButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    leftBtnPress: PropTypes.func,
    leftBtnIcon: PropTypes.string,
    rightBtnPress: PropTypes.func,
    rightBtnIcon: PropTypes.string,
    containerStyles: PropTypes.object,
    titleStyles: PropTypes.object,
    scrollOffsetY: PropTypes.number
  }

  render () {
    const {containerStyles, title, titleStyles, rightBtnPress, rightBtnIcon, leftBtnPress, leftBtnIcon, scrollOffsetY} = this.props
    const scrolledStyles = scrollOffsetY && scrollOffsetY > 0 ? styles.scrolledStyles : {}
    return (
      <Header style={[styles.headerContainer, containerStyles, scrolledStyles]}>
        <Left>
          {
            leftBtnPress &&
            <Button
              onPress={leftBtnPress}
              transparent
            >
              <Icon name={leftBtnIcon ? leftBtnIcon : 'ios-help-circle'} />
            </Button>
          }
        </Left>
        <Body>
          <Title style={[styles.title, titleStyles]}>{title}</Title>
        </Body>
        <Right>
          {
            rightBtnPress &&
            <Button
              onPress={rightBtnPress}
              transparent
            >
              <Icon name={rightBtnIcon ? rightBtnIcon : 'ios-help-circle'} />
            </Button>
          }
        </Right>
      </Header>
    )
  }
}
