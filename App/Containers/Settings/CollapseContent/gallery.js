import React from 'react'
import { View, Image } from 'react-native'
import {Button, Text} from 'native-base'
import { Images } from 'Themes/'

import styles from '../styles'

export default ({ navigation }) => {
  return (
    <View style={styles.section}>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditGallery')}>
          <Text>Edit</Text>
        </Button>
      </View>

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
