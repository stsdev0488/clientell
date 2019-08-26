import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.scheme2,
    marginRight: 2,
    marginBottom: 2
  },
  tagText: {
    color: Colors.snow,
    fontSize: 12
  }
})
