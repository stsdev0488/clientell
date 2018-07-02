import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Content, Button, Text as NBText, Input, Item, ListItem, Body, Subtitle, } from 'native-base'
import StarRating from 'react-native-star-rating'
import AlertMessage from 'Components/AlertMessage'

import ClientActions from 'Redux/ClientRedux'
import SearchActions from 'Redux/SearchRedux'

// Styles
import styles from './styles'
import styles2 from 'Containers/Clients/styles'
import { Images } from 'Themes/'

class SearchModal extends Component {
  static navigationOptions = {
    header: null
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  state = {
    dataObjects: [],
    searchKey: ''
  }
  
  componentWillReceiveProps (newProps) {
    if (!newProps.filtering && this.props.filtering) {
      if (newProps.filteredData) {
        this.setState({dataObjects: newProps.filteredData.data})
      }
    }
  }

  handleSearchInput (searchKey) {
    this.setState({searchKey})

    if (searchKey.length > 2) {
      this.props.filter({keyword: searchKey})
    } else if (searchKey.length === 0) {
      this.props.clearFilter()
      this.setState({dataObjects: this.dataBeforeFilter})
    }
  }

  _clearSearchInput () {
    this.setState({searchKey: ''})
    this.handleSearchInput('')
  }

  _navigate = (item) => {
    this.props.navigation.goBack()
    this.props.navigation.navigate('ClientProfile', {client: item})
  }

  renderRow ({item}) {
    return (
      <ListItem>
        <TouchableOpacity style={{flex: 1}} onPress={() => this._navigate(item)}>
          <Body>
          <View style={styles2.listHeader}>
            <NBText style={styles.title}>{item.display_name}</NBText>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{maxWidth: '50%'}}>
              <View style={styles2.lwrap}>
                <Image source={Images.phone} style={styles2.licon} />
                <NBText note style={styles.ldesc}>
                  {item.phone_number}
                </NBText>
              </View>

              <View style={styles2.lwrap}>
                <Image source={Images.address} style={styles2.licon} />
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
    if (this.props.filtering) {
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

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Item style={styles.searchbar}>
            <Icon name="ios-search" style={{color: '#fff'}} />
            <Input autoFocus style={styles.searchInput} placeholder="Search" placeholderTextColor="#fff" autoCapitalize='none' value={this.state.searchKey} onEndEditing={this._handleOnEndSearhInput} onChangeText={this.handleSearchInput.bind(this)} />
            {
              this.state.searchKey !== '' &&
              <TouchableOpacity onPress={this._clearSearchInput.bind(this)}>
                <Icon name="md-close-circle" style={{color: '#fff'}} />
              </TouchableOpacity>
            }
          </Item>
        </View>

        <Content style={styles.sContent}>
          <FlatList
            contentContainerStyle={[styles.listContent]}
            data={this.state.dataObjects || []}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            refreshing={this.props.fetching || false}
            onRefresh={this._onRefresh}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.1}
          />
        </Content>

        <View style={styles.modalBack}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name='ios-arrow-round-back' style={{color: '#fff', fontSize: 40}} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filteredData: state.search.filteredClient,
    filtering: state.search.filtering,
    filteredPagination: state.search.pagination || null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (keyword) => dispatch(SearchActions.filterClients(keyword)),
    clearFilter: () => dispatch(SearchActions.clearFilter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
