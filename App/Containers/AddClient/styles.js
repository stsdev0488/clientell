import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  section: {
    marginBottom: Metrics.doubleBaseMargin
  },
  sectionText: {
    marginBottom: Metrics.smallMargin
  },
  textarea: {
    minHeight: 40,
    paddingTop: 13,
    paddingBottom: 13
  }
})
