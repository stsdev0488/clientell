import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from 'Themes'

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
    fontWeight: 'bold',
    color: Colors.text
  },
  ldesc: {
    color: Colors.text
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
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin
  },
  ratingText: {
    marginTop: Metrics.smallMargin,
    fontSize: 18,
    color: Colors.snow,
    alignSelf: 'center',
    marginBottom: 10
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  formLabel: {
    fontSize: 14,
    color: Colors.text
  },
  labelBox: {
    justifyContent: 'flex-end',
    marginRight: Metrics.baseMargin
  },
  thumbRateLabel: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'right'
  },
  commentField: {
    borderWidth: 1,
    borderColor: Colors.steel,
    fontSize: 16,
    color: Colors.coal,
    padding: Metrics.baseMargin,
    minHeight: 60,
    width: Metrics.screenWidth - 20,
    marginTop: Metrics.smallMargin
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
    color: Colors.app,
    fontSize: 16,
    marginRight: Metrics.baseMargin
  },
  billingValue: {
    textAlign: 'left',
    fontSize: 14,
    flex: 1
  }
})
