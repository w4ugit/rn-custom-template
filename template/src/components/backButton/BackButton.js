import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {CustomIcon} from '../customIcon/CustomIcon';

const BackButton = ({onPress, styles, iconStyles}) => {
  return (
    <Pressable onPress={() => onPress()} style={[css.button, styles]}>
      <CustomIcon icon={'arrow-back'} style={iconStyles} />
    </Pressable>
  );
};

export default BackButton;

const css = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    paddingLeft: 15,
  },
});
