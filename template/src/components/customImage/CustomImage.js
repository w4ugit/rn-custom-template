import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import {View} from 'react-native';

export const CustomImage = ({uri, width, height, style}) => {
  if (!uri) {
    return <View style={{width, height}} />;
  }
  if (uri.indexOf('svg') === -1) {
    return (
      <FastImage
        source={{uri: uri}}
        style={[{width: width, height: height}, style]}
      />
    );
  } else {
    return <SvgUri width={width} height={height} uri={uri} style={style} />;
  }
};
