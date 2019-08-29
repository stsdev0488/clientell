import React, { useState } from 'react'
import { TouchableOpacity, View, Animated } from 'react-native'
import {Button, Text as NBText, Icon} from 'native-base'
import StarRating from 'react-native-star-rating'
import { animatedButton } from '../../Lib/Utils'
import { NavigationActions } from 'react-navigation'
import RoundedButton from '../RoundedButton'
import { Images } from 'Themes/'
import AnimatableButton from '../AnimatableButton'

//Styles
import styles from './styles'

const SearchSkilledContractors = (props) => {

  const viewProfile = () => {
    props.goTo(props.person.name)
  }

  return(
      <View style={styles.container}>
        <View style={styles.header}>
          <NBText>{props.person.name}</NBText>
          <StarRating
              disabled
              starSize={20}
              maxStars={5}
              rating={3}
              emptyStar={Images.starGrey}
              fullStar={Images.star}
              halfStar={Images.starHalf}
              starStyle={{marginRight: 3}}
              containerStyle={{width: 100}}
          />
        </View>
        <AnimatableButton
            titleBtn={'View Profile'}
            iconName={'search'}
            trigger={viewProfile}
        />
      </View>
  )
}

export default SearchSkilledContractors
