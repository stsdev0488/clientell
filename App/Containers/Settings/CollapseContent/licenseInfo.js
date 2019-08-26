import React from 'react'
import { View, Image } from 'react-native'
import {Button, Text} from 'native-base'

import { Images } from 'Themes/'

import styles from '../styles'

export default ({ user, navigation }) => {
  return (
    <View style={styles.section}>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditLicense')}>
          <Text>Edit</Text>
        </Button>
      </View>

      <Text style={{fontWeight: 'bold'}}>License #: AB2325-82732837232-8723826565</Text>

      <Text style={{marginTop: 7, fontWeight: 'bold'}} bold>Attachments: </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image source={Images.logoOnly} style={styles.galleryImg} />
      </View>

      <Text style={{fontWeight: 'bold'}}>Insured: Yes</Text>
    </View>
  )
}
