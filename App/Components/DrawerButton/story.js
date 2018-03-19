import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import DrawerButton from './index'

storiesOf('DrawerButton')
  .add('Default', () => (
    <View style={{ backgroundColor: 'black' }}>
      <DrawerButton
        text='Drawer Button'
        onPress={() => { }}
      />
    </View>
  ))
