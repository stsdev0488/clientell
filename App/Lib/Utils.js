import React from 'react'
import {ActionSheet} from 'native-base'
import { NavigationActions } from 'react-navigation'

export const formDiscardHandler = (navigation, {previousScene, scene, jumpToIndex}) => {
  const { route, focused, index } = scene

  if (previousScene.key === 'AddClient') {
    if (previousScene.params && previousScene.params.formTouched) {
      const BUTTONS = ["Discard", "No"]
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          title: "Do you want to cancel adding this client? Any information you entered will be lost."
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            previousScene.params.resetter()
            if (route.index > 0) {
              const { routeName, key } = route.routes[1]
              jumpToIndex(scene.index)
              navigation.dispatch(NavigationActions.back({ key }))
            } else {
              jumpToIndex(scene.index)
            }
          }
        }
      )
    } else {
      if (route.index > 0) {
        const { routeName, key } = route.routes[1]
        jumpToIndex(scene.index)
        navigation.dispatch(NavigationActions.back({ key }))
      } else {
        jumpToIndex(scene.index)
      }
    }
  } else if (previousScene.key === 'Clients' || previousScene.key === 'Unreviewed') {
    const ch = previousScene.routes[previousScene.index]
    if (ch.params && ch.params.formTouched) {
      const BUTTONS = ["Discard", "No"]
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          title: "Do you want to cancel editing this client? Any changes you made will be lost."
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            ch.params.resetter()
            if (route.index > 0) {
              const { routeName, key } = route.routes[1]
              jumpToIndex(scene.index)
              navigation.dispatch(NavigationActions.back({ key }))
            } else {
              jumpToIndex(scene.index)
            }
          }
        }
      )
    } else {
      if (route.index > 0) {
        const { routeName, key } = route.routes[1]
        jumpToIndex(scene.index)
        navigation.dispatch(NavigationActions.back({ key }))
      } else {
        jumpToIndex(scene.index)
      }
    }
  } else {
    if (route.index > 0) {
      const { routeName, key } = route.routes[1]
      jumpToIndex(scene.index)
      navigation.dispatch(NavigationActions.back({ key }))
    } else {
      jumpToIndex(scene.index)
    }
  }
}

export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseClientAddress = client => {
  return `${client.street_address || ''} ${client.street_address2 || ''}, ${client.city || ''} ${client.state || ''} ${client.postal_code || ''}`
}

export const parseEditClient = client => {
  const {
    client_type, organization_name, first_name, last_name, middle_name, email, street_address,
    street_address2, country_id, city, state, postal_code, billing_first_name, billing_middle_name, billing_last_name,
    billing_street_address, billing_street_address2, billing_city, billing_state, billing_postal_code, initial_star_rating,
    phone_number, phone_number_ext, alt_phone_number, alt_phone_number_ext, billing_phone_number, billing_phone_number_ext
  } = client

  let obj = {
    currentPosition: 0,
    clientType: client_type,
    personalData: {
      organization_name,
      first_name,
      last_name,
      middle_name,
      email,
      phone_number: phone_number ? phone_number.replace('+1', '') : '',
      phone_number_ext,
      alt_phone_number: alt_phone_number ? alt_phone_number.replace('+1', '') : '',
      alt_phone_number_ext
    },
    addressData: {
      street_address,
      street_address2,
      country_id,
      city,
      state,
      postal_code
    },
    billingData: {
      billing_first_name,
      billing_middle_name,
      billing_last_name,
      billing_street_address,
      billing_street_address2,
      billing_city,
      billing_state,
      billing_postal_code,
      billing_phone_number: billing_phone_number ? billing_phone_number.replace('+1', '') : '',
      billing_phone_number_ext
    },
    ratingData: {
      initial_star_rating
    },
    clientData: {
      client_type, organization_name, first_name, last_name, middle_name, email, street_address,
      street_address2, country_id, city, state, postal_code, billing_first_name, billing_middle_name, billing_last_name,
      billing_street_address, billing_street_address2, billing_city, billing_state, billing_postal_code, initial_star_rating,
      phone_number, phone_number_ext, alt_phone_number, alt_phone_number_ext, billing_phone_number, billing_phone_number_ext
    }
  }

  return obj
}

