import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ShipmentListScreen from '../screens/ShipmentListScreen';
import ShipmentDetailsScreen from '../screens/ShipmentDetailsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import AddClientScreen from '../screens/AddClientScreen'; 
import GoodsListScreen from '../screens/GoodsListScreen';
import GoodsDetailsScreen from '../screens/GoodsDetailsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Shipments" component={ShipmentListScreen} />
    <Drawer.Screen name="ShipmentDetails" component={ShipmentDetailsScreen} />
    <Drawer.Screen name="New Client" component={AddClientScreen} />
    <Drawer.Screen name="Goods" component={GoodsListScreen} />
    <Drawer.Screen name="GoodsDetails" component={GoodsDetailsScreen} />
  </Drawer.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
