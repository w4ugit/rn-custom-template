import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../modules/theme';

export const CustomBottomSheet = ({
  options,
  value,
  visible,
  onClose,
  onPress,
}) => {
  return (
    <Modal
      isVisible={visible}
      style={{padding: 0, margin: 0}}
      onSwipeComplete={() => onClose()}
      onBackdropPress={() => onClose()}
      swipeDirection={['up', 'down']}>
      <View style={css.body}>
        <FlatList
          data={options}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => onPress(item)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor:
                  value === item.value ? colors.APP : colors.LIGHT_GRAY,
                paddingVertical: 16,
              }}>
              <Text
                style={[
                  css.item,
                  {color: value === item.value ? colors.APP : colors.BLACK},
                ]}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

const css = StyleSheet.create({
  body: {
    height: '90%',
    marginTop: 'auto',
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  item: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
  },
});
