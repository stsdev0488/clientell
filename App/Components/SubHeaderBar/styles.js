import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerContainer: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
    borderBottomColor: Colors.snow,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2
  },

  title: {
    fontSize: 18,
    color: Colors.snow
  },

  secondaryTitle: {
    ...Fonts.style.h4,
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 16
  },

  subTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },

  scrolledStyles: {
    borderBottomColor: Colors.steel
  },

  headerBtn: {
    maxWidth: 80
  },

  headerBtnItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    margin: 0
  },

  btnFiller: {
    width: 40
  },

  headerIcon: {
    color: Colors.snow,
    fontSize: 25,
    paddingHorizontal: 15
  },

  headerGradient: {
    position: 'absolute', top: 0, left: 0, right: -0, bottom: 0
  },

  btnText: {
    color: Colors.snow
  }
})
