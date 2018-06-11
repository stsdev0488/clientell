import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    height: 125,
    backgroundColor: Colors.transparent
  },
  title: {
    ...Fonts.style.bold,
    letterSpacing: 0.2,
    fontSize: 15,
    color: Colors.text
  },
  lwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  ldesc: {
    ...Fonts.style.normal,
    fontSize: 14,
    color: Colors.text,
    paddingVertical: 5,
  },
  licon: {
    width: 16,
    height: 18,
    resizeMode: 'contain'
  },
  searchbar: {
    borderRadius: 6,
    height: 40,
    marginTop: 15
  },
  searchInput: {
    color: Colors.snow
  },
  row: {
    flex: 1,
    // backgroundColor: Colors.fire,
    // marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
  },
  listContent: {
    // marginTop: Metrics.baseMargin
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  ratingText: {
    ...Fonts.style.normal,
    marginTop: Metrics.smallMargin,
    fontSize: 13,
    color: Colors.text2,
    alignSelf: 'center',
    marginBottom: 10
  },
  infoText: {
    color: Colors.text2,
    fontSize: 16
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0
  },
  textBtnIcon: {
    fontSize: 32,
    color: Colors.app
  },
  btnIcon: {
  },
  contacts: {
    padding: Metrics.baseMargin,
    margin: Metrics.baseMargin
  },
  clientAddress: {
    fontSize: 15,
    marginBottom: Metrics.doubleBaseMargin
  },
  inlineField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  formLabel: {
    ...Fonts.style.normal,
    fontSize: 13,
    color: Colors.text,
    fontWeight: 'bold'
  },
  labelBox: {
    justifyContent: 'center',
    marginRight: Metrics.baseMargin
  },
  thumbRateLabel: {
    ...Fonts.style.normal,
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.text,
    textAlign: 'right'
  },
  commentField: {
    ...Fonts.style.normal,
    borderWidth: 1,
    borderColor: Colors.steel,
    fontSize: 15,
    color: Colors.coal,
    padding: Metrics.baseMargin,
    minHeight: 60,
    marginTop: Metrics.smallMargin,
    flex: 1,
    width: '100%'
  },
  billingInfo: {
    paddingTop: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    marginHorizontal: -10,
    paddingHorizontal: Metrics.baseMargin,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  billingTitle: {
    fontSize: 18,
    textAlign: 'center'
  },
  billingRow: {
    flexDirection: 'column',
    marginVertical: Metrics.baseMargin
  },
  billingLabel: {
    ...Fonts.style.normal,
    color: Colors.app,
    fontSize: 16,
    marginRight: Metrics.baseMargin,
    textAlign: 'center'
  },
  billingValue: {
    ...Fonts.style.normal,
    textAlign: 'center',
    fontSize: 14,
    flex: 1
  },
  upperTitle: {
    ...Fonts.style.normal,
    fontSize: 24,
    color: Colors.snow,
    textAlign: 'center'
  },
  writeReviewText: {
    fontSize: 14,
    color: Colors.text2,
    marginLeft: 10
  },
  reviewIcon: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reviewItem: {
    shadowColor: '#fff',
    backgroundColor: Colors.scheme3
  }
})
