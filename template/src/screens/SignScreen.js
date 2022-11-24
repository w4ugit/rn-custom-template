import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from '../modules/global.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormGroup from '../components/formGroup/FormGroup';
import {colors} from '../modules/theme';
import Button from '../components/button/Button';
import BackButton from '../components/backButton/BackButton';
import {Radio} from '../components/radio/Radio';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import {SelectImage} from '../components/selectImage/SelectImage';
import {useMutation} from '@apollo/client';
import {SIGN} from '../graphql/Mutation';
import {useDispatch} from 'react-redux';
import {setTokens, setUser} from '../store/slices/userSlice';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import * as Keychain from 'react-native-keychain';

export const SignScreen = ({navigation}) => {
  const {t} = useTranslation();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t('Заповніть поле')),
    passwordRepeat: Yup.string().oneOf(
      [Yup.ref('password'), null],
      t('Паролі не співпадають'),
    ),
    firstName: Yup.string().required(t('Заповніть поле')),
    lastName: Yup.string().required(t('Заповніть поле')),
    phone: Yup.string().required(t('Заповніть поле')),
    email: Yup.string()
      .email(t('Вкажіть вірний email'))
      .required(t('Заповніть поле')),
  });
  const [load, setLoad] = useState(false);
  const [selectPic, setSelectPic] = useState(false);
  const [sign] = useMutation(SIGN);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackButton
          styles={{marginLeft: 10}}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 24, paddingTop: 24, flex: 1}}>
          <Text style={[styles.h1, {marginBottom: 20}]}>
            {t('Створити\n' + 'Ваш профіль')}
          </Text>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              sex: 0,
              birthday: new Date(),
              phone: '',
              email: '',
              password: '',
              passwordRepeat: '',
              about: '',
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              setLoad(true);
              const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                sex: values.sex,
                birthday: moment(values.birthday).format('YYYY-MM-DD'),
                phone: values.phone,
                email: values.email,
                about: values.about,
                password: values.password,
              };
              if (typeof values.image === 'object') {
                data.image = JSON.stringify(values.image);
              }
              sign({
                variables: data,
              })
                .then(response => {
                  dispatch(setUser(response.data.createUser.profile));
                  Keychain.setGenericPassword(
                    'auth',
                    JSON.stringify({
                      token: response.data.createUser.token,
                      refreshToken: response.data.createUser.refreshToken,
                    }),
                    {
                      accessControl: 'BiometryCurrentSetOrDevicePasscode',
                      accessible: 'WhenPasscodeSetThisDeviceOnly',
                      authenticationType: 'DevicePasscodeOrBiometrics',
                    },
                  )
                    .then(() => {
                      dispatch(
                        setTokens({
                          token: response.data.createUser.token,
                          refresh_token: response.data.createUser.refreshToken,
                        }),
                      );
                      showMessage({
                        message: t(
                          'Ви успішно зареєстровані і автоматично авторизовані!',
                        ),
                        type: 'success',
                      });
                    })
                    .catch(() => {
                      showMessage({
                        message: t(
                          'Ви успішно зареєстровані, але потрібно ще ввійти',
                        ),
                        type: 'success',
                      });
                      navigation.navigate('Login');
                    });
                })
                .catch(error => {
                  showMessage({
                    message: error.message,
                    type: 'error',
                  });
                })
                .finally(() => setLoad(false));
            }}>
            {({handleSubmit, values, setFieldValue, errors, touched}) => (
              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <FormGroup
                  value={values.firstName}
                  handleChange={e => {
                    setFieldValue('firstName', e);
                  }}
                  label={"Ваше ім'я"}
                  row={'firstName'}
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  value={values.lastName}
                  handleChange={e => {
                    setFieldValue('lastName', e);
                  }}
                  label={'Прізвище'}
                  row={'lastName'}
                  errors={errors}
                  touched={touched}
                />
                <Radio
                  options={[
                    {value: 0, label: 'Інша'},
                    {value: 1, label: 'Жіноча'},
                    {value: 2, label: 'Чоловіча'},
                  ]}
                  handleChange={e => {
                    setFieldValue('sex', e);
                  }}
                  value={values.sex}
                />
                <FormGroup
                  value={values.birthday}
                  handleChange={e => {
                    console.log('[Log]', e);
                    setFieldValue('birthday', e);
                  }}
                  label={'Ваш день народження'}
                  row={'birthday'}
                  errors={errors}
                  touched={touched}
                  date={true}
                />
                <FormGroup
                  value={values.phone}
                  handleChange={e => {
                    setFieldValue('phone', e);
                  }}
                  label={'Номер телефону'}
                  row={'phone'}
                  errors={errors}
                  touched={touched}
                  badge={'+38'}
                  maxSize={10}
                />
                <FormGroup
                  value={values.email}
                  handleChange={e => {
                    setFieldValue('email', e);
                  }}
                  label={'E-mail'}
                  row={'email'}
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  value={values.password}
                  handleChange={e => {
                    setFieldValue('password', e);
                  }}
                  label={'Пароль'}
                  row={'password'}
                  errors={errors}
                  touched={touched}
                  password={true}
                />
                <FormGroup
                  value={values.passwordRepeat}
                  handleChange={e => {
                    setFieldValue('passwordRepeat', e);
                  }}
                  label={'Підтвердження пароля'}
                  row={'passwordRepeat'}
                  errors={errors}
                  touched={touched}
                  password={true}
                />
                <FormGroup
                  value={values.about}
                  handleChange={e => {
                    setFieldValue('about', e);
                  }}
                  label={'Про мене'}
                  row={'about'}
                  errors={errors}
                  touched={touched}
                  resize={true}
                />
                <View style={{marginBottom: 42}}>
                  <Text
                    style={{
                      color: colors.BLACK,
                      fontFamily: 'Montserrat',
                      fontSize: 14,
                      fontWeight: '500',
                      marginBottom: 16,
                    }}>
                    {t('Фото профілю')}
                  </Text>
                  <Pressable
                    onPress={() => setSelectPic(true)}
                    style={{
                      width: 151,
                      height: 120,
                      borderRadius: 6,
                      borderColor: colors.APP,
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      backgroundColor: colors.WHITE,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {values.image ? (
                      <Image
                        source={{
                          uri:
                            typeof values.image === 'object'
                              ? `data:${values.image.mime};base64,${values.image.data}`
                              : values.image,
                        }}
                        style={{width: 150, height: 120, borderRadius: 6}}
                      />
                    ) : (
                      <CustomIcon
                        icon={'plus'}
                        size={32}
                        style={{color: colors.APP}}
                      />
                    )}
                  </Pressable>
                  <SelectImage
                    show={selectPic}
                    onSelect={image => {
                      setFieldValue('image', {
                        data: image.data,
                        mime: image.mime,
                      });
                    }}
                    onClose={() => setSelectPic(false)}
                  />
                </View>
                <Button
                  label={'ДАЛІ'}
                  style={{marginBottom: 40}}
                  onPress={handleSubmit}
                  loading={load}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
