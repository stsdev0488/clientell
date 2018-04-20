import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const SCREEN_WIDTH = width;

export default StyleSheet.create({
  mainBox: {
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth:1,
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingVertical: Platform.OS === 'android' ? 20 : 0
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? 0 : 20
  },
  bottomPicker: {
    width: SCREEN_WIDTH,
  },
  flag: {
    height: 20,
    width: 30,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#cecece',
    backgroundColor: '#cecece',
  },
  text: {
    height: 20,
    padding: 0,
    justifyContent: 'center',
  },
});