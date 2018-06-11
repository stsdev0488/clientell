import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'rgba(75,81,95,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  modalBack: {
    position: 'absolute',
    top: 30,
    left: 20
  },

  sContent: {
    width: '100%'
  },

  searchBar: {
    width: '100%',
    marginTop: 50,
    marginBottom: 30
  },

  searchInput: {
    color: Colors.text3
  },

  title: {
    ...Fonts.style.bold,
    letterSpacing: 0.2,
    fontSize: 15,
    color: Colors.text3,
    marginBottom: 8
  },

  ldesc: {
    ...Fonts.style.normal,
    fontSize: 14,
    color: Colors.text4,
    paddingVertical: 5,
  },
})
