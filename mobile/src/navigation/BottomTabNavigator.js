import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// Import your screens
import HomeScreen from '../screens/HomeScreen'
import ClientsListScreen from '../screens/client/ClientsListScreen'
import ShipmentListScreen from '../screens/shipment/ShipmentListScreen'
import GoodsListScreen from '../screens/stock/GoodsListScreen'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = ({ navigation }) => {
  const [showActions, setShowActions] = useState(false)
  const [buttonAnimation] = useState(new Animated.Value(0))

  const toggleActions = () => {
    setShowActions(!showActions)
    Animated.timing(buttonAnimation, {
      toValue: showActions ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  return (
    <>
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
          activeTintColor: '#2E91A4',
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Clients"
          component={ClientsListScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Shipments"
          component={ShipmentListScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Goods"
          component={GoodsListScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabButton} onPress={toggleActions}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        {showActions && (
          <Animated.View
            style={[
              styles.actionButtonContainer,
              {
                opacity: buttonAnimation,
                transform: [
                  {
                    translateY: buttonAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('NewClient')}
            >
              <Ionicons name="person-add-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('NewGoods')}
            >
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1, // Ensure the FAB is above other elements
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E91A4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 5,
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2E91A4',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 5,
  },
})

export default BottomTabNavigator
