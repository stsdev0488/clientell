import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerContainer: {
    backgroundColor: Colors.snow,
    borderBottomWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.snow
  },
  title: {
    fontWeight: '300',
    lineHeight: 34
  },
  secondaryTitle: {
    ...Fonts.style.h4,
    color: Colors.text,
    textAlign: 'center',
    fontSize: 18
  },
  scrolledStyles: {
    borderBottomColor: Colors.steel
  },
  headerBtn: {
    flex: 0
  },
  btnFiller: {
    width: 40
  }
})
