export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseClientAddress = client => {
  return `${client.street_address || ''} ${client.street_address2 || ''}, ${client.city || ''} ${client.state || ''} ${client.postal_code || ''}`
}

export const parseEditClient = client => {
  const {
    client_type, organization_name, first_name, last_name, middle_name, email, street_address,
    street_address2, city, state, postal_code, billing_first_name, billing_middle_name, billing_last_name,
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
      phone_number,
      phone_number_ext,
      alt_phone_number,
      alt_phone_number_ext
    },
    addressData: {
      street_address,
      street_address2,
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
      billing_phone_number,
      billing_phone_number_ext
    },
    ratingData: {
      initial_star_rating
    },
    clientData: {
      client_type, organization_name, first_name, last_name, middle_name, email, street_address,
      street_address2, city, state, postal_code, billing_first_name, billing_middle_name, billing_last_name,
      billing_street_address, billing_street_address2, billing_city, billing_state, billing_postal_code, initial_star_rating,
      phone_number, phone_number_ext, alt_phone_number, alt_phone_number_ext, billing_phone_number, billing_phone_number_ext
    }
  }

  return obj
}

export const parseClientError = (errors, clientType) => {
  const personal = ['organization_name', 'first_name', 'last_name', 'middle_name', 'email', 'phone_number', 'phone_number_ext', 'alt_phone_number', 'alt_phone_number_ext']
  const address = ['street_address', 'street_address2', 'city', 'state', 'postal_code']
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
