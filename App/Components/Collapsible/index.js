import React, {useState} from 'react'
import { View } from 'react-native'
import { Accordion, Text, Icon } from 'native-base'

const _renderAccordionHeader = (item, expanded) => {
  return (
    <View style={{
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-between",
      alignItems: "center"
      }}
    >
      <Text style={{ fontWeight: "600" }}>
        {" "}{item.title}
      </Text>
      {expanded
        ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
        : <Icon style={{ fontSize: 18 }} name="add-circle" />}
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
