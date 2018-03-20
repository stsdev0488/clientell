import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },

  logo: {
    marginTop: 30,
    height: 120,
    width: 120,
    resizeMode: 'contain'
  },

  centered: {
    alignItems: 'center'
  },

  contactIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  contactIcon: {
    fontSize: 55,
    marginLeft: 20
  },

  signOut: {
    position: 'absolute',
    top: 30,
    right: 20
  }
})
