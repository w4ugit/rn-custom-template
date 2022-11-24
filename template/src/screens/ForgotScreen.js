import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from '../modules/global.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormGroup from '../components/formGroup/FormGroup';
import {colors, font} from '../modules/theme';
import Button from '../components/button/Button';
import {CustomIcon} from '../components/customIcon/CustomIcon';
import BackButton from '../components/backButton/BackButton';

export const ForgotScreen = ({navigation}) => {
  const {t} = useTranslation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Вкажіть вірний email'))
      .required(t('Заповніть поле')),
  });
  const [load, setLoad] = useState(false);

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
      <View style={{paddingHorizontal: 24, paddingTop: 64, flex: 1}}>
        <Text style={[styles.h1, {marginBottom: 20}]}>
          {t('Забули пароль?')}
        </Text>
        <Text
          style={{
            color: colors.GRAY,
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontWeight: '400',
            marginBottom: 40,
          }}>
          {t(
            'Будь-ласка, введіть адресу електронної пошти нижче, щоб отримати інструкції щодо скидання пароля.',
          )}
        </Text>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            //load(true);
            console.log('[Log]', values);
            navigation.navigate('Code');
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
                <Button
                  label={'ВІДПРАВИТИ ЗАПИТ'}
                  style={{marginBottom: 40}}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({});
