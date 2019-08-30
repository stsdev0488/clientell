import React from 'react'
import { View, Image } from 'react-native'
import {Button, Text} from 'native-base'

import { Images } from 'Themes/'

import styles from '../styles'

export default ({ user, navigation, editable = true }) => {
  return (
    <View style={styles.section}>
      {editable &&
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditLicense')}>
            <Text>Edit</Text>
          </Button>
        </View>
      }

      <Text style={styles.sectionFormText}>License #: AB2325-82732837232-8723826565</Text>

      <Text style={[styles.sectionFormText, {fontWeight: 'bold'}]} bold>Attachments: </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Button style={styles.galleryImgWrap} transparent onPress={() => navigation.navigate('PreviewPhotoModal')}>
          <Image source={Images.logoOnly} style={styles.galleryImg} />
        </Button>
      </View>

      <Text style={styles.sectionFormText}>Insured: Yes</Text>
    </View>
  )
}
