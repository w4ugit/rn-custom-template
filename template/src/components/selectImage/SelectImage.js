import React from 'react';
import {Alert, Appearance, SafeAreaView, StyleSheet} from 'react-native';
import ActionSheet from '../actionSheet/ActionSheet';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';

export const SelectImage = ({
  show,
  onSelect,
  onClose,
  multiple = false,
  crop = false,
}) => {
  const {t} = useTranslation();
  const actionItems = [
    {
      id: 1,
      label: t('Зробити фото'),
      onPress: async () => {
        await pickImageCamera();
      },
      icon: false,
      iconSize: 22,
      styleBox: styles.labelBox,
      styleText: styles.labelText,
    },
    {
      id: 2,
      label: t('Вибрати фото'),
      onPress: async () => {
        await pickImageRoll();
      },
      icon: false,
      iconSize: 22,
      styleBox: styles.labelBox,
      styleText: styles.labelText,
    },
  ];

  // Вибір файлу з папок
  const pickImageRoll = async () => {
    onClose(false);
    setTimeout(async () => {
      ImagePicker.openPicker({
        width: 150,
        height: 120,
        cropping: crop,
        multiple: multiple,
        includeBase64: true,
      })
        .then(image => {
          onSelect(image);
        })
        .catch(error => {
          Alert.alert('Помилка', error.message, [{text: 'OK'}]);
        });
    }, 500);
  };
  // Камера
  const pickImageCamera = async () => {
    onClose(false);
    setTimeout(async () => {
      ImagePicker.openPicker({
        width: 150,
        height: 120,
        cropping: crop,
        multiple: multiple,
        includeBase64: true,
      })
        .then(image => {
          onSelect(image);
        })
        .catch(error => {
          Alert.alert('Помилка', error.message, [{text: 'OK'}]);
        });
    }, 500);
  };

  return (
    <Modal
      isVisible={show}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
      backdropOpacity={0.4}
      onBackdropPress={() => onClose(false)}>
      <SafeAreaView>
        <ActionSheet
          actionItems={actionItems}
          onCancel={() => onClose(false)}
        />
      </SafeAreaView>
    </Modal>
  );
};
const colorScheme = Appearance.getColorScheme();
const styles = StyleSheet.create({
  labelBox: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
  },
  labelText: {
    color: colorScheme === 'dark' ? '#fff' : '#262626',
    fontSize: 17,
    textAlign: 'center',
  },
});
