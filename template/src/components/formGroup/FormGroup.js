import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '../../modules/theme';
import {CustomIcon} from '../customIcon/CustomIcon';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';
import Modal from 'react-native-modal';
import BackButton from '../backButton/BackButton';
import {CustomBottomSheet} from '../customBottomSheet/CustomBottomSheet';

const FormGroup = ({
  value,
  label,
  row,
  handleChange,
  groupStyle,
  errors = null,
  touched = null,
  password = false,
  onBlur = null,
  date = false,
  badge = false,
  maxSize = false,
  resize = false,
  select = false,
  options = [],
}) => {
  const {t} = useTranslation();
  const top = useSharedValue(18);
  const fontSize = useSharedValue(14);
  const [open, setOpen] = useState(false);
  const [textHeight, setTextHeight] = useState(40);
  const [showModal, setShowModal] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      fontSize: fontSize.value,
    };
  });

  useEffect(() => {
    if ((value && value !== '') || badge) {
      top.value = withSpring(8);
      fontSize.value = withSpring(12);
    } else {
      top.value = withSpring(18);
      fontSize.value = withSpring(14);
    }
  }, []);

  return (
    <View>
      <View style={[css.formGroup, groupStyle, {height: textHeight + 14}]}>
        <Animated.Text style={[css.label, animatedStyle]}>
          {t(label)}
        </Animated.Text>
        <View style={{flexDirection: 'row'}}>
          {badge && <Text style={css.badge}>{badge}</Text>}
          <TextInput
            onChangeText={e => handleChange(e)}
            onBlur={() => {
              if (value === '') {
                top.value = withSpring(18);
                fontSize.value = withSpring(14);
              }
              if (onBlur !== null) onBlur();
            }}
            value={
              date
                ? moment(value).format('DD.MM.YYYY')
                : select
                ? value.name
                : value
            }
            editable={!select}
            style={[css.inputText, {height: textHeight}]}
            onFocus={() => {
              top.value = withSpring(8);
              fontSize.value = withSpring(12);
              date ? setOpen(true) : null;
            }}
            onPressIn={() => {
              select ? setShowModal(true) : null;
            }}
            keyboardType={row === 'email' ? 'email-address' : 'default'}
            autoCapitalize={row === 'email' ? 'none' : 'sentences'}
            secureTextEntry={password}
            maxLength={maxSize ? maxSize : null}
            multiline={resize}
            onContentSizeChange={event => {
              if (resize) {
                setTextHeight(event.nativeEvent.contentSize.height + 20);
              }
            }}
          />
        </View>
        {date && (
          <CustomIcon
            icon={'calendar'}
            size={22}
            style={{
              color: colors.APP,
              position: 'absolute',
              right: 16,
              top: 16,
            }}
          />
        )}
        {select && (
          <CustomIcon
            icon={'arrow-right'}
            size={16}
            style={{
              color: colors.APP,
              position: 'absolute',
              right: 16,
              top: 20,
            }}
          />
        )}
      </View>
      {errors && touched && errors[row] && touched[row] && (
        <Text style={css.error}>{t(errors[row])}</Text>
      )}
      {date && (
        <DatePicker
          modal
          open={open}
          date={value}
          onConfirm={date => {
            setOpen(false);
            handleChange(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode={'date'}
        />
      )}
      {select && (
        <CustomBottomSheet
          onPress={item => {
            handleChange(item);
            setShowModal(false);
          }}
          visible={showModal}
          options={options}
          onClose={() => setShowModal(false)}
          value={value}
        />
      )}
    </View>
  );
};

export default FormGroup;

const css = StyleSheet.create({
  inputText: {
    borderWidth: 0,
    color: colors.BLACK,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 16,
    height: 40,
    backgroundColor: 'transparent',
    flex: 1,
  },
  label: {
    color: colors.GRAY,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    position: 'absolute',
    left: 16,
  },
  formGroup: {
    position: 'relative',
    marginBottom: 16,
    paddingTop: 15,
    borderRadius: 6,
    backgroundColor: colors.GREY,
    height: 54,
    paddingHorizontal: 16,
  },
  error: {
    color: colors.FAIL,
    marginBottom: 10,
    marginTop: -15,
  },
  badge: {
    color: '#95a0b6',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginRight: 7,
  },
});
