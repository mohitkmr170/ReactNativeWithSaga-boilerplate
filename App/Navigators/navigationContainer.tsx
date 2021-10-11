import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen, HomeScreen} from '@/Containers';
import {NavigationContainerName} from '@/Utils';

const StackNavigator = createNativeStackNavigator();

export function RootNavigator() {
  let isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <StackNavigator.Navigator
          screenOptions={{
            header: () => null,
          }}>
          <StackNavigator.Screen
            component={HomeScreen}
            name={NavigationContainerName.HomeScreen}
          />
        </StackNavigator.Navigator>
      ) : (
        <StackNavigator.Navigator>
          <StackNavigator.Screen
            component={LoginScreen}
            name={NavigationContainerName.LoginScreen}
          />
        </StackNavigator.Navigator>
      )}
    </NavigationContainer>
  );
}
