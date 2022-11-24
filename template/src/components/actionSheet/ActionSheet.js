import React from 'react';
import {Appearance, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CustomIcon} from '../customIcon/CustomIcon';
import {colors} from '../../modules/theme';

const ActionSheet = ({actionItems, onCancel, actionTextColor}) => {
  const {t} = useTranslation();
  const actionSheetItems = [
    ...actionItems,
    {
      id: '#cancel',
      label: t('Скасувати'),
      onPress: () => onCancel(),
      styleText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: '#983d92',
      },
    },
  ];

  return (
    <View style={styles.modalContent}>
      {actionSheetItems.map((actionItem, index) => {
        return (
          <Pressable
            style={[
              styles.actionSheetView,
              index === 0 && {
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
              index === actionSheetItems.length - 2 && {
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                borderBottomWidth: 0,
              },
              index === actionSheetItems.length - 1 && {
                borderBottomWidth: 0,
                backgroundColor: colorScheme === 'dark' ? '#262626' : '#fff',
                marginTop: 8,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
            ]}
            key={index}
            onPress={() => {
              actionItem.onPress();
              onCancel();
            }}>
            <View
              allowFontScaling={false}
              style={[
                styles.actionSheetText,
                actionTextColor && {
                  color: actionTextColor,
                },
                index === actionSheetItems.length - 1 && {
                  color: '#983d92',
                  fontSize: 20,
                },
              ]}>
              <View
                style={[
                  actionItem.styleBox,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                {actionItem.icon && (
                  <CustomIcon
                    size={actionItem.iconSize}
                    icon={actionItem.icon}
                    style={{
                      color: colors.BLACK,
                    }}
                  />
                )}
                <Text style={[actionItem.styleText, {color: colors.BLACK}]}>
                  {actionItem.label}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
const colorScheme = Appearance.getColorScheme();
const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  actionSheetText: {},
  actionSheetView: {
    backgroundColor: colorScheme === 'dark' ? '#262626' : '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor:
      colorScheme === 'dark' ? 'rgba(255, 255, 255, .4)' : 'rgba(0, 0, 0, .1)',
  },
});

ActionSheet.defaultProps = {
  actionItems: [],
  onCancel: () => {},
  actionTextColor: null,
};

export default ActionSheet;
