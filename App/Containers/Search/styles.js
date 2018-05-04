import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },

  sectionText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.text
  }
})
