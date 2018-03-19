import { TabNavigator } from 'react-navigation';

/**
 * Screens
 */
import Clients from 'Containers/Clients'
import AddClient from 'Containers/AddClient'
import Search from 'Containers/Search'
import Settings from 'Containers/Settings'

export default TabNavigator({
  Clients: { screen: Clients },
  AddClient: { screen: AddClient },
  Search: { screen: Search },
  Settings: { screen: Settings }
});