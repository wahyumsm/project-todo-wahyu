import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ListTodo from './screens/ListTodo';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Getstarted">
        <Stack.Screen name=" LIST TODO" component={ListTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
