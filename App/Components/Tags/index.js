import React from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'

// Styles
import styles from './styles'

const Tags = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, i) =>
        <View style={styles.tag} key={i}>
          <Text style={styles.tagText}>{item}</Text>
        </View>
      )}
    </View>
  )
}

export default Tags
