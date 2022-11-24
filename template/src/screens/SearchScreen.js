import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../modules/global.style';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import {colors} from '../modules/theme';
import {Book} from '../components/app/book/Book';
import {useQuery} from '@apollo/client';
import {SEARCH} from '../graphql/Query/Search';
import {Load} from '../components/loadOrError/Load';
import {Error} from '../components/loadOrError/Error';
import {CustomBottomSheet} from '../components/customBottomSheet/CustomBottomSheet';
import {debounce} from 'lodash';

export const SearchScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const {loading, error, data, refetch} = useQuery(SEARCH, {
    variables: {
      offset: 0,
      search,
    },
  });

  const handleChange = e => {
    setSearch(e);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  if (loading) {
    return <Load />;
  }

  if (error) {
    return <Error error={error.message} onRefresh={() => refetch()} />;
  }

  return (
    <SafeAreaView style={styles.content}>
      <FlatList
        data={data.books}
        renderItem={({item, index}) => (
          <Book
            item={item}
            onPress={() =>
              navigation.navigate('Search.Book', {
                id: item.id,
                user_id: item.user.id,
              })
            }
            onUserPress={() => {
              navigation.navigate('Search.User', {id: item.user.id});
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => setRefreshing(false));
            }}
          />
        }
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 24,
              backgroundColor: colors.WHITE,
            }}>
            <View
              style={{
                borderRadius: 6,
                backgroundColor: colors.GREY,
                flexDirection: 'row',
                padding: 12,
                flex: 1,
              }}>
              <CustomIcon
                icon={'search'}
                size={15}
                style={{color: colors.SIR, marginRight: 18}}
              />
              <TextInput
                style={{
                  color: colors.GRAY,
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  fontWeight: '400',
                  flex: 1,
                }}
                onChangeText={debouncedResults}
                clearButtonMode={'while-editing'}
              />
            </View>
            <Pressable onPress={() => setShowCity(true)}>
              <CustomIcon
                icon={'map'}
                size={18}
                style={{
                  color: city === null ? colors.SIR : colors.APP,
                  marginLeft: 16,
                }}
              />
            </Pressable>
          </View>
        }
        stickyHeaderIndices={[0]}
      />
      <CustomBottomSheet
        visible={showCity}
        onClose={() => setShowCity(false)}
        onPress={item => {
          setShowCity(false);
          setCity(item);
        }}
        options={data.cities}
        value={null}
      />
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
