import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {styles} from '../modules/global.style';
import {Book} from '../components/app/book/Book';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import {useTranslation} from 'react-i18next';
import {colors} from '../modules/theme';
import {Load} from '../components/loadOrError/Load';
import {Error} from '../components/loadOrError/Error';
import {useQuery} from '@apollo/client';
import {MY_BOOKS} from '../graphql/Query/Books';

export const BooksScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {loading, error, data, refetch} = useQuery(MY_BOOKS);
  if (loading) {
    return <Load />;
  }

  if (error) {
    return <Error error={error.message} onRefresh={() => refetch()} />;
  }

  return (
    <SafeAreaView style={styles.content}>
      <FlatList
        data={data.myBooks}
        renderItem={({item, index}) => (
          <Book
            item={item}
            onPress={() => navigation.navigate('Books.View', {id: item.id})}
            withUser={false}
          />
        )}
        ListHeaderComponent={
          <View style={{paddingTop: 18}}>
            <Pressable
              onPress={() => navigation.navigate('Books.Add')}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginRight: 24,
                marginBottom: 20,
              }}>
              <CustomIcon icon={'plus'} size={18} />
            </Pressable>
            <Text style={[styles.h1, {marginLeft: 24, marginBottom: 20}]}>
              {t('Мої книги')}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View
            style={{
              paddingVertical: 60,
              paddingHorizontal: 40,
              backgroundColor: colors.GREY,
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <CustomIcon
              icon={'book-line'}
              size={46}
              style={{color: colors.GRAY, marginBottom: 20}}
            />
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 18,
                fontWeight: '400',
                textAlign: 'center',
              }}>
              {t('У вас ще не має доданих книг для обміну')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
