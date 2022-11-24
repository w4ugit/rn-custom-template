import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../modules/global.style';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import {colors} from '../modules/theme';
import {Book} from '../components/app/book/Book';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {toggleTab} from '../store/slices/systemSlice';

export const NotificationsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[styles.content]}>
      <View style={{paddingVertical: 64}}>
        <FlatList
          data={[
            {
              id: 1,
              user: {
                name: 'Юлія Дмитрук',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                isOnline: true,
              },
              book: {
                name: 'Стівен Кінг - Шукач (Темна вежа 1)',
              },
              text: 'Я хочу цю книгу',
              time: '24 вер',
            },
          ]}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('Notifications.Message', {id: 1});
                  dispatch(toggleTab(false));
                }}
                style={{flexDirection: 'row'}}>
                <View style={{marginRight: 16, paddingLeft: 24}}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: colors.GREEN,
                      position: 'absolute',
                      top: 0,
                      left: 16,
                    }}
                  />
                  <Image
                    source={{uri: item.user.image}}
                    style={{width: 32, height: 32, borderRadius: 16}}
                  />
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.LIGHT_GRAY,
                    flex: 1,
                    paddingRight: 24,
                    flexDirection: 'row',
                    paddingBottom: 16,
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: colors.BLACK,
                        fontFamily: 'Montserrat',
                        fontSize: 14,
                        fontWeight: '500',
                        marginBottom: 6,
                      }}>
                      {item.user.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.BLACK,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontWeight: '500',
                        marginBottom: 4,
                      }}>
                      {item.book.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.APP,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontWeight: '400',
                      }}>
                      {item.text}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat',
                      fontSize: 13,
                      fontWeight: '400',
                      color: colors.GRAY,
                      marginLeft: 'auto',
                    }}>
                    {item.time}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.BLACK,
                fontFamily: 'Montserrat',
                fontSize: 24,
                fontWeight: '700',
                marginBottom: 32,
                marginHorizontal: 24,
              }}>
              {t('Повідомлення')}
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
