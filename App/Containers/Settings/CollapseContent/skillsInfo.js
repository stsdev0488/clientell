import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import Tags from 'Components/Tags'

import styles from '../styles'

export default ({ user , navigation, editable = true}) => {
  const skills = user.skills && user.skills.length ? user.skills.split(',') : []

  return (
    <View style={styles.section}>
      {editable &&
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditSkills', {skills})}>
            <Text>Edit</Text>
          </Button>
        </View>
      }

      {
        !Object.keys(skills).length ? <Text>No Skills</Text> : <Tags items={skills} />
      }
    </View>
  )
}
