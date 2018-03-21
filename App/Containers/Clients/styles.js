import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    height: 125
  },
  searchbar: {
    borderRadius: 20,
    height: 40,
    marginTop: 15
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
  }
})
