import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },

  sectionForm: {
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
    alignSelf: 'center'
  },

  sup: {
    color: Colors.fire
  },

  topImage: {
    width: 180,
    height: 180
  },

  catPicker: {
    marginTop: 20
  },

  checkboxField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  checkboxLabel: {
    paddingLeft: 20
  },

  textarea: {
    minHeight: 40,
    paddingTop: 13,
    paddingBottom: 13
  }

})
