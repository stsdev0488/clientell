import React from 'react'
import styles from './styles'
import {View} from 'react-native'
import Alert from '../BootstrapAlert'

const ErrorRenderer = ({error}) => {
  if (error) {
    if (error.length) {
      return (
        <View style={styles.container}>
          {error.map((e, i) =>
            <Alert key={i} type='error' style={{marginTop: 0}}>
              *{e}
            </Alert>
          )}
        </View>
      )
    } else {
      const keys = (Object.keys(error))

      if (error.message) {
        return (
          <View style={styles.container}>
            <Alert type='error' style={{marginTop: 0}}>
              *{error.message || 'Something went wrong, while submitting data. Please try again.'}
            </Alert>
          </View>
        )
      } else if (keys.length) {
        return (
          <View style={styles.container}>
            {keys.map((e, i) =>
              <Alert key={i} type='error' style={{marginTop: 0}}>
                *{error[e][0]}
              </Alert>
            )}
          </View>
        )
      }
    }
  } else {
    return null
  }
}

export default ErrorRenderer
