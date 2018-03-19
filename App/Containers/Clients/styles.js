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
  }
})
