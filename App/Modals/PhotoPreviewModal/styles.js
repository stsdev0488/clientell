import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from 'Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.cloud,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContent: {
    width: '80%',
    backgroundColor: '#eee',
    borderColor: Colors.silver,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 5
  },

  img: {
    width: Metrics.screenWidth * 0.80,
    height: Metrics.screenHeight * 0.50,
    resizeMode: 'contain'
  }
})
