import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Body, Subtitle, Item, Input, ListItem, Text as NBText } from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import StarRating from 'react-native-star-rating'
import AlertMessage from 'Components/AlertMessage'
import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'

// Redux
import ClientActions from 'Redux/ClientRedux'
import SearchActions from 'Redux/SearchRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from './styles'

class Clients extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Clients',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'ios-people'}
        size={30}
        style={{color: tintColor}}
      />
    )
  }

  state = {
    dataObjects: [],
    searchKey: ''
  }

  dataBeforeFilter = []

  componentDidMount () {
    this.props.clients()
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.filtering && this.props.filtering) {
      if (newProps.filteredData) {
        this.setState({dataObjects: newProps.filteredData.data})
      }
    }

    if (!newProps.fetching && this.props.fetching) {
      if (newProps.clientsData) {
        if (newProps.pagination.current_page === 1) {
          this.setState(state => {
            state.dataObjects = newProps.clientsData.data
            state.searchKey = ''
            this.props.clearFilter()

            this.dataBeforeFilter = state.dataObjects
            return state
          })
        } else {
          this.setState(state => {
            state.dataObjects = [...state.dataObjects, ...newProps.clientsData.data]

            this.dataBeforeFilter = state.dataObjects
            return state
          })
        }
      }
    }
  }

  renderRow ({item}) {
    return (
      <ListItem>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('ClientProfile', {client: item})}>
          <Body>
          <View style={styles.listHeader}>
            <NBText style={styles.title}>{item.display_name}</NBText>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{maxWidth: '50%'}}>
              <NBText note style={styles.ldesc}>{item.phone_number}</NBText>
              <NBText note style={styles.ldesc}>{item.street_address}, {item.city} {item.state}</NBText>
            </View>

            <View style={{alignSelf: 'center'}}>
              <StarRating
                disabled
                starSize={25}
                maxStars={5}
                rating={item.avg_rating ? parseFloat(item.avg_rating) : item.initial_star_rating}
                fullStarColor='#297fae'
                emptyStarColor='#297fae'
              />
            </View>
          </View>
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
      this.props.clearFilter()
      this.setState({dataObjects: this.dataBeforeFilter})
    }
  }

  _handleOnEndSearhInput = () => {
    // const { searchKey } = this.state
    // if (searchKey.length > 2) {
    //   this.props.filter({keyword: searchKey})
    // }
  }

  _clearSearchInput () {
    this.setState({searchKey: ''})
    this.handleSearchInput('')
  }

  _clientCountDisplay = () => {
    let fullDataLen = 0

    if (this.props.pagination) {
      fullDataLen = this.props.pagination.total
    }

    let displayLen = 0

    if (this.props.filteredPagination) {
      displayLen = this.props.filteredPagination.total
    } else if (this.props.pagination) {
      displayLen = this.props.pagination.total
    }

    let display = `${fullDataLen} client${fullDataLen !== 1 ? 's' : ''}`
    if (displayLen < fullDataLen) {
      display = `Showing ${displayLen} of ${fullDataLen} clients`
    }
    return <Subtitle style={{color: '#8e8f90'}}>{display}</Subtitle>
  }

  _onRefresh = () => {
    this.props.clients()
  }

  _onEndReached = () => {
    if (!this.props.filteredData) {
      const {current_page, total_pages, links} = this.props.pagination

      if (current_page < total_pages) {
        this.props.clients(links.next)
      }
    }
  }

  _renderSearchBar = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <Item style={styles.searchbar} regular>
          <Icon name="ios-search" style={{color: '#fff'}} />
          <Input style={styles.searchInput} placeholder="Search" placeholderTextColor="#fff" autoCapitalize='none' value={this.state.searchKey} onEndEditing={this._handleOnEndSearhInput} onChangeText={this.handleSearchInput.bind(this)} />
          {
            this.state.searchKey !== '' &&
            <TouchableOpacity onPress={this._clearSearchInput.bind(this)}>
              <Icon name="md-close-circle" style={{color: '#fff'}} />
            </TouchableOpacity>
          }
        </Item>
      </View>
    )
  }

  render () {
    const { clientsData } = this.props

    return (
      <View style={styles.container}>
        <HeaderBar
          title={''}
          leftBtnIcon='ios-menu'
          leftBtnPress={() => this.props.openDrawer()}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <View style={styles.contentUpperBG} />

        <SubHeaderBar
          title={'Client List'}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        {this._clientCountDisplay()}
        {this._renderSearchBar()}

        <View style={styles.mContainer}>
          <FlatList
            contentContainerStyle={[styles.listContent]}
            data={this.state.dataObjects || []}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            ListEmptyComponent={this.renderEmpty}
            refreshing={this.props.fetching || false}
            onRefresh={this._onRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.client.fetching,
    clientsData: state.client.data || {},
    pagination: state.client.pagination || null,
    filteredData: state.search.filteredClient,
    filtering: state.search.filtering,
    filteredPagination: state.search.pagination || null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clients: (pagination) => dispatch(ClientActions.clientRequest(pagination)),
    filter: (keyword) => dispatch(SearchActions.filterClients(keyword)),
    clearFilter: () => dispatch(SearchActions.clearFilter()),
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
