import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },

  textarea: {
    minHeight: 40,
    paddingTop: 13,
    paddingBottom: 13
  },

  sup: {
    color: Colors.fire
  },

  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  sectionText: {
    flex: 0,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.text,
    justifyContent: 'center',
    alignItems: 'center'
  },

  fixedInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  disabledInput: {
    fontSize: 17,
    textAlign: 'right',
    top: 1.5,
    lineHeight: 24,
    paddingHorizontal: 5,
    marginBottom: 8
  },

  formWrapper: {
    borderLeftWidth: 1,
    borderColor: '#cfcfcf',
    marginLeft: 7.5,
    paddingLeft: 7.5,
    marginBottom: 25
  },

  formUpper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  upperIcon: {
    fontSize: 20,
    color: Colors.app
  },

  upperText: {
    color: Colors.app,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },

  topImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginVertical: 20
  }
})
