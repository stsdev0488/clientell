import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import {Container, Header, Body, Title, Subtitle, Item, Input, ListItem, Text as NBText} from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import StarRating from 'react-native-star-rating'
import AlertMessage from 'Components/AlertMessage'

// Redux
import ClientActions from 'Redux/ClientRedux'
import SearchActions from 'Redux/SearchRedux'

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

  state = {
    dataObjects: [],
    searchKey: ''
  }

  componentWillMount () {
    this.props.clients()
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.filtering && this.props.filtering) {
      console.tron.log(newProps)
      if (newProps.filteredData) {
        this.setState({dataObjects: newProps.filteredData.data})
      }
    }

    if (!newProps.fetching && this.props.fetching) {
      if (newProps.clientsData) {
        this.setState({dataObjects: newProps.clientsData.data})
      }
    }
  }

  renderRow ({item}) {
    return (
      <ListItem>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('ClientProfile', {client: item})}>
          <Body>
            <View style={styles.listHeader}>
              <NBText style={styles.title}>{item.name}</NBText>
              <StarRating
                disabled
                starSize={20}
                maxStars={5}
                rating={item.avg_rating ? parseFloat(item.avg_rating) : item.initial_star_rating}
                fullStarColor='#FFD700'
                emptyStarColor='#D6D6D6'
              />
            </View>
            <NBText note>{item.phone_number}</NBText>
            <NBText note>{item.street_address}, {item.city} {item.state}</NBText>
          </Body>
        </TouchableOpacity>
      </ListItem>
    )
  }

  // Show this when data is empty
  renderEmpty = () => {
    if (this.props.fetching || this.props.filtering) {
      return (
        <AlertMessage
          title='Fetching clients...'
        />
      )
    } else {
      return (
        <AlertMessage
          title='No clients available'
        />
      )
    }
  }

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  handleSearchInput (searchKey) {
    this.setState({searchKey})

    if (searchKey.length > 2) {
      this.props.filter({keyword: searchKey})
    } else if (searchKey.length === 0) {
      this.setState({dataObjects: this.props.clientsData.data})
    }
  }

  _handleOnEndSearhInput = () => {
    // const { searchKey } = this.state
    // if (searchKey.length > 2) {
    //   this.props.filter({keyword: searchKey})
    // }
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
            <Input placeholder="Search" autoCapitalize='none' value={this.state.searchKey} onEndEditing={this._handleOnEndSearhInput} onChangeText={this.handleSearchInput.bind(this)} />
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

  _onRefresh = () => {
    this.props.clients()
  }

  render () {
    const { clientsData } = this.props

    return (
      <View style={styles.container}>
        {this.renderCustomHeader()}
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects || []}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          refreshing={this.props.fetching || false}
          onRefresh={this._onRefresh}
        />
      </View>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.client.fetching,
    clientsData: state.client.data || {},
    filteredData: state.search.filteredClient,
    filtering: state.search.filtering
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clients: () => dispatch(ClientActions.clientRequest()),
    filter: (keyword) => dispatch(SearchActions.filterClients(keyword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
