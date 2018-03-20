import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerContainer: {
    backgroundColor: Colors.snow,
    borderBottomWidth: 0,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: Colors.snow
  },
  title: {
    fontSize: 24
  },
  scrolledStyles: {
    borderBottomColor: Colors.steel
  }
})