export const parseClientError = (errors, clientType) => {
  if (typeof errors !== 'object') {
    return [['Something went wrong, while submitting data. Please try again.']]
  }

  const personal = ['organization_name', 'first_name', 'last_name', 'middle_name', 'email', 'phone_number', 'phone_number_ext', 'alt_phone_number', 'alt_phone_number_ext']
  const address = ['street_address', 'street_address2', 'country_id', 'city', 'state', 'postal_code']
  const billing = ['billing_first_name', 'billing_middle_name', 'billing_last_name', 'billing_street_address', 'billing_street_address2', 'billing_city', 'billing_state', 'billing_postal_code', 'billing_phone_number', 'billing_phone_number_ext']
  const rating = ['initial_star_rating']

  const keys = (Object.keys(errors))
  let groupedError = {
    personal: [],
    address: [],
    billing: [],
    rating: []
  }

  keys.forEach(a => {
    if (personal.includes(a)) {
      groupedError.personal.push(errors[a][0])
    } else if (address.includes(a)) {
      groupedError.address.push(errors[a][0])
    } else if (billing.includes(a)) {
      groupedError.billing.push(errors[a][0])
    } else if (rating.includes(a)) {
      groupedError.rating.push(errors[a][0])
    }
  })

  if (clientType === 'individual') {
    delete groupedError.billing
  }

  return Object.values(groupedError)
}

export const getPhoneExtension = (phone_number) => {
  const hasExtension = phone_number.search(',')

  if (hasExtension > 0) {
    return phone_number.substring(phone_number.indexOf(",") + 1)
  } else {
    return ''
  }
}


export const US_STATES = [
  {"name":"Alabama","id":"AL"},
  {"name":"Alaska","id":"AK"},
  {"name":"Arizona","id":"AZ"},
  {"name":"Arkansas","id":"AR"},
  {"name":"California","id":"CA"},
  {"name":"Colorado","id":"CO"},
  {"name":"Connecticut","id":"CT"},
  {"name":"Delaware","id":"DE"},
  {"name":"District of Columbia","id":"DC"},
  {"name":"Florida","id":"FL"},
  {"name":"Georgia","id":"GA"},
  {"name":"Hawaii","id":"HI"},
  {"name":"Idaho","id":"ID"},
  {"name":"Illinois","id":"IL"},
  {"name":"Indiana","id":"IN"},
  {"name":"Iowa","id":"IA"},
  {"name":"Kansa","id":"KS"},
  {"name":"Kentucky","id":"KY"},
  {"name":"Lousiana","id":"LA"},
  {"name":"Maine","id":"ME"},
  {"name":"Maryland","id":"MD"},
  {"name":"Massachusetts","id":"MA"},
  {"name":"Michigan","id":"MI"},
  {"name":"Minnesota","id":"MN"},
  {"name":"Mississippi","id":"MS"},
  {"name":"Missouri","id":"MO"},
  {"name":"Montana","id":"MT"},
  {"name":"Nebraska","id":"NE"},
  {"name":"Nevada","id":"NV"},
  {"name":"New Hampshire","id":"NH"},
  {"name":"New Jersey","id":"NJ"},
  {"name":"New Mexico","id":"NM"},
  {"name":"New York","id":"NY"},
  {"name":"North Carolina","id":"NC"},
  {"name":"North Dakota","id":"ND"},
  {"name":"Ohio","id":"OH"},
  {"name":"Oklahoma","id":"OK"},
  {"name":"Oregon","id":"OR"},
  {"name":"Pennsylvania","id":"PA"},
  {"name":"Rhode Island","id":"RI"},
  {"name":"South Carolina","id":"SC"},
  {"name":"South Dakota","id":"SD"},
  {"name":"Tennessee","id":"TN"},
  {"name":"Texas","id":"TX"},
  {"name":"Utah","id":"UT"},
  {"name":"Vermont","id":"VT"},
  {"name":"Virginia","id":"VA"},
  {"name":"Washington","id":"WA"},
  {"name":"West Virginia","id":"WV"},
  {"name":"Wisconsin","id":"WI"},
  {"name":"Wyoming","id":"WY"}
]

