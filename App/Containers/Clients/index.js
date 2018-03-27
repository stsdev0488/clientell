import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import {Container, Header, Body, Title, Subtitle, Item, Input, ListItem, Text as NBText} from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import StarRating from 'react-native-star-rating'
import AlertMessage from 'Components/AlertMessage'

// Redux
import ClientActions from 'Redux/ClientRedux'

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

  componentWillMount () {
    this.props.clients()
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
                rating={item.initial_star_rating}
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
    if (this.props.fetching) {
      return (
        <AlertMessage
          title='Fetching clients...'
        />
      )
    } else {
      return (
        <AlertMessage
          title='Clients not found'
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
    const { clientsData } = this.props

    return (
      <View style={styles.container}>
        {this.renderCustomHeader()}
        <FlatList
          contentContainerStyle={styles.listContent}
          data={clientsData.data || []}
          renderItem={this.renderRow.bind(this)}
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
    fetching: state.client.fetching,
    clientsData: state.client.data || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clients: () => {dispatch(ClientActions.clientRequest())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
