import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import Tags from 'Components/Tags'

import styles from '../styles'

export default ({ user }) => {
  const skills = [
    'Roofing',
    'Electrician',
    'Plumber',
    'HVAC',
    'Trim/finish',
    'Cabinetry',
    'Counter tops',
    'Insulation'
  ]

  return (
    <View style={styles.section}>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Button small transparent style={{alignSelf: 'flex-end'}}>
          <Text>Edit</Text>
        </Button>
      </View>

      <Tags items={skills} />
    </View>
  )
}
