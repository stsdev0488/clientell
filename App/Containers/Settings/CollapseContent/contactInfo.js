import React from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'

import styles from '../styles'

export default ({ user }) => {
  return (
    <View style={styles.section}>
      {user.company_name && <Text style={styles.subTitleText}>{user.company_name}</Text>}

      <Text style={styles.sectionText}>{`${user.city || ''}${user.state ? ', ' : ''}${user.state || ''} ${user.postal_code || ''}`}</Text>
      <Text style={styles.sectionText}>{`${user.street_address || ''} ${user.street_address2 || ''}`}</Text>
      {user.phone_number && <Text style={styles.sectionText}>{user.phone_number}</Text>}
      {user.business_url && <Text style={styles.sectionText}>{user.business_url}</Text>}
      <Text style={styles.sectionText}>{user.email || ''}</Text>
    </View>
  )
}
