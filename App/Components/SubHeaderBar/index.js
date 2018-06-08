import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import {Header, Right, Left, Body, Title, Subtitle, Button, Text as NBText, Icon as NBIcon} from 'native-base'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'Themes/'
import * as Animatable from 'react-native-animatable'


Animatable.initializeRegistryWithDefinitions({
  customPulse: {
    0: {
      scale: 1
    },
    0.5: {
      scale: 1.25
    },
    1: {
      scale: 1
    }
  }
});
const Icon = Animatable.createAnimatableComponent(NBIcon)

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

  componentWillReceiveProps (newProps) {
    if (newProps.rightBtnLoading && !this.props.rightBtnLoading) {
      this.rIcon.customPulse()
    } else if (!newProps.rightBtnLoading && this.props.rightBtnLoading){
      this.rIcon.stopAnimation()
    }
  }

  render () {
    const {containerStyles, title, subTitle, topTitle, titleStyles, rightBtnPress, rightBtnIcon, rightBtnText, rightBtnLoading, leftBtnPress, leftBtnIcon, scrollOffsetY} = this.props
    const scrolledStyles = scrollOffsetY && scrollOffsetY > 0 ? styles.scrolledStyles : {}

    let height = 90
    if (topTitle) height += 20
    if (subTitle) height += 20
    const rightAdditional = {
      hasText: !!rightBtnText
    }

    return (
      <React.Fragment>
        <Header style={[styles.headerContainer, containerStyles, scrolledStyles, {height}]}>
          <LinearGradient
            start={{x: 0.0, y: 1}} end={{x: 0.5, y: 1.0}}
            colors={[Colors.scheme2, Colors.scheme1]}
            style={[styles.headerGradient, {height}]}
          />
          <Left style={styles.headerBtn}>
            {
              leftBtnPress &&
              <Button
                style={styles.headerBtnItem}
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
                style={styles.headerBtnItem}
                onPress={rightBtnPress}
                transparent
                {...rightAdditional}
              >
                {!!rightBtnIcon &&
                  <Icon
                    ref={a => this.rIcon = a}
                    animation="customPulse"
                    easing="ease-out"
                    iterationCount={rightBtnLoading ? 'infinite' : 0}
                    style={styles.headerIcon}
                    name={rightBtnIcon ? rightBtnIcon : 'ios-help-circle'}
                  />
                }

                {!!rightBtnText &&
                  <NBText style={styles.btnText}>
                    {rightBtnText}
                  </NBText>
                }
              </Button>
            }
            {
              !rightBtnPress && <View style={styles.btnFiller} />
            }
          </Right>
        </Header>
      </React.Fragment>
    )
  }
}
