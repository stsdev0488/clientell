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

const SearchSkilledContractors = ({person}) => {

  return(
      <View style={styles.container}>
        <View style={styles.header}>
          <NBText>{person.name}</NBText>
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
        />
      </View>
  )
}

export default SearchSkilledContractors
