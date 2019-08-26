import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'native-base'
import { Images } from 'Themes/'

import styles from '../styles'

export default ({ user }) => {
  return (
    <View style={styles.section}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image source={Images.logoOnly} style={styles.galleryImg} />
        <Image source={Images.logoOnly} style={styles.galleryImg} />
        <Image source={Images.logoOnly} style={styles.galleryImg} />
        <Image source={Images.logoOnly} style={styles.galleryImg} />
        <Image source={Images.logoOnly} style={styles.galleryImg} />
        <Image source={Images.logoOnly} style={styles.galleryImg} />
        <Image source={Images.logoOnly} style={styles.galleryImg} />
      </View>
    </View>
  )
}
