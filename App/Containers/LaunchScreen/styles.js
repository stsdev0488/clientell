import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logoWrapper: {
    marginTop: 70,
    marginBottom: 20
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },

  loginForm: {
    marginHorizontal: 30
  },

  loginItem: {
    marginLeft: 0
  },

  loginButton: {
    marginTop: 15
  }
})
