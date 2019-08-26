import React from 'react'
import { View } from 'react-native'
import {Button, Text} from 'native-base'

import styles from '../styles'

export default ({ user, navigation }) => {
  return (
    <View style={styles.section}>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditOverview')}>
          <Text>Edit</Text>
        </Button>
      </View>

      <Text>A sample very very very long overview here.....</Text>
    </View>
  )
}
