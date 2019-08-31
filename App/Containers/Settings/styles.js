import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },

  logo: {
    height: 90,
    width: 90,
    position: 'relative',
    borderRadius: 45,
    alignSelf: 'center'
  },

  centered: {
    marginTop: 25,
    marginBottom: 10,
    height: 90,
    width: 90,
    borderRadius: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    alignSelf: 'center',
    overflow: 'hidden'
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

  sup: {
    color: Colors.fire
  },

  editIcon: {
    fontSize: 30,
    color: Colors.snow
  },

  sectionForm: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  sectionFormText: {
    flex: 0,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.text,
    justifyContent: 'center',
    alignItems: 'center'
  },

  galleryImg: {
    width: 44,
    height: 44
  },

  galleryImgWrap: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 7,
    marginBottom: 7,
    overflow: 'hidden'
  },

  galleryImgBig: {
    width: 64,
    height: 64
  },

  galleryImgButton: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginRight: 7,
    marginBottom: 7,
    overflow: 'hidden'
  },

  commentField: {
    ...Fonts.style.normal,
    borderWidth: 1,
    borderColor: Colors.steel,
    fontSize: 15,
    color: Colors.coal,
    padding: Metrics.baseMargin,
    minHeight: 60,
    marginTop: Metrics.smallMargin,
    flex: 1,
    width: '100%'
  },

  commentLabel: {
    ...Fonts.style.normal,
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.text,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },

  licenseItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 7,
    margin: 7
  },

  licenseItemShort: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 7,
    marginBottom: 8
  }
})
