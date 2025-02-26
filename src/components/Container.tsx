import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Header, { HeaderIProps } from './Header';
import context from '../context';
import StatusBar from './StatusBar';
import { COLORS } from '../theme';
type ContainerIProps = {
  backgroundColor?: string;
  isLoading?: boolean;
  header?: HeaderIProps;
  style?: ViewStyle;
  statusBarType?: 'dark' | 'light';
  goBack?: boolean;
  testID?: string;
  children: any;
};

const Container: React.FC<ContainerIProps> = ({
  children,
  backgroundColor = COLORS.primaryColor,
  isLoading,
  header,
  style,
  statusBarType = 'dark',
  goBack,
}) => {
  const defaultStyle: ViewStyle = {
    backgroundColor: backgroundColor
      ? backgroundColor
      : header?.backgroundColor,
  };

  const navigation = useNavigation();
  const toast = useContext(context.toast);
  const [exitCount, setExitCount] = useState(0);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  // }, []);

  const onBackPress = () => {
    if (goBack || header?.goBack) {
      navigation.goBack();
      return true;
    }
    appExitStart();
    return true;
  };

  useEffect(() => {
    if (exitCount === 2) {
      toast.showToast('Press one more back to exit');
    } else if (exitCount === 3) {
      // BackHandler.exitApp();
    }
  }, [exitCount]);

  const appExitStart = () => {
    setExitCount(c => c + 1);
    setExitCountToZero();
  };

  const setExitCountToZero = () => {
    setTimeout(() => {
      setExitCount(0);
    }, 2000);
  };

  return (
    <>
      {header ? <Header {...header} /> : null}
      {statusBarType ? (
        <StatusBar backgroundColor={backgroundColor} type={statusBarType} />
      ) : null}

      <SafeAreaView style={[containerStyle.container, style]}>
        {isLoading ? <Loading /> : <View style={{ flex: 1 }} >{children}</View>}
      </SafeAreaView>
    </>
  );
};

const Loading = () => {
  return (
    <View style={containerStyle.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.newDark} style={{flex:1}}/>
    </View>
  );
};

export default Container;

const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
