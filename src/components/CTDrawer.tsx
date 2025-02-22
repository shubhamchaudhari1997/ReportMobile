import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerScreens} from '../model';

import React, {Fragment} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from './Icons';
import {COLORS} from '../theme/index';
import {useDispatch, useSelector} from 'react-redux';
import {removeItem} from '../store/localStore';
import {loginDetails} from '../store/reduxSlice/loginSlice';
import CDText from './core/CDText';
import {APP_ANDROID_VERSION} from '../constant/appConfig';
import {fonts} from '../theme/typography';
import {RootState} from '../store/store';

type CTDrawerProps = {
  screens: DrawerScreens[];
};

const CTDrawer: React.FC<CTDrawerProps> = ({screens}) => {
  const AppDrawer = createDrawerNavigator();
  return (
    <AppDrawer.Navigator
      // drawerType="front"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: any) => {
        return <DrawerContent activeTintColor={COLORS.new} {...props} />;
      }}>
      {screens?.map((item: any) => {
        return (
          <AppDrawer.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              drawerIcon: ({color, focused, size}) => {
                return (
                  <TouchableOpacity style={styles.iconContainer}>
                    <Icon
                      name={item.icon}
                      type={item.type}
                      size={20}
                      color={focused ? COLORS.new : COLORS.secondaryColor}
                      style={{opacity: 0.4}}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        );
      })}
    </AppDrawer.Navigator>
  );
};

type DrawerContentProps = DrawerContentComponentProps;

const DrawerContent: React.FC<DrawerContentProps> = props => {
  const dispatch = useDispatch();

  const onLogoutPress = () => {
    Alert.alert('Logout', 'Do you want to Logout?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: onLogout,
      },
      {text: 'No', style: 'cancel', onPress: () => {}},
    ]);
  };

  const onLogout = async () => {
    await removeItem('login');
    dispatch(loginDetails({}));
  };

  return (
    <View style={styles.container}>
      <LoginUser />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label={({color}) => {
          return (
            <View style={styles.logoutContainer}>
              <CDText style={{color: COLORS.secondaryColor}}>Logout</CDText>
              <CDText style={{color: color}}>
                {'v' + APP_ANDROID_VERSION}
              </CDText>
            </View>
          );
        }}
        onPress={onLogoutPress}
      />
    </View>
  );
};

const LoginUser: React.FC = () => {
  const userData:any = useSelector((state: RootState) => state.login.userData);
  return (
    <View style={styles.userContainer}>
      <Image
        source={{uri:'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid'}} // Replace with user profile URL if available
        style={styles.profileImage}
        resizeMode="cover"
      />
            <Text style={styles.userName}>
        {userData?.userDetails?.name}
      </Text>
    </View>
  );
};



export default CTDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
