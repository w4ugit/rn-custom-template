import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from '../modules/global.style';
import {colors} from '../modules/theme';
import Button from '../components/button/Button';
import BackButton from '../components/backButton/BackButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export const CodeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackButton
          styles={{marginLeft: 10}}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (value.length === 6) {
      navigation.navigate('Reset');
    }
  }, [value]);

  return (
    <SafeAreaView style={styles.content}>
      <View style={{paddingHorizontal: 24, paddingTop: 24, flex: 1}}>
        <Text style={[styles.h1, {marginBottom: 20}]}>
          {t('Код підтвердження')}
        </Text>
        <Text
          style={{
            color: colors.GRAY,
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontWeight: '400',
            marginBottom: 40,
          }}>
          {t(
            'Ми надіслали вам код доступу.\n' +
              'Будь ласка, введіть його нижче',
          )}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={6}
              rootStyle={css.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View key={index} style={[css.cellRow]}>
                  <Text
                    style={[css.cell, isFocused && css.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <Text
              style={{
                color: colors.GRAY,
                fontFamily: 'Montserrat',
                fontSize: 12,
                fontWeight: '400',
                textAlign: 'center',
                lineHeight: 21,
                marginBottom: 36,
              }}>
              {t(
                'Це допомагає нам автентифікувати кожного користувача на Books, для вашого спокою.',
              )}
            </Text>
            <View
              style={{
                marginBottom: 42,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: colors.BLACK,
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {t('Не отримав код?')}{' '}
              </Text>
              <Pressable>
                <Text
                  style={{
                    color: colors.BLUE,
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  {t('Спробуйте ще раз')}
                </Text>
              </Pressable>
            </View>
            <Button label={'ГОТОВО'} style={{marginBottom: 40}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  cell: {
    width: 32,
    height: 55,
    lineHeight: 55,
    fontSize: 36,
    borderBottomWidth: 2,
    borderBottomColor: colors.LIGHT_GRAY,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  cellRow: {
    width: 32,
    borderBottomWidth: 2,
    borderBottomColor: colors.LIGHT_GRAY,
    marginHorizontal: 4,
  },
  focusCell: {
    borderColor: '#000',
  },
});
