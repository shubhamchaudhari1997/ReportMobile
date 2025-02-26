import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import { localStorage } from '../../store/store';
import api, { setToken } from '../../services';
import { loginDetails } from '../../store/reduxSlice/loginSlice';
import { Colors } from 'react-native/Libraries/NewAppScreen';



type IProps = {};

const StartUp: React.FC<IProps> = ({ }) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    setUserLogin();
  }, []);

  // const setUserLogin = async () => {
  //   const oneSignalId = await OneSignal.User.pushSubscription.getIdAsync();
  //   const user: any = await localStorage.getItem(localStorage.keys.LOGIN);
  //   const isGuestUser: Boolean = user?.IsGuest === 1 ? true : false;
  //   if (user && !isGuestUser) {
  //     // Cusotmer Login
  //     login(user);
  //   } else {
  //     // Guest User Login
  //     oneSignalId && RegisterGuestUser(oneSignalId);
  //   }
  // };

  const setUserLogin = async () => {
    //const oneSignalId = await OneSignal.User.pushSubscription.getIdAsync();
    const user: any = await localStorage.getItem(localStorage.keys.LOGIN);
    // console.log(user, 'pppp-->')
    // const isGuestUser: Boolean = user?.IsGuest === 1 ? true : false;
    // console.log(isGuestUser, 'isGuestUser->')
    // dispatch(setIsGuestUser(isGuestUser));
    if (user) {
      login(user);
    } else {
      loginAgain();
    }
  };


  const login = async (user: any,) => {
    console.log(user,'user from startup');
    
    const { data, status } = await api.login.login({
      userName: user.userName,
      password: user.password,
      rememberMe: true,
    });
    if (status === 200 && data) {
      setToken(data.token);
      dispatch(loginDetails(data));
    } else {
      loginAgain();
    }
  };


  const loginAgain = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1,backgroundColor:'white'}}>
      {/* <StatusBar
                backgroundColor={Colors.primaryColorLight}
                barStyle="dark-content"
            /> */}
      <LottieView
        style={{ flex:1,margin:-30}}
        source={require('../../assets/animations/startups.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default StartUp;
