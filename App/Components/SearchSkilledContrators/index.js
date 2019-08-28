import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import {Button, Text as NBText, Icon} from 'native-base'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'
import RoundedButton from '../RoundedButton'
import { Images } from 'Themes/'


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
        <Button rounded iconLeft bordered small>
          <Icon name='search' style={{fontSize: 20}}/>
          <NBText style={styles.rateLabel}>View Profile</NBText>
        </Button>
      </View>
  )
}

export default SearchSkilledContractors
