import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {BooksScreen} from '../screens/BooksScreen';

const Stack = createStackNavigator();

export const BooksNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Books'}>
      <Stack.Screen
        name="Books"
        component={BooksScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
