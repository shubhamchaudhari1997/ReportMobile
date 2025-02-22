import React from 'react';
import {
  useNavigation,
  useIsFocused,
  DrawerActions,
} from '@react-navigation/native';

import {
  TextStyle,
  ViewStyle,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
//import { Icon } from 'assets';

import Icon from './Icons';
import {IconFamily} from '../model';
import {COLORS} from '../theme';
import {fontsProxima} from '../theme/typography';

//import { fontsProxima } from 'utils/styles/typography';

interface IconType {
  iconType: IconFamily;
  iconName: string;
  style?: TextStyle;
  testID?: string;
}

interface TextType {
  text: any;
  style?: TextStyle;
  testID?: string;
}

interface IsLoading {
  isLoading: any;
  testID?: string;
}

export type HeaderIProps = {
  title?: string;
  backgroundColor?: string;
  statusBarType?: 'dark-content' | 'light-content';
  rightContent?: IconType | TextType | IsLoading;
  leftContent?: IconType | TextType | null;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  toggleDrawer?: any;
  goBack?: any;
  capitlize?: boolean;
};

const Header: React.FC<HeaderIProps> = ({
  title,
  backgroundColor = COLORS.primaryColor,
  statusBarType = 'dark-content',
  rightContent,
  leftContent = {},
  onLeftPress: onLeft,
  toggleDrawer,
  goBack,
  onRightPress,
  capitlize = false,
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const style: ViewStyle = {
    backgroundColor: backgroundColor,
  };

  const textColor =
    backgroundColor === COLORS.accentColor
      ? COLORS.primaryColor
      : COLORS.accentColor;

  const onLeftPress = () => {
    if (onLeft) onLeft();
    if (!toggleDrawer) {
      navigation.goBack();
      return;
    }

    if (toggleDrawer) navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const icon_Name: string = toggleDrawer ? 'menu' : 'arrow-back';
  const icon_Type: string = toggleDrawer ? 'Ionicons' : 'Ionicons';

  const LeftComponent = () => {
    if ((leftContent as TextType).text) {
      const {text, style} = leftContent as TextType;
      return (
        <Text
          numberOfLines={1}
          style={[headerStyle.text, {color: textColor}, style]}>
          {text}
        </Text>
      );
    } else {
      const {iconName, iconType, style} = leftContent as IconType;
      return (
        <Icon
          style={[headerStyle.icon, {color: textColor}, style]}
          type={iconType ?? icon_Name}
          name={iconName ?? icon_Name}
        />
      );
    }
  };

  const RightComponent = () => {
    if (!rightContent) {
      return null;
    }
    if ((rightContent as IsLoading).isLoading) {
      return (
        <View>
          <ActivityIndicator size="small" color={COLORS.new} />
        </View>
      );
    }
    if ((rightContent as TextType).text) {
      const {text, style} = rightContent as TextType;
      return (
        <Text
          numberOfLines={1}
          style={[headerStyle.text, {color: COLORS.new}, style]}>
          {text}
        </Text>
      );
    } else if (rightContent as IconType) {
      const {iconName, iconType, style} = rightContent as IconType;
      return (
        <Icon
          style={[headerStyle.icon, {color: textColor}, style]}
          type={iconType}
          name={iconName}
        />
      );
    }

    return (
      <View>
        <ActivityIndicator size="small" color={COLORS.success} />
      </View>
    );
  };

  const StatusBarComponent = () => {
    return isFocused ? (
      <StatusBar barStyle={statusBarType} backgroundColor={backgroundColor} />
    ) : null;
  };

  return (
    <View style={[headerStyle.container, style]}>
      <StatusBarComponent />
      <View style={[headerStyle.justify_center, headerStyle.flex_1]}>
        <TouchableOpacity
          testID={leftContent?.testID}
          style={headerStyle.padding_start}
          onPress={onLeftPress}>
          <LeftComponent />
        </TouchableOpacity>
      </View>
      <View style={[headerStyle.itemCenter, headerStyle.flex_2]}>
        <Text
          numberOfLines={1}
          style={[
            headerStyle.title,
            {
              color: textColor,
            },
            capitlize && {textTransform: 'uppercase'},
          ]}>
          {title}
        </Text>
      </View>
      <View
        style={[
          headerStyle.justify_center,
          headerStyle.flex_1,
          {alignItems: 'flex-end'},
        ]}>
        <TouchableOpacity
          testID={rightContent?.testID}
          style={headerStyle.padding_end}
          onPress={onRightPress}>
          <RightComponent />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0,
    // justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    // marginTop: Platform.OS === 'ios' ? 44 : 0
    elevation: 3,
  },
  itemCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_1: {
    flex: 2.1,
  },
  flex_2: {
    flex: 4,
  },
  title: {
    fontFamily: fontsProxima.bold,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  icon: {
    fontSize: 22,
    opacity: 0.8,
  },
  text: {
    fontFamily: fontsProxima.bold,
    fontSize: 16,
  },
  justify_center: {
    justifyContent: 'center',
  },
  padding_start: {
    paddingStart: 20,
  },
  padding_end: {
    paddingEnd: 20,
  },
});

export default Header;
