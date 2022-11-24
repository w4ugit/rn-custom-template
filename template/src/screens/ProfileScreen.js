import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {styles} from '../modules/global.style';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import {useTranslation} from 'react-i18next';
import {colors} from '../modules/theme';
import Button from '../components/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout, setUser} from '../store/slices/userSlice';
import {CustomBottomSheet} from '../components/customBottomSheet/CustomBottomSheet';
import {useMutation} from '@apollo/client';
import {CHANGE_LANG} from '../graphql/Mutation/Profile';
import {showMessage} from 'react-native-flash-message';

export const ProfileScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [showLang, setShowLang] = useState(false);
  const [changeLang, {}] = useMutation(CHANGE_LANG);
  const languages = [
    {id: 'ua', name: t('Українська')},
    {id: 'en', name: 'Англійська'},
  ];

  return (
    <SafeAreaView style={styles.content}>
      <View style={{paddingHorizontal: 24}}>
        <Text style={[styles.h1, {marginBottom: 20, marginTop: 64}]}>
          {t('Налаштування')}
        </Text>
        <Pressable
          style={css.button}
          onPress={() => navigation.navigate('Profile.Setting')}>
          <Text style={css.label}>{t('Мій профіль')}</Text>
          <CustomIcon
            icon={'arrow-right'}
            size={14}
            style={{color: colors.SIR}}
          />
        </Pressable>
        <Pressable style={css.button} onPress={() => setShowLang(true)}>
          <Text style={css.label}>{t('Мова')}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={css.badge}>
              {
                languages.find(lang => {
                  return lang.id === user.lang;
                }).name
              }
            </Text>
            <CustomIcon
              icon={'arrow-right'}
              size={14}
              style={{color: colors.SIR}}
            />
          </View>
        </Pressable>
        <Pressable style={css.button}>
          <Text style={css.label}>{t('Розсташування')}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={css.badge}>Луцьк</Text>
            <CustomIcon
              icon={'arrow-right'}
              size={14}
              style={{color: colors.SIR}}
            />
          </View>
        </Pressable>
        <Button
          onPress={() => {
            dispatch(logout());
          }}
          type={'info'}
          label={'Вийти'}
          style={{marginTop: 34}}
        />
        <View style={{alignItems: 'center', marginTop: 60}}>
          <CustomIcon
            icon={'logo'}
            size={90}
            style={{color: colors.APP, marginBottom: 16}}
          />
          <Text
            style={{
              color: colors.GRAY,
              fontFamily: 'Montserrat',
              fontSize: 13,
              fontWeight: '500',
            }}>
            {t('Версія')} 1.0.0
          </Text>
        </View>
      </View>
      <CustomBottomSheet
        visible={showLang}
        onClose={() => showLang(false)}
        onPress={item => {
          setShowLang(false);
          changeLang({
            variables: {
              lang: item.id,
            },
          })
            .then(response => {
              dispatch(setUser(response.data.changeLang.profile));
              showMessage({
                message: t('Мову змінено'),
                type: 'success',
              });
            })
            .catch(error => {
              showMessage({
                message: error.message,
                type: 'error',
              });
            });
        }}
        options={languages}
        value={null}
      />
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  button: {
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.BLACK,
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
  },
  badge: {
    color: colors.SIR,
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 16,
  },
});
