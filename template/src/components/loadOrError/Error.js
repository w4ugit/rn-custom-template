import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {colors} from '../../modules/theme';
import {useTranslation} from 'react-i18next';
import Button from '../button/Button';

export const Error = ({error, onRefresh}) => {
  const {t} = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        paddingHorizontal: 24,
      }}>
      <Lottie
        source={require('../../../assets/lottie/85978-error-dialog.json')}
        autoPlay
        style={{width: 200, alignSelf: 'center'}}
      />
      <Text
        style={{
          color: colors.FAIL,
          fontFamily: 'Montserrat',
          fontSize: 14,
          fontWeight: '500',
          textAlign: 'center',
        }}>
        {t(error)}
      </Text>
      <Button
        label={'Оновити'}
        style={{width: 160, alignSelf: 'center', marginTop: 20}}
        onPress={() => onRefresh()}
      />
    </View>
  );
};

const css = StyleSheet.create({});
