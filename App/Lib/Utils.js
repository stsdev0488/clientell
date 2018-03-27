export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseClientAddress = client => {
  return `${client.street_address} ${client.street_address2}, ${client.city} ${client.state} ${client.postal_code}`
}