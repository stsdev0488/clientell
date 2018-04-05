import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './styles'
import { Drawer } from 'native-base'
import DrawerContent from '../DrawerContent'

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

  openDrawer = () => {
    this.drawer._root.open()
  }

  closeDrawer = () => {
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

export default function withDrawer (Component) {
  return class extends React.Component {
    render() {
      return (
        <DrawerC render={drawer => {
          return (
            <Component {...this.props} drawer={drawer} />
          )
        }}/>
      );
    }
  }
}