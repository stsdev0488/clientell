import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from 'Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from 'Redux/StartupRedux'
import { Root, StyleProvider, getTheme } from 'native-base'
import { Variables } from 'Themes'

import hoistNonReactStatics from 'hoist-non-react-statics'
import withDrawer from 'Components/Drawer'

// Styles
import styles from './styles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
  }

  render () {
    return (
      <StyleProvider style={getTheme(Variables)}>
        <Root style={styles.applicationView}>
          <StatusBar barStyle='light-content' />

          <ReduxNavigation />
        </Root>
      </StyleProvider>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

const FScreen = hoistNonReactStatics(withDrawer(RootContainer), RootContainer)
export default connect(null, mapDispatchToProps)(FScreen)
