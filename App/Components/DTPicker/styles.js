import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginLeft: Metrics.baseMargin
  },
  inputDisplay: {
    borderWidth: 1,
    borderColor: Colors.steel
  },
  textField: {
    fontSize: 16,
    color: Colors.coal,
    textAlign: 'center',
    padding: Metrics.baseMargin
  },
  label: {
    fontSize: 14,
    color: Colors.text
  }
})
