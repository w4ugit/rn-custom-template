import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from '../modules/global.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormGroup from '../components/formGroup/FormGroup';
import {colors} from '../modules/theme';
import Button from '../components/button/Button';
import {useMutation} from '@apollo/client';
import {LOGIN} from '../graphql/Mutation';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {setTokens, setUser} from '../store/slices/userSlice';
import * as Keychain from 'react-native-keychain';

export const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Вкажіть вірний email'))
      .required(t('Заповніть поле')),
    password: Yup.string().required(t('Заповніть поле')),
  });
  const [load, setLoad] = useState(false);
  const [login, {dataMutation, errorMutation, loadingMutation}] =
    useMutation(LOGIN);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.content}>
      <View style={{paddingHorizontal: 24, paddingTop: 64, flex: 1}}>
        <Text style={[styles.h1, {marginBottom: 40}]}>
          {t('Привіт, Раді бачити Вас!')}
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            setLoad(true);
            login({
              variables: {
                username: values.email,
                password: values.password,
              },
            })
              .then(response => {
                Keychain.setGenericPassword(
                  'auth',
                  JSON.stringify(response.data.tokenAuth),
                  {
                    accessControl: 'BiometryCurrentSetOrDevicePasscode',
                    accessible: 'WhenPasscodeSetThisDeviceOnly',
                    authenticationType: 'DevicePasscodeOrBiometrics',
                  },
                ).then(() => {
                  dispatch(
                    setTokens({
                      token: response.data.tokenAuth.token,
                      refresh_token: response.data.tokenAuth.refreshToken,
                    }),
                  );
                  dispatch(setUser(response.data.tokenAuth.payload));
                });
              })
              .catch(error => {
                showMessage({
                  message: t(error.message),
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
              <View>
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
                <Pressable
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => navigation.navigate('Forgot')}>
                  <Text
                    style={{
                      color: colors.GRAY,
                      fontFamily: 'Montserrat',
                      fontWeight: '400',
                      fontSize: 14,
                      marginBottom: 24,
                    }}>
                    {t('Забули пароль?')}
                  </Text>
                </Pressable>
                <Button
                  label={'УВІЙТИ'}
                  loading={load}
                  onPress={handleSubmit}
                  style={{marginBottom: 40}}
                />
                {/*<Text*/}
                {/*  style={{*/}
                {/*    fontSize: 14,*/}
                {/*    fontFamily: 'Montserrat',*/}
                {/*    fontWeight: '400',*/}
                {/*    textAlign: 'center',*/}
                {/*  }}>*/}
                {/*  <Text style={{color: colors.FAIL}}>{t('Новинка!')}</Text>{' '}*/}
                {/*  {t('Використовуй FaceID для швидкого входу')}*/}
                {/*</Text>*/}
                {/*<CustomIcon icon={'faceid'} />*/}
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 'auto',
                    marginBottom: 24,
                  }}>
                  {t('Не маєте облікового запису?')}{' '}
                </Text>
                <Pressable onPress={() => navigation.navigate('Sign')}>
                  <Text style={{color: colors.APP}}>{t('Реєстрація')}</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
