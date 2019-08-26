import React from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'

import styles from '../styles'

export default ({ user }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.subTitleText}>Overview here</Text>
    </View>
  )
}
