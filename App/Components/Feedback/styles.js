import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,
    marginBottom: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee'
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
    fontSize: 12,
    color: '#999',
    paddingLeft: 12,
    paddingRight: 12
  },
  rateIcon: {
    color: '#999',
    fontSize: 20,
    marginLeft: 8
  },
  thumbsUp: {
    color: '#00ff00'
  },
  thumbsDown: {
    color: '#ff0000'
  },
  date: {
    ...Fonts.style.normal,
    color: Colors.text2,
    fontSize: 11,
    textAlign: 'right'
  },
  author: {
    color: Colors.text2,
    fontSize: 12
  },
  authorName: {
    ...Fonts.style.normal,
    color: Colors.text2,
    fontWeight: '700',
    fontSize: 12
  },
  feedback: {
    ...Fonts.style.normal,
    marginTop: 15,
    marginBottom: 15,
    color: Colors.text,
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
    color: Colors.app,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4
  },
  left: {
    flex: 1
  },
  ratings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  }
})
