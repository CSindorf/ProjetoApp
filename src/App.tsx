import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataProvider } from "./context/DataContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeEditoras from './pages/HomeEditoras';
import HomeEditora from "./pages/HomeEditora";

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle:{backgroundColor: '#2a8ba1'},
      tabBarShowLabel: false
    }}>
      <TabBottomNavigation.Screen name="HomeTab" component={Home} options={{
        tabBarIcon: () => (<Ionicons name='home' color='white' size={24} />),
        headerShown: false
      }} />
      <TabBottomNavigation.Screen name="Home Editoras" component={HomeEditoras} options={{
        tabBarIcon: () => (<Ionicons name='albums' color='white' size={24} />),
        headerShown: false
      }} />
    </TabBottomNavigation.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Livraria" component={BottomNavigator} options={{
            headerStyle: {
              backgroundColor: '#2a8ba1',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;