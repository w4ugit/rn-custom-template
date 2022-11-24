import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {OffersScreen} from '../screens/OffersScreen';

const Stack = createStackNavigator();

export const OffersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Offers'}>
      <Stack.Screen
        name="Offers"
        component={OffersScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
