import React, { useState } from 'react'
import { View, Animated } from 'react-native'
import {Button, Text as NBText, Icon} from 'native-base'
import { AnimatedSpring } from '../../Lib/Utils'
import * as Animatable from 'react-native-animatable'

const AnimatedBtn = Animatable.createAnimatableComponent(Button)

const AnimatableButton = (props) => {
  const [ animation, setAnimation ] = useState(new Animated.Value(1))
  const trigger = () => {
    animation.setValue(1.05)
    AnimatedSpring(animation)
    setTimeout(() => {
      props.trigger()
    }, 250)
  }

  return(
      <AnimatedBtn onPress={trigger.bind(this)} rounded bordered small iconLeft style={{transform: [{scale: animation}] }}>
          <Icon name={props.iconName} style={{fontSize: 20}}/>
          <NBText>{props.titleBtn}</NBText>
      </AnimatedBtn>
  )
}

export default AnimatableButton
