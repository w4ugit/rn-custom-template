import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../modules/theme';

export const Radio = ({options, handleChange, value}) => {
  return (
    <View style={css.box}>
      {options.map(option => {
        return (
          <Pressable
            onPress={() => handleChange(option.value)}
            key={option.value}
            style={[css.option, value === option.value ? css.active : {}]}>
            <Text
              style={[css.label, value === option.value ? css.activeText : {}]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const css = StyleSheet.create({
  box: {
    borderRadius: 6,
    borderColor: colors.APP,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    color: colors.APP,
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: '400',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  active: {
    backgroundColor: colors.APP,
  },
  activeText: {
    color: colors.WHITE,
  },
});
