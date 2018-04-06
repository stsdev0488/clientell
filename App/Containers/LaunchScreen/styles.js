import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from 'Themes/'

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
    resizeMode: 'contain',
    alignSelf: 'center'
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
  },

  forgotPassword: {
    alignSelf: 'flex-end'
  },

  fbBtnWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    marginBottom: Metrics.doubleBaseMargin,
    position: 'relative',
    marginHorizontal: 30
  },

  or: {
    alignSelf: 'center',
    paddingHorizontal: Metrics.baseMargin,
    marginBottom: -10,
    backgroundColor: '#eee',
    color: Colors.text
  },

  fbBtn: {
    marginBottom: 30
  }
})