export const countries = [
  {"name": "Afghanistan", "code": "AF"},
  {"name": "land Islands", "code": "AX"},
  {"name": "Albania", "code": "AL"},
  {"name": "Algeria", "code": "DZ"},
  {"name": "American Samoa", "code": "AS"},
  {"name": "AndorrA", "code": "AD"},
  {"name": "Angola", "code": "AO"},
  {"name": "Anguilla", "code": "AI"},
  {"name": "Antarctica", "code": "AQ"},
  {"name": "Antigua and Barbuda", "code": "AG"},
  {"name": "Argentina", "code": "AR"},
  {"name": "Armenia", "code": "AM"},
  {"name": "Aruba", "code": "AW"},
  {"name": "Australia", "code": "AU"},
  {"name": "Austria", "code": "AT"},
  {"name": "Azerbaijan", "code": "AZ"},
  {"name": "Bahamas", "code": "BS"},
  {"name": "Bahrain", "code": "BH"},
  {"name": "Bangladesh", "code": "BD"},
  {"name": "Barbados", "code": "BB"},
  {"name": "Belarus", "code": "BY"},
  {"name": "Belgium", "code": "BE"},
  {"name": "Belize", "code": "BZ"},
  {"name": "Benin", "code": "BJ"},
  {"name": "Bermuda", "code": "BM"},
  {"name": "Bhutan", "code": "BT"},
  {"name": "Bolivia", "code": "BO"},
  {"name": "Bosnia and Herzegovina", "code": "BA"},
  {"name": "Botswana", "code": "BW"},
  {"name": "Bouvet Island", "code": "BV"},
  {"name": "Brazil", "code": "BR"},
  {"name": "British Indian Ocean Territory", "code": "IO"},
  {"name": "Brunei Darussalam", "code": "BN"},
  {"name": "Bulgaria", "code": "BG"},
  {"name": "Burkina Faso", "code": "BF"},
  {"name": "Burundi", "code": "BI"},
  {"name": "Cambodia", "code": "KH"},
  {"name": "Cameroon", "code": "CM"},
  {"name": "Canada", "code": "CA"},
  {"name": "Cape Verde", "code": "CV"},
  {"name": "Cayman Islands", "code": "KY"},
  {"name": "Central African Republic", "code": "CF"},
  {"name": "Chad", "code": "TD"},
  {"name": "Chile", "code": "CL"},
  {"name": "China", "code": "CN"},
  {"name": "Christmas Island", "code": "CX"},
  {"name": "Cocos (Keeling) Islands", "code": "CC"},
  {"name": "Colombia", "code": "CO"},
  {"name": "Comoros", "code": "KM"},
  {"name": "Congo", "code": "CG"},
  {"name": "Congo, The Democratic Republic of the", "code": "CD"},
  {"name": "Cook Islands", "code": "CK"},
  {"name": "Costa Rica", "code": "CR"},
  {"name": 'Cote D"Ivoire', "code": "CI"},
  {"name": "Croatia", "code": "HR"},
  {"name": "Cuba", "code": "CU"},
  {"name": "Cyprus", "code": "CY"},
  {"name": "Czech Republic", "code": "CZ"},
  {"name": "Denmark", "code": "DK"},
  {"name": "Djibouti", "code": "DJ"},
  {"name": "Dominica", "code": "DM"},
  {"name": "Dominican Republic", "code": "DO"},
  {"name": "Ecuador", "code": "EC"},
  {"name": "Egypt", "code": "EG"},
  {"name": "El Salvador", "code": "SV"},
  {"name": "Equatorial Guinea", "code": "GQ"},
  {"name": "Eritrea", "code": "ER"},
  {"name": "Estonia", "code": "EE"},
  {"name": "Ethiopia", "code": "ET"},
  {"name": "Falkland Islands (Malvinas)", "code": "FK"},
  {"name": "Faroe Islands", "code": "FO"},
  {"name": "Fiji", "code": "FJ"},
  {"name": "Finland", "code": "FI"},
  {"name": "France", "code": "FR"},
  {"name": "French Guiana", "code": "GF"},
  {"name": "French Polynesia", "code": "PF"},
  {"name": "French Southern Territories", "code": "TF"},
  {"name": "Gabon", "code": "GA"},
  {"name": "Gambia", "code": "GM"},
  {"name": "Georgia", "code": "GE"},
  {"name": "Germany", "code": "DE"},
  {"name": "Ghana", "code": "GH"},
  {"name": "Gibraltar", "code": "GI"},
  {"name": "Greece", "code": "GR"},
  {"name": "Greenland", "code": "GL"},
  {"name": "Grenada", "code": "GD"},
  {"name": "Guadeloupe", "code": "GP"},
  {"name": "Guam", "code": "GU"},
  {"name": "Guatemala", "code": "GT"},
  {"name": "Guernsey", "code": "GG"},
  {"name": "Guinea", "code": "GN"},
  {"name": "Guinea-Bissau", "code": "GW"},
  {"name": "Guyana", "code": "GY"},
  {"name": "Haiti", "code": "HT"},
  {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
  {"name": "Holy See (Vatican City State)", "code": "VA"},
  {"name": "Honduras", "code": "HN"},
  {"name": "Hong Kong", "code": "HK"},
  {"name": "Hungary", "code": "HU"},
  {"name": "Iceland", "code": "IS"},
  {"name": "India", "code": "IN"},
  {"name": "Indonesia", "code": "ID"},
  {"name": "Iran, Islamic Republic Of", "code": "IR"},
  {"name": "Iraq", "code": "IQ"},
  {"name": "Ireland", "code": "IE"},
  {"name": "Isle of Man", "code": "IM"},
  {"name": "Israel", "code": "IL"},
  {"name": "Italy", "code": "IT"},
  {"name": "Jamaica", "code": "JM"},
  {"name": "Japan", "code": "JP"},
  {"name": "Jersey", "code": "JE"},
  {"name": "Jordan", "code": "JO"},
  {"name": "Kazakhstan", "code": "KZ"},
  {"name": "Kenya", "code": "KE"},
  {"name": "Kiribati", "code": "KI"},
  {"name": 'Korea, Democratic People"S Republic of', "code": "KP"},
  {"name": "Korea, Republic of", "code": "KR"},
  {"name": "Kuwait", "code": "KW"},
  {"name": "Kyrgyzstan", "code": "KG"},
  {"name": 'Lao People"S Democratic Republic', "code": "LA"},
  {"name": "Latvia", "code": "LV"},
  {"name": "Lebanon", "code": "LB"},
  {"name": "Lesotho", "code": "LS"},
  {"name": "Liberia", "code": "LR"},
  {"name": "Libyan Arab Jamahiriya", "code": "LY"},
  {"name": "Liechtenstein", "code": "LI"},
  {"name": "Lithuania", "code": "LT"},
  {"name": "Luxembourg", "code": "LU"},
  {"name": "Macao", "code": "MO"},
  {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
  {"name": "Madagascar", "code": "MG"},
  {"name": "Malawi", "code": "MW"},
  {"name": "Malaysia", "code": "MY"},
  {"name": "Maldives", "code": "MV"},
  {"name": "Mali", "code": "ML"},
  {"name": "Malta", "code": "MT"},
  {"name": "Marshall Islands", "code": "MH"},
  {"name": "Martinique", "code": "MQ"},
  {"name": "Mauritania", "code": "MR"},
  {"name": "Mauritius", "code": "MU"},
  {"name": "Mayotte", "code": "YT"},
  {"name": "Mexico", "code": "MX"},
  {"name": "Micronesia, Federated States of", "code": "FM"},
  {"name": "Moldova, Republic of", "code": "MD"},
  {"name": "Monaco", "code": "MC"},
  {"name": "Mongolia", "code": "MN"},
  {"name": "Montenegro", "code": "ME"},
  {"name": "Montserrat", "code": "MS"},
  {"name": "Morocco", "code": "MA"},
  {"name": "Mozambique", "code": "MZ"},
  {"name": "Myanmar", "code": "MM"},
  {"name": "Namibia", "code": "NA"},
  {"name": "Nauru", "code": "NR"},
  {"name": "Nepal", "code": "NP"},
  {"name": "Netherlands", "code": "NL"},
  {"name": "Netherlands Antilles", "code": "AN"},
  {"name": "New Caledonia", "code": "NC"},
  {"name": "New Zealand", "code": "NZ"},
  {"name": "Nicaragua", "code": "NI"},
  {"name": "Niger", "code": "NE"},
  {"name": "Nigeria", "code": "NG"},
  {"name": "Niue", "code": "NU"},
  {"name": "Norfolk Island", "code": "NF"},
  {"name": "Northern Mariana Islands", "code": "MP"},
  {"name": "Norway", "code": "NO"},
  {"name": "Oman", "code": "OM"},
  {"name": "Pakistan", "code": "PK"},
  {"name": "Palau", "code": "PW"},
  {"name": "Palestinian Territory, Occupied", "code": "PS"},
  {"name": "Panama", "code": "PA"},
  {"name": "Papua New Guinea", "code": "PG"},
  {"name": "Paraguay", "code": "PY"},
  {"name": "Peru", "code": "PE"},
  {"name": "Philippines", "code": "PH"},
  {"name": "Pitcairn", "code": "PN"},
  {"name": "Poland", "code": "PL"},
  {"name": "Portugal", "code": "PT"},
  {"name": "Puerto Rico", "code": "PR"},
  {"name": "Qatar", "code": "QA"},
  {"name": "Reunion", "code": "RE"},
  {"name": "Romania", "code": "RO"},
  {"name": "Russian Federation", "code": "RU"},
  {"name": "RWANDA", "code": "RW"},
  {"name": "Saint Helena", "code": "SH"},
  {"name": "Saint Kitts and Nevis", "code": "KN"},
  {"name": "Saint Lucia", "code": "LC"},
  {"name": "Saint Pierre and Miquelon", "code": "PM"},
  {"name": "Saint Vincent and the Grenadines", "code": "VC"},
  {"name": "Samoa", "code": "WS"},
  {"name": "San Marino", "code": "SM"},
  {"name": "Sao Tome and Principe", "code": "ST"},
  {"name": "Saudi Arabia", "code": "SA"},
  {"name": "Senegal", "code": "SN"},
  {"name": "Serbia", "code": "RS"},
  {"name": "Seychelles", "code": "SC"},
  {"name": "Sierra Leone", "code": "SL"},
  {"name": "Singapore", "code": "SG"},
  {"name": "Slovakia", "code": "SK"},
  {"name": "Slovenia", "code": "SI"},
  {"name": "Solomon Islands", "code": "SB"},
  {"name": "Somalia", "code": "SO"},
  {"name": "South Africa", "code": "ZA"},
  {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
  {"name": "Spain", "code": "ES"},
  {"name": "Sri Lanka", "code": "LK"},
  {"name": "Sudan", "code": "SD"},
  {"name": "Suriname", "code": "SR"},
  {"name": "Svalbard and Jan Mayen", "code": "SJ"},
  {"name": "Swaziland", "code": "SZ"},
  {"name": "Sweden", "code": "SE"},
  {"name": "Switzerland", "code": "CH"},
  {"name": "Syrian Arab Republic", "code": "SY"},
  {"name": "Taiwan, Province of China", "code": "TW"},
  {"name": "Tajikistan", "code": "TJ"},
  {"name": "Tanzania, United Republic of", "code": "TZ"},
  {"name": "Thailand", "code": "TH"},
  {"name": "Timor-Leste", "code": "TL"},
  {"name": "Togo", "code": "TG"},
  {"name": "Tokelau", "code": "TK"},
  {"name": "Tonga", "code": "TO"},
  {"name": "Trinidad and Tobago", "code": "TT"},
  {"name": "Tunisia", "code": "TN"},
  {"name": "Turkey", "code": "TR"},
  {"name": "Turkmenistan", "code": "TM"},
  {"name": "Turks and Caicos Islands", "code": "TC"},
  {"name": "Tuvalu", "code": "TV"},
  {"name": "Uganda", "code": "UG"},
  {"name": "Ukraine", "code": "UA"},
  {"name": "United Arab Emirates", "code": "AE"},
  {"name": "United Kingdom", "code": "GB"},
  {"name": "United States", "code": "US"},
  {"name": "United States Minor Outlying Islands", "code": "UM"},
  {"name": "Uruguay", "code": "UY"},
  {"name": "Uzbekistan", "code": "UZ"},
  {"name": "Vanuatu", "code": "VU"},
  {"name": "Venezuela", "code": "VE"},
  {"name": "Viet Nam", "code": "VN"},
  {"name": "Virgin Islands, British", "code": "VG"},
  {"name": "Virgin Islands, U.S.", "code": "VI"},
  {"name": "Wallis and Futuna", "code": "WF"},
  {"name": "Western Sahara", "code": "EH"},
  {"name": "Yemen", "code": "YE"},
  {"name": "Zambia", "code": "ZM"},
  {"name": "Zimbabwe", "code": "ZW"}
]

export const SKILLS = [
  'Appliance installation',
  'Architect/engineer',
  'Drywall/Plaster',
  'Framing',
  'Masonry',
  'Painting',
  'Siding',
  'Roofing',
  'Electrician',
  'Plumber',
  'HVAC',
  'Trim/finish',
  'Cabinetry',
  'Counter tops',
  'Insulation',
  'Glazing',
  'Landscaping',
  'Lawn maintenance',
  'Irrigation',
  'Stucco',
  'Well installer',
  'Site prep',
  'Asphalt',
  'Door and Window',
  'Paving/hardscapes',
  'Pool',
  'Security systems',
  'Fence',
  'Deck',
  'Dock',
  'Handy man',
  'General contractor',
  'Trash removal',
  'Flooring'
]
