import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import {Header, Right, Left, Body, Title, Subtitle, Button, Text as NBText, Icon} from 'native-base'
import styles from './styles'
import { Images } from 'Themes'
import { isIphoneX } from 'react-native-iphone-x-helper'

export default class FullButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    topTitle: PropTypes.string,
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
    const {containerStyles, title, subTitle, topTitle, titleStyles, rightBtnPress, rightBtnIcon, leftBtnPress, leftBtnIcon, scrollOffsetY} = this.props
    const scrolledStyles = scrollOffsetY && scrollOffsetY > 0 ? styles.scrolledStyles : {}

    let height = isIphoneX() ? 80: 60
    if (topTitle) height += 20
    if (subTitle) height += 20

    return (
      <Header style={[styles.headerContainer, containerStyles, scrolledStyles, {height}]}>
        <Left style={styles.headerBtn}>
          {
            leftBtnPress &&
            <Button
              onPress={leftBtnPress}
              transparent
            >
              <Icon style={styles.headerIcon} name={leftBtnIcon ? leftBtnIcon : 'ios-help-circle'} />
            </Button>
          }
          {
            !leftBtnPress && <View style={styles.btnFiller} />
          }
        </Left>
        <Body style={{alignItems: 'center'}}>
          {topTitle && <NBText style={styles.secondaryTitle}>{topTitle}</NBText>}
          <Title style={[styles.titleText, styles.title, titleStyles]}>{title}</Title>
          {subTitle && <NBText style={[styles.secondaryTitle, styles.subTitle]}>{subTitle}</NBText>}
        </Body>
        <Right style={styles.headerBtn}>
          {
            rightBtnPress &&
            <Button
              onPress={rightBtnPress}
              transparent
            >
              <Icon style={styles.headerIcon} name={rightBtnIcon ? rightBtnIcon : 'ios-help-circle'} />
            </Button>
          }
          {
            !rightBtnPress && <View style={styles.btnFiller} />
          }
          <Image source={Images.logoOnly} style={{width: 45, height: 40}} />
        </Right>
      </Header>
    )
  }
}
