import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {SearchNavigator} from './SearchNavigator';
import {NotificationNavigator} from './NotificationNavigator';
import {BooksNavigator} from './BooksNavigator';
import {ProfileNavigator} from './ProfileNavigator';
import {OffersNavigator} from './OffersNavigator';

import {useDispatch, useSelector} from 'react-redux';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import {setCurrentTab} from '../store/slices/systemSlice';
import {LoginScreen} from '../screens/LoginScreen';
import {ForgotScreen} from '../screens/ForgotScreen';
import {CodeScreen} from '../screens/CodeScreen';
import {ResetScreen} from '../screens/ResetScreen';
import {SignScreen} from '../screens/SignScreen';
import {colors} from '../modules/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppStackNavigator = () => {
  const currentTab = useSelector(state => state.system.tab);
  const showTab = useSelector(state => state.system.showTab);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  if (user) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: [
            {
              display: showTab && user ? 'flex' : 'none',
            },
          ],
        }}>
        <Tab.Screen
          name="Search"
          component={SearchNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <CustomIcon
                icon={'search'}
                size={20}
                style={{
                  color: currentTab === 'Search' ? colors.APP : colors.BLACK,
                }}
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              dispatch(setCurrentTab('Search'));
            },
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarBadge: user.notifications,
            tabBarBadgeStyle: {
              backgroundColor: colors.APP,
              fontSize: 12,
              borderWidth: 1,
              borderColor: colors.WHITE,
            },
            tabBarIcon: () => (
              <CustomIcon
                icon={'notificatioin'}
                size={20}
                style={{
                  color:
                    currentTab === 'Notification' ? colors.APP : colors.BLACK,
                }}
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              dispatch(setCurrentTab('Notification'));
            },
          }}
        />
        <Tab.Screen
          name="Offers"
          component={OffersNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarBadge: user.offers,
            tabBarBadgeStyle: {
              backgroundColor: colors.APP,
              fontSize: 12,
              borderWidth: 1,
              borderColor: colors.WHITE,
            },
            tabBarIcon: () => (
              <CustomIcon
                icon={'add'}
                size={20}
                style={{
                  color: currentTab === 'Offers' ? colors.APP : colors.BLACK,
                }}
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              dispatch(setCurrentTab('Offers'));
            },
          }}
        />
        <Tab.Screen
          name="Books"
          component={BooksNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <CustomIcon
                icon={'book'}
                size={20}
                style={{
                  color: currentTab === 'Books' ? colors.APP : colors.BLACK,
                }}
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              dispatch(setCurrentTab('Books'));
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <CustomIcon
                icon={'menu'}
                size={20}
                style={{
                  color: currentTab === 'Profile' ? colors.APP : colors.BLACK,
                }}
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              dispatch(setCurrentTab('Profile'));
            },
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            headerStyle: {
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{
            headerStyle: {
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
          }}
        />
        <Stack.Screen
          name="Code"
          component={CodeScreen}
          options={{
            headerStyle: {
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
          }}
        />
        <Stack.Screen
          name="Reset"
          component={ResetScreen}
          options={{
            headerStyle: {
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
          }}
        />
        <Stack.Screen
          name="Sign"
          component={SignScreen}
          options={{
            headerStyle: {
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
          }}
        />
      </Stack.Navigator>
    );
  }
};
