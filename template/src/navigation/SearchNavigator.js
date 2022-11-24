import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SearchScreen} from '../screens/SearchScreen';

const Stack = createStackNavigator();

export const SearchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Search'}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
