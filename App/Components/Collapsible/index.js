import React, {useState} from 'react'
import { View } from 'react-native'
import { Accordion, Text, Icon } from 'native-base'

import styles from './styles'

const _renderAccordionHeader = (item, expanded) => {
  const activeStyle = expanded ? styles.active : styles.inactive
  const activeText = expanded ? styles.activeText : styles.inactiveText

  return (
    <View
      style={
        [{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center"
        }, activeStyle]
      }
    >
      <Text style={[{ fontWeight: "600" }, activeText]}>
        {" "}{item.title}
      </Text>
      {expanded
        ? <Icon style={[{ fontSize: 22 }, activeText]} name="remove-circle" />
        : <Icon style={[{ fontSize: 22 }, activeText]} name="add-circle" />}
    </View>
  )
}

const _renderAccordionContent = (item) => {
  return (
    <View>
      {item.content}
    </View>
  )
}

export default ({ items, expanded = false }) => {
  return (
    <Accordion
      dataArray={items}
      animation
      expanded={expanded}
      renderHeader={_renderAccordionHeader}
      renderContent={_renderAccordionContent}
    />
  )
}
