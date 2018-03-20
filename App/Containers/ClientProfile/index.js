import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Container, Content, Text as NBText, Button} from 'native-base'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

import HeaderBar from '../../Components/HeaderBar'
import Feedback from '../../Components/Feedback'
import StarRating from 'react-native-star-rating'
import {Call, Text, Map, Email} from 'react-native-openanything'

// Styles
import styles from './styles'

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
    reviews: [
      {
        userName: 'You',
        rating: 3,
        created: new Date(),
        payment: 1,
        character: 1,
        repeat: 0,
        feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        userName: 'Bill Gates',
        rating: 4,
        created: new Date(),
        payment: 1,
        character: null,
        repeat: null,
        feedback: 'Very accomodating!'
      },
      {
        userName: 'Steve Jobs',
        rating: 5,
        created: new Date(),
        payment: 1,
        character: 1,
        repeat: 1,
        feedback: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      },
    ]
  }

  renderInfo () {
    return (
      <View>
        <View style={styles.row}>
          <StarRating
            disabled
            starSize={30}
            maxStars={5}
            rating={3}
            fullStarColor='#FFD700'
            emptyStarColor='#D6D6D6'
          />
          <NBText style={styles.ratingText}>Average over 6 ratings</NBText>
        </View>
        <View style={styles.contacts}>
          <View style={[styles.row, styles.infoItem]}>
            <NBText>1345 Toad Street, Tampa, FL 33618</NBText>
            <Button
              onPress={() => Map('1345 Toad Street, Tampa, FL 33618')}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='ios-navigate' style={styles.textBtnIcon} />
            </Button>
          </View>
          <View style={[styles.row, styles.infoItem]}>
            <NBText>727-421-5555</NBText>
            <Button
              onPress={() => Call('7274215555', prompt = false)}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='ios-call' style={styles.textBtnIcon} />
            </Button>
            <Button
              onPress={() => Text('7274215555', message = false, autoEncode = true)}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='md-text' style={styles.textBtnIcon} />
            </Button>
          </View>
          <View style={[styles.row, styles.infoItem]}>
            <NBText>jdoe@gmail.com</NBText>
            <Button
              onPress={() => Email(to = 'jdoe@gmail.com', subject = false, body = false, cc = false, bcc = false)}
              transparent
              style={styles.btnIcon}
            >
              <Icon name='md-mail' style={{fontSize: 28}} />
            </Button>
          </View>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          title='John Doe'
          rightBtnIcon='md-create'
          rightBtnPress={() => console.tron.log('For Edit!')}
          leftBtnIcon='ios-arrow-back'
          leftBtnPress={() => this.props.navigation.goBack(null)}
          scrollOffsetY={this.state.scrollOffsetY}
        />

        <Content onScroll={ev => this.setState({scrollOffsetY: Math.round(ev.nativeEvent.contentOffset.y)})}>

          {this.renderInfo()}

          <Button block iconLeft style={{marginBottom: 40, marginHorizontal: 10}}>
            <Icon name='ios-create-outline' />
            <NBText>Write a new review</NBText>
          </Button>

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

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)
