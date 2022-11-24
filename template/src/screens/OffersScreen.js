import React, {useEffect} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {styles} from '../modules/global.style';
import {colors} from '../modules/theme';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {toggleTab} from '../store/slices/systemSlice';
import {useQuery} from '@apollo/client';
import {ALL} from '../graphql/Query/Offer';
import {Load} from '../components/loadOrError/Load';
import {Error} from '../components/loadOrError/Error';
import {User} from '../components/app/user/User';
import {CustomImage} from '../components/customImage/CustomImage';
import {formatDistance} from 'date-fns';
import {uk} from 'date-fns/locale';

export const OffersScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {data, loading, error, refetch} = useQuery(ALL, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (data) {
        refetch();
      }
    });
  }, []);

  const status = id => {
    if (typeof id !== 'number') {
      const str = id.split('_');
      id = str[1];
    }
    switch (Number(id)) {
      case 1:
        return (
          <Text style={{marginBottom: 8, color: colors.APP}}>
            {t('Хоче вашу книгу')}
          </Text>
        );

      case 4:
        return (
          <Text style={{marginBottom: 8, color: colors.FAIL}}>
            {t('Обмін скасований')}
          </Text>
        );
    }
  };

  if (loading) {
    return <Load />;
  }

  if (error) {
    return <Error error={error.message} onRefresh={() => refetch()} />;
  }

  return (
    <SafeAreaView style={[styles.content]}>
      <View style={{paddingVertical: 64, flex: 1}}>
        <FlatList
          data={data.offers}
          contentContainerStyle={{paddingHorizontal: 24}}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: colors.LIGHT_GRAY,
                  paddingVertical: 24,
                }}>
                <User
                  user={item.user}
                  onPress={() =>
                    navigation.navigate('Search', {
                      screen: 'Search.User',
                      id: item.user.id,
                    })
                  }
                />
                <Pressable
                  onPress={() => {
                    navigation.navigate('Offers.Offer', {id: item.id});
                    dispatch(toggleTab(false));
                  }}>
                  {status(item.status)}
                  <View
                    style={{
                      borderRadius: 6,
                      backgroundColor: colors.GREY,
                      padding: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <CustomImage
                      uri={item.bookFrom.images[0]}
                      width={60}
                      height={45}
                      style={{borderRadius: 2}}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        lineHeight: 18,
                        marginLeft: 8,
                      }}>
                      {item.bookFrom.author} - {item.bookFrom.name}
                    </Text>
                  </View>
                  <Text style={{fontSize: 13, color: colors.GRAY}}>
                    {formatDistance(new Date(item.createdAt), new Date(), {
                      locale: uk,
                    })}{' '}
                    {t('тому')}
                  </Text>
                </Pressable>
              </View>
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
              }}>
              {t('Пропозиції')}
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
