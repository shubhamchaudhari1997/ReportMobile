import {NavigationContainer} from '@react-navigation/native';
import {PropsWithChildren, useEffect, useState} from 'react';
import CTDrawer from '../components/CTDrawer';
import {appDrawerTabs} from './navJson';
import {Dashboard} from './screens';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import Login from '../screens/auth/Login';
import { AuthNavigator } from './Stacks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme';
import React from 'react';

type NavigatorProps = PropsWithChildren<{}>;

const Navigator: React.FC<NavigatorProps> = ({children}) => {
  const [drawerScreen, setdrawerScreen] = useState<any>();
  const userData = useSelector((state: RootState) => state.login.userData);
  const authenticated =
    userData?.token && drawerScreen?.length > 0 ? true : false;
  // const authenticated = ? true : false;
  useEffect(() => {
    setScreen();
  }, []);

  const setScreen = async () => {
    setdrawerScreen(appDrawerTabs?.drawerTabsArr);
  };
  return (
    <NavigationContainer>
       <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primaryColor}}>
      {authenticated ? <CTDrawer screens={drawerScreen} /> : <AuthNavigator />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Navigator;
