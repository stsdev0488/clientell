import React from 'react'
import {View, TouchableOpacity, TextInput, Keyboard} from 'react-native'
import {Container, Content, Text as NBText, Button} from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

import HeaderBar from 'Components/HeaderBar'
import Feedback from 'Components/Feedback'
import StarRating from 'react-native-star-rating'
import {Call, Text, Map, Email} from 'react-native-openanything'
import AlertMessage from 'Components/AlertMessage'

// Redux actions
import ClientActions from 'Redux/ClientRedux'
import SearchActions from 'Redux/SearchRedux'

// Styles
import styles from '../styles'

class ClientProfile extends React.PureComponent {

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
    scrollOffsetY: 0,
    client: this.props.navigation.getParam('client'),
    reviews: [],
    showBilling: false
  }

  componentDidMount () {
    const { client } = this.props.navigation.state.params
    this.props.getClient(client.id)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.fetching && !newProps.fetching) {
      if (!newProps.error) {
        this.setState({client: newProps.clientData})

        // this.props.getClientReviews(
        //   {
        //     search_by: 'name and address',
        //     first_name: newProps.clientData.first_name,
        //     last_name: newProps.clientData.last_name
        //   }
        // )

        this.props.getClientReviews(
          {
            search_by: 'specific client',
            client_id: newProps.clientData.id
          }
        )
      }
    }

    if (this.props.fetchingReviews && !newProps.fetchingReviews) {
      if (!newProps.errorReviews) {
        this.setState({reviews: newProps.reviews.data})
      }
    }
  }

  renderInfo () {
    const { client } = this.state

    return (
      <View>
        <View style={styles.section}>
          <StarRating
            disabled
            starSize={30}
            maxStars={5}
            rating={client.avg_rating ? parseFloat(client.avg_rating) : client.initial_star_rating}
            fullStarColor='#FFD700'
            emptyStarColor='#D6D6D6'
          />
          <NBText style={styles.ratingText}>{client.review_count === 0 ? 'Initial rating' : `Average over ${client.review_count} rating`}{client.review_count > 1 ? 's' : ''}</NBText>
        </View>
        <View style={styles.contacts}>
          <View style={[styles.section, styles.infoItem]}>
            <NBText>{client.street_address} {client.street_address2}, {client.city}, {client.state} {client.postal_code}</NBText>
            <Button
              onPress={() => Map(`${client.street_address} ${client.street_address2}, ${client.city}, ${client.state} ${client.postal_code}`)}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='ios-navigate' style={styles.textBtnIcon} />
            </Button>
          </View>
          <View style={[styles.section, styles.infoItem]}>
            <NBText>{client.phone_number}</NBText>
            <Button
              onPress={() => Call(client.phone_number, prompt = false)}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='ios-call' style={styles.textBtnIcon} />
            </Button>
            <Button
              onPress={() => Text(client.phone_number, message = false, autoEncode = true)}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='md-text' style={styles.textBtnIcon} />
            </Button>
          </View>

          {client.email &&
            <View style={[styles.section, styles.infoItem]}>
              <NBText>{client.email}</NBText>
              <Button
                onPress={() => Email(to = client.email, subject = false, body = false, cc = false, bcc = false)}
                transparent
                style={styles.btnIcon}
              >
                <Icon name='md-mail' style={{fontSize: 28}} />
              </Button>
            </View>
          }
          {this.renderBillingInfo()}
        </View>
      </View>
    )
  }

  renderBillingInfo = () => {
    const { client, showBilling } = this.state
    const { billing_first_name, billing_middle_name, billing_last_name, billing_phone_number, billing_street_address, billing_street_address2, billing_city, billing_state, billing_postal_code, billing_email } = client
    if (client.client_type !== 'organization') {
      return <View />
    } else {
      return (
        <View style={styles.billingInfo}>
          {
            !showBilling &&
            <Button small transparent block onPress={() => this.setState({showBilling: true})}><NBText>Show Billing Information</NBText></Button>
          }
          {
            showBilling &&
            <View>
              <View style={styles.billingRow}>
                <NBText style={styles.billingLabel}>Billing Name</NBText>
                <NBText style={styles.billingValue}>{`${billing_last_name}, ${billing_first_name} ${billing_middle_name || ''}`}</NBText>
              </View>
              <View style={styles.billingRow}>
                <NBText style={styles.billingLabel}>Billing Address</NBText>
                <NBText style={styles.billingValue}>{`${billing_street_address || ''} ${billing_street_address2 || ''}, ${billing_city || ''} ${billing_state || ''} ${billing_postal_code || ''}`}</NBText>
              </View>
              {
                billing_phone_number &&
                <View style={styles.billingRow}>
                  <NBText style={styles.billingLabel}>Billing Phone</NBText>
                  <NBText style={styles.billingValue}>{billing_phone_number}</NBText>
                </View>
              }
              {
                billing_email &&
                <View style={styles.billingRow}>
                  <NBText style={styles.billingLabel}>Billing Email</NBText>
                  <NBText style={styles.billingValue}>{billing_email}</NBText>
                </View>
              }
              <Button small transparent block onPress={() => this.setState({showBilling: false})}><NBText>Hide Billing Information</NBText></Button>
            </View>
          }
        </View>
      )
    }
  }

  render () {
    const { navigate } = this.props.navigation
    const { client } = this.state

    const rightButton = client.user_id === this.props.user.id ? {
      rightBtnIcon: 'md-create',
      rightBtnPress: () => this.props.navigation.navigate('ClientEditProfile', {isEdit: true, client})
    } : {}

    return (
      <View style={styles.container}>
        <HeaderBar
          title={client.name}
          {...rightButton}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <Content onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>

          {this.renderInfo()}

          <Button
            block
            iconLeft
            style={{marginBottom: 40, marginHorizontal: 10}}
            onPress={() => navigate('ClientReview', {client})}
          >
            <Icon name='ios-create-outline' />
            <NBText>Write a new review</NBText>
          </Button>

          {this.state.reviews.length < 1 && this.props.fetchingReviews !== true &&
            <AlertMessage title="No reviews submitted for this user" />
          }

          {
            this.state.reviews.map((item, i) => {
              return (
                <Feedback key={i} data={item} />
              )
            })
          }

        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.client.fetchingClient,
    clientData: state.client.fetchedClient,
    error: state.client.fetchedClientError,
    user: state.user.data,
    fetchingReviews: state.search.fetching2,
    errorReviews: state.search.error2,
    reviews: state.search.payload2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClient: (id) => dispatch(ClientActions.getSpecificClient(id)),
    getClientReviews: (value) => dispatch(SearchActions.search2Request(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)
