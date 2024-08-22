import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// Import your screens
import HomeScreen from '../screens/HomeScreen'
import ClientsListScreen from '../screens/client/ClientsListScreen'
import ShipmentListScreen from '../screens//shipment/ShipmentListScreen'
import GoodsListScreen from '../screens/stock/GoodsListScreen'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = 'home-outline'
          } else if (route.name === 'Clients') {
            iconName = 'people-outline'
          } else if (route.name === 'Shipments') {
            iconName = 'cube-outline'
          } else if (route.name === 'Goods') {
            iconName = 'cart-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4A90E2',
        inactiveTintColor: 'gray',
        style: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Clients" component={ClientsListScreen} />
      <Tab.Screen name="Shipments" component={ShipmentListScreen} />
      <Tab.Screen name="Goods" component={GoodsListScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
