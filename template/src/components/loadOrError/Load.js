import React from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {colors} from '../../modules/theme';

export const Load = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        paddingHorizontal: 24,
      }}>
      <Lottie
        source={require('../../../assets/lottie/26918-book-page-turn-story-telling.json')}
        autoPlay
        loop
        style={{width: 200, alignSelf: 'center'}}
      />
    </View>
  );
};

const css = StyleSheet.create({});
