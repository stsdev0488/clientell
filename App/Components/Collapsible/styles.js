import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  inactive: {
    backgroundColor: Colors.scheme1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.snow
  },
  active: {
    backgroundColor: Colors.scheme1
  },
  inactiveText: {
    color: Colors.snow
  },
  activeText: {
    color: Colors.snow
  }
})
