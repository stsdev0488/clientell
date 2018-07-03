import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { Body, Subtitle, Item, Input, ListItem, Text as NBText, ActionSheet } from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import { Images } from 'Themes/'
import StarRating from 'react-native-star-rating'
import AlertMessage from 'Components/AlertMessage'
import SubHeaderBar from 'Components/SubHeaderBar'
import {formDiscardHandler} from 'Lib/Utils'

// Redux
import ClientActions from 'Redux/ClientRedux'
import SearchActions from 'Redux/SearchRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from './styles'

class Clients extends React.PureComponent {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarOnPress: t => formDiscardHandler(navigation, t),
      tabBarLabel: 'Unreviewed',
      tabBarIcon: ({tintColor}) => (
        <View style={{flexDirection: 'row'}}>
          <Icon
            name={'ios-people-outline'}
            style={{color: tintColor, fontSize: 30, alignSelf: 'center'}}
          />
          <Text style={{color: tintColor, fontSize: 20, alignSelf: 'center'}}>?</Text>
        </View>
      ),
      header: (a) => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  state = {
    dataObjects: [],
    searchKey: ''
  }

  dataBeforeFilter = []

  componentDidMount () {
    this.props.clients()

    this.props.navigation.setParams({
      title: 'Unreviewed Clients',
      leftBtnIcon: 'ios-menu',
      leftBtnPress: () => this.props.openDrawer(),
      // rightBtnIcon: 'search',
      // rightBtnPress: () => this.props.navigation.navigate('SearchModal')
    })
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.fetching && this.props.fetching) {
      if (newProps.clientsData && !newProps.error) {
        if (newProps.pagination.current_page === 1) {
          this.setState(state => {
            const filteredReviews = newProps.clientsData.data.filter(a => !a.reviews.data.length)
            state.dataObjects = filteredReviews
            state.searchKey = ''
            this.props.clearFilter()

            this.dataBeforeFilter = state.dataObjects

            // update header client count
            // this.props.navigation.setParams({subTitle: this._clientCountDisplay(newProps)})
            return state
          })
        } else {
          this.setState(state => {
            const filteredReviews = newProps.clientsData.data.filter(a => !a.reviews.data.length)

            state.dataObjects = [...state.dataObjects, ...filteredReviews]
            this.dataBeforeFilter = filteredReviews
            // update header client count
            // this.props.navigation.setParams({subTitle: this._clientCountDisplay(newProps)})
            return state
          })
        }

      }
    }
  }

  renderRow ({item}) {
    return (
      <ListItem>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('UnreviewedProfile', {client: item, unreviewed: true})}>
          <Body>
          <View style={styles.listHeader}>
            <NBText style={styles.title}>{item.display_name}</NBText>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{maxWidth: '50%'}}>
              <View style={styles.lwrap}>
                <Image source={Images.phone} style={styles.licon} />
                <NBText note style={styles.ldesc}>
                  {item.phone_number}
                </NBText>
              </View>

              <View style={styles.lwrap}>
                <Image source={Images.address} style={styles.licon} />
                <NBText note style={styles.ldesc}>
                  {item.street_address}, {item.city} {item.state}
                </NBText>
              </View>
            </View>

            <View style={{alignSelf: 'center'}}>
              <StarRating
                disabled
                starSize={25}
                maxStars={5}
                rating={item.avg_rating ? parseFloat(item.avg_rating) : item.initial_star_rating}
                emptyStar={Images.starGrey}
                fullStar={Images.star}
                halfStar={Images.starHalf}
                starStyle={{marginRight: 3}}
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
    const { clientsData } = this.props

    if (this.props.fetching) {
      return (
        <AlertMessage
          title='Fetching clients...'
        />
      )
    } else {
      if (!clientsData.data) return null

      return (
        <View style={{paddingHorizontal: 20}}>
          <Image source={Images.logo} style={{width: 180, height: 180, alignSelf: 'center'}} />
          {!clientsData.data.length &&
            <React.Fragment>
              <NBText style={[styles.wText, {fontWeight: 'bold'}]}>Welcome to Clientell!</NBText>
              <NBText style={styles.wText}>
                You can add clients to your list using the
                <NBText style={[styles.wText, {fontWeight: 'bold'}]}> Add Clients </NBText>
                screen, or by importing them using the web portal.
              </NBText>
            </React.Fragment>
          }

          {clientsData.data.length > 0 &&
            <React.Fragment>
              <NBText style={[styles.wText, {fontWeight: 'bold'}]}>You're up to date!</NBText>
              <NBText style={styles.wText}>
                You've written reviews for all the clients in your list.
              </NBText>
            </React.Fragment>
          }
        </View>
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

  _clientCountDisplay = (props) => {
    let fullDataLen = 0

    if (props.pagination) {
      fullDataLen = props.pagination.total
    }

    let displayLen = 0

    if (props.filteredPagination) {
      displayLen = props.filteredPagination.total
    } else if (props.pagination) {
      displayLen = props.pagination.total
    }

    let display = `${fullDataLen} client${fullDataLen !== 1 ? 's' : ''}`
    if (displayLen < fullDataLen) {
      display = `Showing ${displayLen} of ${fullDataLen} clients`
    }
    return display
  }

  _onRefresh = () => {
    this.props.clients()
  }

  _onEndReached = () => {
    if (!this.props.filteredData && this.props.pagination) {
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
    error: state.client.error
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
