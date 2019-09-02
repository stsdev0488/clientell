import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
import {Button, Spinner, Text} from 'native-base'
import { Images } from 'Themes/'

import LicenseActions from 'Redux/LicenseRedux'

import styles from '../styles'

class LicenseCollapsible extends Component {
  componentDidMount () {
    if (this.props.modal) {
      this.props.fetchLicenses({
        user_id: this.props.user.id
      })
    } else {
      this.props.fetchLicenses()
    }
  }

  render () {
    const {navigation, editable, fetching, items} = this.props

    return (
      <View style={styles.section}>
        {editable &&
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditLicense')}>
              <Text>{items.length ? 'New License' : 'Edit'}</Text>
            </Button>
          </View>
        }

        {fetching && <Spinner />}

        {items.map(license =>
          <View style={styles.licenseItemShort}>
            {editable &&
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Button small transparent style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('EditLicense', {license})}>
                  <Text>Edit</Text>
                </Button>
              </View>
            }
            <Text style={styles.sectionFormText}>Name: {license.name}</Text>
            <Text style={styles.sectionFormText}>License #: {license.number}</Text>
            <Text style={styles.sectionFormText}>Expiration: {license.expiration}</Text>

            {!!license.photos.data.length &&
              <React.Fragment>
                <Text style={[styles.sectionFormText, {fontWeight: 'bold'}]} bold>Attachments: </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {license.photos.data.map(photo =>
                    <Button key={photo.id} style={styles.galleryImgWrap} transparent onPress={() => navigation.navigate('PreviewPhotoModal', {image: {uri: photo.url}})}>
                      <Image source={{uri: photo.url}} style={styles.galleryImg} />
                    </Button>
                  )}
                </View>
              </React.Fragment>
            }

            <Text style={styles.sectionFormText}>Insured: {license.is_insured ? 'True' : 'False'}</Text>
          </View>
        )}
      </View>
    )
  }
}

LicenseCollapsible.defaultProps = {
  editable: true
}

const mapStateToProps = (state) => {
  return {
    fetching: state.license.fetching,
    items: state.license.data || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLicenses: (data = {}) => dispatch(LicenseActions.licenseRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LicenseCollapsible)
