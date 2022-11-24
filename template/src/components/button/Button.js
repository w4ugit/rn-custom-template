import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, font} from '../../modules/theme';

const Button = ({
  label,
  type = 'default',
  style = {},
  onPress,
  loading = false,
}) => {
  const {t} = useTranslation();

  return (
    <Pressable style={[css.button, css[type], style]} onPress={onPress}>
      {!loading ? (
        <Text style={[css.label, css[type + 'Text']]}>{t(label)}</Text>
      ) : (
        <ActivityIndicator color={colors.WHITE} size={'small'} />
      )}
    </Pressable>
  );
};

export default Button;

const css = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  label: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
  },
  default: {
    backgroundColor: colors.APP,
    borderRadius: 6,
    paddingVertical: 16,
  },
  defaultText: {
    color: colors.WHITE,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 16,
  },
  error: {
    backgroundColor: colors.FAIL,
    borderRadius: 6,
    paddingVertical: 16,
  },
  errorText: {
    color: colors.WHITE,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 16,
  },
  info: {
    backgroundColor: colors.SIR,
    borderRadius: 6,
    paddingVertical: 16,
  },
  infoText: {
    color: colors.WHITE,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 14,
  },
});
