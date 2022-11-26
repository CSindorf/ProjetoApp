import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DataProvider } from './context/DataContext';
import Favoritos from './pages/Favoritos';
import Home from './pages/Home';
import HomeEditora from './pages/HomeEditora';
import HomeEditoras from './pages/HomeEditoras';
import HomeLivro from './pages/Livro';
import Login from './pages/Login';

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#2a8ba1'},
        tabBarShowLabel: false,
      }}>
      <TabBottomNavigation.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: () => <Ionicons name="home" color="white" size={24} />,
          headerShown: false,
        }}
      />
      <TabBottomNavigation.Screen
        name="Home Editoras"
        component={HomeEditoras}
        options={{
          tabBarIcon: () => <Ionicons name="albums" color="white" size={24} />,
          headerShown: false,
        }}
      />
         <TabBottomNavigation.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: () => <Ionicons name="heart-circle" color="white" size={24} />,
          title: 'Favoritos',
        }}
      />
    </TabBottomNavigation.Navigator>
    
  );
};

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Livraria"
            component={BottomNavigator}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#2a8ba1',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Home Editora"
            component={HomeEditora}
            options={{
              title: 'Editora',
              headerStyle: {
                backgroundColor: '#2a8ba1',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Home Livro"
            component={HomeLivro}
            options={{
              title: 'Livro',
              headerStyle: {
                backgroundColor: '#2a8ba1',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
