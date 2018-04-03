import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from 'Themes'

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
    marginRight: Metrics.smallMargin,
    fontSize: 14,
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
    color: '#999',
    fontSize: 14,
    marginBottom: Metrics.smallMargin
  },
  author: {
    color: '#999',
    fontSize: 14,
    marginTop: Metrics.smallMargin,
  },
  authorName: {
    color: '#333',
    fontWeight: '700',
    fontSize: 14
  },
  feedback: {
    color: '#333',
    fontSize: 14,
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
    fontSize: 16,
    marginBottom: 4
  }
})
