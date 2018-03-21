// @flow

import { StyleSheet } from 'react-native'
import { Colors } from 'Themes/'

export default StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  error: {
    backgroundColor: Colors.errorOpacity
  },

  warning: {
    backgroundColor: Colors.warningOpacity,
    borderWidth: 1,
    borderColor: '#faf2cc'
  },

  warningText: {color: Colors.wtext},
  errorText: {color: Colors.etext}
})
