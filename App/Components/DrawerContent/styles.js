import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },

  logoWrapper: {
    marginTop: 20,
    marginBottom: 0
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})
