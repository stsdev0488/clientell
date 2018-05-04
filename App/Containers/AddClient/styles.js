import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },

  textarea: {
    minHeight: 40,
    paddingTop: 13,
    paddingBottom: 13
  },

  sup: {
    color: Colors.fire
  },

  sectionText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.text
  }
})
