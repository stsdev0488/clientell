import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Item, Icon, Button, Text, CheckBox, Body as NBody, ListItem, Input} from 'native-base'
import SubHeaderBar from 'Components/SubHeaderBar'
import ErrorRenderer from 'Components/ErrorRenderer'
import { SKILLS } from '../../../Lib/Utils'

// Redux actions
import UserActions from 'Redux/UserRedux'
import DrawerActions from 'Redux/DrawerRedux'

// Styles
import styles from '../styles'
import { Images } from 'Themes/'

/**
 * OTHER SKILLS
 */
const OtherSkills = ({onSearch}) => {
  return (
    <View style={styles.section}>
      <Item>
        <Input
          placeholder='Search Skills'
          onChangeText={onSearch}
        />
      </Item>
    </View>
  )
}


class Skills extends Component {
  static navigationOptions = (({navigation}) => {
    const params = navigation.state.params
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'ios-home'}
          size={20}
          style={{color: tintColor, fontSize: 25}}
        />
      ),
      header: (a) => {
        return (
          <SubHeaderBar {...params} />
        )
      }
    }
  })

  state = {
    items: SKILLS,
    selected: []
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      title: 'Skills / Trades',
      leftBtnIcon: 'ios-arrow-back',
      leftBtnPress: () => this.props.navigation.goBack(null),
      rightBtnText: 'Save',
      rightBtnPress: () => this.props.navigation.goBack(null),
    })
  }

  _submit = () => {
    // const formData = new FormData()
    //
    // this.props.update(formData)
  }

  _onCheck = (item) => {
    this.setState(state => {
      const found = state.selected.find(a => a === item)
      let uSelected = [...state.selected]
      if (!found) {
        uSelected.push(item)
      } else {
        uSelected = uSelected.filter(a => a !== item)
      }

      state.selected = uSelected

      return state
    })
  }

  _filterSkills = (keyword) => {
    this.setState(state => {
      if (!keyword.length) {
        state.items = SKILLS
      } else {
        state.items = SKILLS.filter(a => a.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
      }

      return state
    })
  }

  render () {
    const { saving, error } = this.props

    return (
      <View style={styles.container}>
        <Content style={styles.mContainer}>
          <View style={styles.section}>
            <ErrorRenderer error={error.errors} />
          </View>

          <OtherSkills
            onSearch={(keyword) => {
              this._filterSkills(keyword)
            }}
          />

          {this.state.items.map((item, i) =>
            <ListItem key={i} onPress={() => this._onCheck(item)}>
              <CheckBox checked={!!this.state.selected.find(a => a === item)} onPress={() => this._onCheck(item)} />

              <NBody>
                <Text>{item}</Text>
              </NBody>
            </ListItem>
          )}
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.user.updating,
    error: state.user.updateError || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(DrawerActions.drawerOpen()),
    update: (data) => dispatch(UserActions.userUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills)
