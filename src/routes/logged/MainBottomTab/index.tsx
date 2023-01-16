import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login } from '../../../screens';

const Tab = createBottomTabNavigator();

export default  function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Login} />
      {/* {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

