import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './styles'
import { Drawer } from 'native-base'
import DrawerContent from '../DrawerContent'

import DrawerActions from 'Redux/DrawerRedux'

class DrawerC extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  
  state = {
    opened: false
  }

  componentWillReceiveProps (newProps) {
    if (newProps.opened) {
      this.openDrawer()
    } else {
      this.closeDrawer()
    }
  }

  openDrawer = () => {
    this.drawer._root.open()
  }
  
  closeDrawer = () => {
    this.props.closeDrawer()
    this.drawer._root.close()
  }

  render () {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<DrawerContent drawer={this} />}
        onClose={() => this.closeDrawer()}
      >
        {this.props.render(this)}
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.drawer.opened
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    closeDrawer: () => dispatch(DrawerActions.drawerClose())
  }
}

const DScreen = connect(mapStateToProps, mapDispatchToProps)(DrawerC)

export default function withDrawer (Component) {
  return class extends React.Component {
    render() {
      return (
        <DScreen render={drawer => {
          return (
            <Component {...this.props} drawer={drawer} />
          )
        }}/>
      );
    }
  }
}