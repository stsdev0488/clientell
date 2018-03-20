import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin
  },
  ratingText: {
    marginTop: Metrics.smallMargin,
    fontSize: 14,
    color: '#888'
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0
  },
  textBtnIcon: {
    fontSize: 32
  },
  btnIcon: {

  },
  contacts: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f6f6f6',
    borderColor: '#eee',
    padding: Metrics.baseMargin,
    margin: Metrics.baseMargin
  }
})
