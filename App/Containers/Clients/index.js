import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import {Container, Header, Body, Title, Subtitle, Item, Input, ListItem, Text as NBText} from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import StarRating from 'react-native-star-rating'

// Styles
import styles from './styles'

class Clients extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-contacts-outline'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {
        name: 'John Doe',
        address: '134 Toad Ave, Tampa, FL',
        phone: '727-421-2555',
        rating: 4
      },
    ],
    searchKey: ''
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <ListItem>
        <Body>
          <View style={styles.listHeader}>
            <NBText style={styles.title}>{item.name}</NBText>
            <StarRating
              disabled
              starSize={20}
              maxStars={5}
              rating={item.rating}
              fullStarColor='#FFD700'
              emptyStarColor='#D6D6D6'
            />
          </View>
          <NBText note>{item.phone}</NBText>
          <NBText note>{item.address}</NBText>
        </Body>
      </ListItem>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () => {
    return null
  }

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <NBText style={[styles.label, {marginTop: 20}]}>No clients added.</NBText>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  handleSearchInput (searchKey) {
    this.setState({searchKey})
  }

  renderCustomHeader () {
    return (
      <Header
        hasSubtitle
        searchBar
        style={styles.header}
      >
        <Body>
          <Title>Client List</Title>
          <Subtitle>47 clients</Subtitle>
          <Item style={styles.searchbar} regular>
            <Icon name="ios-search" />
            <Input placeholder="Search" value={this.state.searchKey} onChangeText={this.handleSearchInput.bind(this)} />
            {
              this.state.searchKey !== '' &&
              <TouchableOpacity onPress={() => this.setState({searchKey: ''})}>
                <Icon name="md-close-circle" />
              </TouchableOpacity>
            }
          </Item>
        </Body>
      </Header>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderCustomHeader()}
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
