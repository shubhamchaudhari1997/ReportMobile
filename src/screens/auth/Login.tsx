import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {fontsProxima} from '../../theme/typography';
import {COLORS} from '../../theme/colors';
import CDText from '../../components/core/CDText';
import {Button, Input} from '@rneui/base';
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_USERPASS,
} from '../../constant/string';
import {EMAIL_REGEX} from '../../constant/regex';
import Icon from '../../components/Icons';
import api, { setToken } from '../../services';
import { keys, storeItem } from '../../store/localStore';
import { loginDetails } from '../../store/reduxSlice/loginSlice';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../utils/showSnackbar';

const {width, height} = Dimensions.get('screen');

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalidEmailOrPass, setInvalidEmailOrPass] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch<any>();

  const onEmailChange = (text: string) => {
    setUserName(text);
    setInvalidEmailOrPass(false);
  };
  const onPasswordChange = (text: string) => {
    setPassword(text);
    setInvalidEmailOrPass(false);
  };

  const getIcon = (name: string, color?: string) => {
    return {
      name,
      type: 'material-community',
      size: 18,
      color: color ? color : COLORS.chipe,
    };
  };
  const onEmailFocus = () => {
    setEmailError(false);
  };
  const onPasswordFocus = () => {
    setPasswordError(false);
  };
  const showHidePassword = () => {
    setShowPassword(val => !val);
  };
  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(EMAIL_REGEX);
  };

  const onLoginPress = async () => {
    // const deviceId = await OneSignal.User.pushSubscription.getIdAsync();
    // setPasswordError(false);
    // if (!email) {
    //   setEmailError(true);
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   setEmailInvalid(true);
    //   return;
    // }
    // if (!password) {
    //   setPasswordError(true);
    //   return;
    // }

    setBtnLoading(true);

    const {data, status} = await api.login.login({
      userName: userName,
      password: password,
      rememberMe: true,
    });
    if (data && status === 200) {
      storeItem(keys.LOGIN, {
        userName: userName,
        password: password,
        // isTruUser: true,
      });
      setToken(data.token);
      dispatch(loginDetails(data));
      setBtnLoading(false);
      setInvalidEmailOrPass(false);
    } else {
      console.log('error in api');
      setInvalidEmailOrPass(true);
      setBtnLoading(false);
      return showSnackbar('Please check your credential', 'danger');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            source={require('../../assets/images/login.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: COLORS.red_chipe,
            }}>
            <CDText
              style={{
                fontSize: 30,
                fontFamily: fontsProxima.bold,
                padding: 10,
                alignSelf: 'center',
              }}>
              Login
            </CDText>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: COLORS.primaryColor,
                alignSelf: 'center',
                elevation: 1,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type={'Ionicons'}
                color={COLORS.new}
                name={'person'}
                size={20}
              />
            </View>
          </View>
          <View style={styles.element}>
            <Input
              onFocus={onEmailFocus}
              leftIcon={getIcon('email-outline')}
              keyboardType="email-address"
              placeholder="Email"
              inputStyle={[styles.inputStyle]}
              value={userName}
              onChangeText={onEmailChange}
              containerStyle={[styles.containerStyle]}
              inputContainerStyle={[
                styles.inputContainerStyle,
                emailError || emailInvalid
                  ? {
                      borderBottomColor: COLORS.danger,
                    }
                  : null,
              ]}
            />
            {emailInvalid || emailError ? (
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: COLORS.danger,
                    fontSize: 12,
                    fontFamily: fontsProxima.regular,
                  }}>
                  {INVALID_EMAIL}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[styles.element, {marginTop: 0}]}>
            <Input
              onFocus={onPasswordFocus}
              leftIcon={getIcon('lock-outline')}
              rightIcon={{
                ...getIcon(
                  !showPassword ? 'eye-outline' : 'eye-off-outline',
                  COLORS.secondaryColor,
                ),
                onPress: showHidePassword,
              }}
              secureTextEntry={!showPassword}
              placeholder="Password"
              inputStyle={[styles.inputStyle]}
              autoCapitalize="none"
              textContentType="password"
              value={password}
              onChangeText={onPasswordChange}
              containerStyle={[styles.containerStyle]}
              inputContainerStyle={[
                styles.inputContainerStyle,
                passwordError
                  ? {
                      borderBottomColor: COLORS.danger,
                    }
                  : null,
              ]}
            />
            {passwordError ? (
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: COLORS.danger,
                    fontSize: 12,
                    fontFamily: fontsProxima.regular,
                  }}>
                  {INVALID_PASSWORD}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[styles.element, {marginTop: 0}]}>
            <Button
              loading={btnLoading}
              disabled={btnLoading}
              onPress={onLoginPress}
              titleStyle={styles.titleStyle}
              buttonStyle={styles.buttonStyle}
              title="Login"
            />
            {invalidEmailOrPass ? (
              <View
                style={{
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.danger,
                    fontSize: 12,
                    fontFamily: fontsProxima.regular,
                  }}>
                  {INVALID_USERPASS}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
    padding: 10,
  },
  container: {
    backgroundColor: COLORS.primaryColor,
    marginTop: 60,
    flex: 1,
    color: COLORS.primaryColor,
  },
  imageView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  contentView: {flex: 2, padding: 10},
  title: {fontSize: 30, fontFamily: fontsProxima.bold, padding: 10},
  element: {marginVertical: 10},
  orView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalLine: {backgroundColor: COLORS.chipe, height: 1, width: width / 3},
  orText: {
    fontSize: 16,
    fontFamily: fontsProxima.regular,
    paddingHorizontal: 10,
  },
  opacText: {fontSize: 14, fontFamily: fontsProxima.regular, opacity: 0.4},
  registerText: {
    fontSize: 14,
    fontFamily: fontsProxima.bold,
    color: COLORS.new,
    paddingLeft: 5,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: fontsProxima.regular,
    fontWeight: '400',
  },
  inputStyle: {
    fontFamily: fontsProxima.regular,
    fontSize: 14,
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontFamily: fontsProxima.bold,
    fontSize: 14,
    color: COLORS.primaryColor,
  },
  buttonStyle: {
    margin: 15,
    backgroundColor: COLORS.new,
    height: 50,
  },
  inputContainerStyle: {
    backgroundColor: COLORS.primaryColor,
    overflow: 'hidden',
    borderBottomColor: COLORS.chipe,
  },
  containerStyle: {
    height: 65,
  },
  privacyStyle: {
    fontSize: 14,
    fontFamily: fontsProxima.regular,
    color: COLORS.secondaryColor,
    // color: COLORS.new,
    opacity: 0.4,
  },
  emailStyle: {
    fontSize: 14,
    fontFamily: fontsProxima.bold,
    color: COLORS.new,
  },
  privacyContainer: {
    width: 2,
    height: 14,
    backgroundColor: COLORS.blue_chipe,
    marginHorizontal: 5,
  },
  logo: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
  },
});
