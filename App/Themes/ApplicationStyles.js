import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },

    mContainer: {
      flex: 1,
      backgroundColor: Colors.snow,
      margin: 8,
      marginBottom: 0,
      borderColor: '#eee',
      borderWidth: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    appText: {
      fontWeight: 'bold',
      color: Colors.app2
    },

    titleSection: {
      marginTop: 40
    },

    appButton: {
      backgroundColor: Colors.app2
    },

    appButtonText: {

    },

    contentUpperBG: {
      backgroundColor: Colors.app,
      height: Metrics.screenHeight * 0.30,
      position: 'absolute',
      ...ifIphoneX({
        top: 80
      }, {
        top: 60
      }),
      left: 0,
      right: 0
    },

    section: {
      marginHorizontal: 10,
      marginBottom: 5,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      color: Colors.text,
      textAlign: 'center'
    },
    link: {
      ...Fonts.style.normal,
      color: Colors.scheme2,
      fontSize: 14,
      fontWeight: '900'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      color: Colors.text,
      textAlign: 'center'
    },
    subTitleText: {
      ...Fonts.style.h4,
      color: Colors.text,
      textAlign: 'center'
    },
    modalBack: {
      position: 'absolute',
      top: 30,
      left: 20
    },
    upperContentText: {
      fontSize: 16,
      color: Colors.text,
      textAlign: 'center',
      fontWeight: 'bold'
    },

    topContentImage: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
      marginVertical: 20
    },

    topContentIcon: {
      fontSize: 30,
      color: Colors.app,
      marginVertical: 20
    },

    screenTopContent: {
      alignItems: 'center',
      paddingHorizontal: 20
    },

    dangerText: {
      color: Colors.fire
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
