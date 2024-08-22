import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginScreen from '../screens/LoginScreen'
import ShipmentListScreen from '../screens/shipment/ShipmentListScreen'
import ShipmentDetailsScreen from '../screens/shipment/ShipmentDetailsScreen'
import CustomDrawerContent from '../components/CustomDrawerContent'
import ClientsListScreen from '../screens/client/ClientsListScreen'
import AddClientScreen from '../screens/client/AddClientScreen'
import GoodsListScreen from '../screens/stock/GoodsListScreen'
import GoodsDetailsScreen from '../screens/stock/GoodsDetailsScreen'
import AddGoodsScreen from '../screens/stock/AddGoodsScreen'
import DashboardScreen from '../screens/dashboard/DashboardScreen'
import BottomTabNavigator from '../navigation/BottomTabNavigator'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="MainHome" component={BottomTabNavigator} />
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Shipments" component={ShipmentListScreen} />
    <Drawer.Screen name="ShipmentDetails" component={ShipmentDetailsScreen} />
    <Drawer.Screen name="Clients" component={ClientsListScreen} />
    <Drawer.Screen name="NewClient" component={AddClientScreen} />
    <Drawer.Screen name="Goods" component={GoodsListScreen} />
    <Drawer.Screen name="NewGoods" component={AddGoodsScreen} />
    <Drawer.Screen name="GoodsDetails" component={GoodsDetailsScreen} />
  </Drawer.Navigator>
)

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppNavigator
