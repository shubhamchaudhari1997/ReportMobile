import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
  import React, {Fragment} from 'react';
  
  import {appDrawerTabs} from './navJson';
//   import {useDispatch, useSelector} from 'react-redux';
  import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
  import CDText from '../components/core/CDText';
  import {APP_ANDROID_VERSION} from '../constant/appConfig';
  import {COLORS} from '../theme';
  import {fonts} from '../theme/typography';
//   import {removeItem} from '../store/localStore';
//   import {loginDetails} from '../store/reduxSlice/loginSlice';
  import {DrawerScreens} from '../model';
import { Icon } from '@rneui/base';
  
  type DrawerProps = {
    stacks: Array<any>;
  };
  
  
  type CTDrawerProps = {
    screens: DrawerScreens[];
  };
  const Drawer: React.FC<CTDrawerProps> = ({screens}) => {
    // return <RenderDrawer stacks={appDrawerTabs.drawerTabsArr} />;
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        drawerContent={props => {
          return <DrawerContent {...props} />;
        }}
        screenOptions={{
          drawerActiveBackgroundColor: COLORS.primaryColor,
          drawerActiveTintColor: COLORS.accentColor,
          drawerLabelStyle: {fontFamily: fonts.regular, fontSize: 14},
          headerShown: false,
        }}>
        {screens?.map((screen: any) => (
          <Drawer.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              drawerIcon: ({color, focused, size}) => {
                return (
                  <TouchableOpacity style={styles.iconContainer}>
                    <Icon
                      name={screen.icon}
                      type={screen.type}
                      size={20}
                      color={focused ? COLORS.new : COLORS.secondaryColor}
                      style={{opacity: 0.4}}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        ))}
      </Drawer.Navigator>
    );
  };
  
  type DrawerContentProps = DrawerContentComponentProps;
  
  const DrawerContent: React.FC<DrawerContentProps> = props => {
    // const dispatch = useDispatch();
  
    // const onLogoutPress = () => {
    //   Alert.alert('Logout', 'Do you want to Logout?', [
    //     {
    //       text: 'Yes',
    //       style: 'destructive',
    //       onPress: onLogout,
    //     },
    //     {text: 'No', style: 'cancel', onPress: () => {}},
    //   ]);
    // };
  
    // const onLogout = async () => {
    //   await removeItem('login');
    //   dispatch(loginDetails({}));
    // };
  
    return (
      <View style={styles.container}>
        {/* <LoginUser /> */}
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        {/* <DrawerItem
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
        /> */}
      </View>
    );
  };
  
//   const LoginUser: React.FC<{}> = () => {
//     const userData = useSelector((state: any) => state.userInfo.userData);
  
//     return (
//       <Fragment>
//         <View style={styles.userContainer}>
//           {/* <Avatar
//                       size={80}
//                       containerStyle={{ borderRadius: 5, overflow: 'hidden' }}
//                       source={require('./../assets/images/profile.webp')}
//                   /> */}
//           <CDText style={styles.truTitle}>
//             {`${userData?.Firstname} ${userData?.LastName}`}
//           </CDText>
//         </View>
//       </Fragment>
//     );
//   };
  
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
    city: {
      fontSize: 12,
      fontFamily: fonts.regular,
      paddingVertical: 2,
    },
    userContainer: {
      paddingHorizontal: 20,
      paddingVertical: 25,
      // marginBottom: 10,
      borderRadius: 5,
      // padding: 10,
      backgroundColor: COLORS.primaryColor,
    },
    truTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: COLORS.secondaryColor,
      marginTop: 10,
      textTransform: 'capitalize',
    },
    logoutContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    opacity_6: {
      fontFamily: fonts.regular,
    },
    right_32: {
      right: -32,
    },
    label: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: COLORS.secondaryColor,
    },
    level: {
      backgroundColor: COLORS.blue_chipe,
      paddingHorizontal: 5,
      borderRadius: 2,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    levelText: {
      fontFamily: fonts.bold,
      fontSize: 10,
      textTransform: 'capitalize',
      textAlign: 'center',
    },
  });
  
  export default Drawer;
  