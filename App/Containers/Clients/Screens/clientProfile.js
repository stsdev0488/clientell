import React from 'react'
import {View, TouchableOpacity, TextInput, Keyboard, Image} from 'react-native'
import {Container, Content, Text as NBText, Button, ActionSheet} from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import { Images } from 'Themes/'
import {formDiscardHandler} from 'Lib/Utils'

import HeaderBar from 'Components/HeaderBar'
import SubHeaderBar from 'Components/SubHeaderBar'
import Feedback from 'Components/Feedback'
import StarRating from 'react-native-star-rating'
import {Call, Text, Map, Email} from 'react-native-openanything'
import AlertMessage from 'Components/AlertMessage'

// Redux actions
import ClientActions from 'Redux/ClientRedux'
import SearchActions from 'Redux/SearchRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'

class ClientProfile extends React.PureComponent {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarOnPress: formDiscardHandler,
      tabBarLabel: 'Clients',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'ios-people-outline'}
          style={{color: tintColor, fontSize: 30}}
        />
      ),
      header: () => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  state = {
    scrollOffsetY: 0,
    client: this.props.navigation.getParam('client'),
    reviews: [],
    showBilling: false
  }

  componentDidMount () {
    const { client } = this.props.navigation.state.params
    this.props.getClient(client.id)

    const rightButton = client.user_id === this.props.user.id ? {
      rightBtnIcon: 'md-create',
      rightBtnPress: () => this._showOptions()
    } : {}

    this.props.navigation.setParams({
      title: 'Rating',
      ...rightButton,
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null)
    })
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
      <View style={styles.contacts}>
        <View style={[styles.section, styles.infoItem]}>
          <TouchableOpacity
            onPress={() => Map(`${client.street_address} ${client.street_address2}, ${client.city}, ${client.state} ${client.postal_code}`)}
          >
            <NBText style={styles.infoText}>{client.street_address} {client.street_address2}, {client.city}, {client.state} {client.postal_code}</NBText>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.infoItem]}>
          <TouchableOpacity
            onPress={() => Call(client.phone_number, prompt = false)}
          >
            <NBText style={styles.infoText}>{client.phone_number}</NBText>
          </TouchableOpacity>
        </View>

        {client.email &&
          <View style={[styles.section, styles.infoItem]}>
            <TouchableOpacity
              onPress={() => Email(to = client.email, subject = false, body = false, cc = false, bcc = false)}
            >
              <NBText style={styles.infoText}>{client.email}</NBText>
            </TouchableOpacity>
          </View>
        }
        {this.renderBillingInfo()}
      </View>
    )
  }

  renderRating = () => {
    const { client } = this.state

    return (
      <React.Fragment>
        <View style={{ alignSelf: 'center' }}>
          <StarRating
            disabled
            starSize={40}
            maxStars={5}
            rating={client.avg_rating ? parseFloat(client.avg_rating) : client.initial_star_rating}
            emptyStar={Images.starGrey}
            fullStar={Images.star}
            halfStar={Images.starHalf}
            starStyle={{marginRight: 5}}
          />
        </View>
        <NBText style={styles.ratingText}>{client.review_count === 0 ? 'Initial rating'.toUpperCase() : (`Average over ${client.review_count} rating`).toUpperCase()}{client.review_count > 1 ? 's'.toUpperCase() : ''}</NBText>
      </React.Fragment>
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
            <Button small transparent block onPress={() => this.setState({showBilling: true})}><NBText style={styles.appText}>Show Billing Information</NBText></Button>
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
              <Button small transparent block onPress={() => this.setState({showBilling: false})}><NBText style={styles.appText}>Hide Billing Information</NBText></Button>
            </View>
          }
        </View>
      )
    }
  }

  _showDeleteConfirm = () => {
    const BUTTONS = ["Delete", "Cancel"]
    const { client } = this.state

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: "Delete this client?"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.deleteClient(client.id)
        }
      }
    )
  }

  _showOptions = () => {
    const BUTTONS = ["Edit", "Delete", "Cancel"]
    const { client } = this.state

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
        title: "Client options"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.navigation.navigate('ClientEditProfile', {isEdit: true, client})
        }
        if (buttonIndex === 1) {
          this._showDeleteConfirm()
        }
      }
    )
  }

  render () {
    const { navigate } = this.props.navigation
    const { client } = this.state

    return (
      <View style={styles.container}>
        <Content onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})} style={styles.mContainer}>
          <View style={{textAlign: 'center', alignItems: 'center'}}>
            <Image source={Images.user} style={styles.topContentImage} />
            <NBText uppercase style={styles.upperContentText}>
              {client.client_type === 'organization' ? client.organization_name : client.name}
            </NBText>
          </View>

          {this.renderInfo()}

          {this.renderRating()}

          <TouchableOpacity
            onPress={() => navigate('ClientReview', {client})}
            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40}}
          >
            <Button
              rounded
              bordered
              primary
              style={styles.reviewIcon}
            >
              <Icon name='md-create' style={{marginLeft: 0, marginRight: 0, fontSize: 16}} />
            </Button>

            <NBText style={styles.writeReviewText}>Write a new review</NBText>
          </TouchableOpacity>

          {this.state.reviews.length < 1 && this.props.fetchingReviews !== true &&
            <AlertMessage title="No reviews submitted for this user" />
          }

          {
            this.state.reviews.map((item, i) => {
              return (
                <Feedback key={i} data={item} style={styles.reviewItem} />
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
    deleteClient: (id) => {dispatch(ClientActions.deleteClient(id))},
    getClientReviews: (value) => dispatch(SearchActions.search2Request(value)),
    openDrawer: () => dispatch(DrawerActions.drawerOpen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)
