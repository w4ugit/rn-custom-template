import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../assets/fonts/selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon');

export const CustomIcon = ({icon, size = 20, style = {}}) => {
  return <Icon name={icon} size={size} style={style} />;
};
