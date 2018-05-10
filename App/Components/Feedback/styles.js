import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.steel,
    padding: Metrics.doubleBaseMargin
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 2
  },
  rateLabel: {
    ...Fonts.style.normal,
    marginRight: Metrics.smallMargin,
    fontSize: 12,
    color: '#999'
  },
  rateIcon: {
    color: '#999',
    fontSize: 20
  },
  thumbsUp: {
    color: '#00ff00'
  },
  thumbsDown: {
    color: '#ff0000'
  },
  date: {
    ...Fonts.style.normal,
    color: '#999',
    fontSize: 11
  },
  author: {
    color: '#999',
    fontSize: 14
  },
  authorName: {
    ...Fonts.style.normal,
    color: '#333',
    fontWeight: '700',
    fontSize: 14
  },
  feedback: {
    ...Fonts.style.normal,
    marginTop: 15,
    color: '#333',
    fontSize: 16,
    lineHeight: 20
  },
  authorBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  authorBtnIcon: {
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.smallMargin,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 24
  },
  basicData: {
    color: '#333',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4
  },
  left: {
    flex: 1
  }
})
