import React, { useState } from 'react'
import { View, Animated } from 'react-native'
import {Button, Text as NBText, Icon} from 'native-base'
import {animatedButton} from "../../Lib/Utils";
import * as Animatable from 'react-native-animatable'


const AnimatedBtn = Animatable.createAnimatableComponent(Button)

const AnimatableButton = ({titleBtn, iconName}) => {
  const [ animation, setAnimation ] = useState(new Animated.Value(0))
  const trigger = () => {
    animation.setValue(1)
    Animated.spring(
        animation,
        {
          toValue: 1.02,
          friction: 2,
          useNativeDriver: true
        }
    ).start()
  }

    return(
        <AnimatedBtn rounded bordered small iconLeft style={{transform: [{scale: animation}] }} onPress={trigger.bind(this)}>
            <Icon name={iconName} style={{fontSize: 20}}/>
            <NBText>{titleBtn}</NBText>
        </AnimatedBtn>
    )
}

export default  AnimatableButton
