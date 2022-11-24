import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NotificationsScreen} from '../screens/NotificationsScreen';

const Stack = createStackNavigator();

export const NotificationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Notifications'}>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
