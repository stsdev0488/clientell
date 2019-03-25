import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from 'Themes/'

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

  sectionCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  inlineField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  labelBox: {
    justifyContent: 'center',
    marginRight: Metrics.baseMargin
  },

  thumbRateLabel: {
    ...Fonts.style.normal,
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.text,
    textAlign: 'right'
  },

  commentLabel: {
    ...Fonts.style.normal,
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.text,
    textAlign: 'left',
    alignSelf: 'flex-start'
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
  },

  groupDescription: {
    paddingHorizontal: 12,
    marginBottom: 10
  },

  groupDescriptionText: {
    color: '#a5a0a0',
    fontSize: 14
  }
})
