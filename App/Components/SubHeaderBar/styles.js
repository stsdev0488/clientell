import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerContainer: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
    borderBottomColor: Colors.snow
  },
  title: {
    fontWeight: '300',
    lineHeight: 35,
    height: 30,
    color: Colors.snow
  },
  secondaryTitle: {
    ...Fonts.style.h4,
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 18
  },
  subTitle: {
    fontSize: 15
  },
  scrolledStyles: {
    borderBottomColor: Colors.steel
  },
  headerBtn: {
    flex: 0
  },
  btnFiller: {
    width: 40
  },
  headerIcon: {
    color: Colors.snow,
    fontSize: Platform.OS === 'android' ? 40 : 40
  }
})
