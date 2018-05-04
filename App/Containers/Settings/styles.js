import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },

  logo: {
    marginTop: 20,
    height: 90,
    width: 90,
    position: 'relative',
    borderRadius: 45
  },

  centered: {
    alignItems: 'center'
  },

  contactIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  avatarSpinner: {
    position: 'absolute',
    top: 20,
    left: 45
  },

  contactIcon: {
    fontSize: 55,
    marginLeft: 20
  },

  signOut: {
    position: 'absolute',
    top: 30,
    right: 20
  },

  editButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: Colors.banner,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },

  editIcon: {
    fontSize: 30,
    color: Colors.snow
  }
})
