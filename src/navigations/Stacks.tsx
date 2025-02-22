import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {appStacks} from './navJson';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../theme/index';

type Stacks = {
  stacks: {
    initialRouteName: string;
    stacksArr: Array<{name: string; key: string; component: any}>;
  };
};
// Custom Component For Create Stack
const RenderStacks: React.FC<Stacks> = ({stacks}) => {
  const navigation = useNavigation<any>();
  const Stack = createStackNavigator();
  const headerLeft = (props: any) => {
    return (
      <View style={{marginLeft: 20}}>
        <Ionicons
          onPress={() => navigation.toggleDrawer()}
          name={'ios-menu'}
          color={COLORS.accentColor}
          size={24}
        />
      </View>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={stacks.initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primaryColor,
        },
        headerTintColor: COLORS.accentColor,
        headerTitleStyle: {
          fontFamily: FONTS.semiBold,
        },
      }}>
      {stacks.stacksArr.map((screen: any) => (
        <Stack.Screen {...screen} />
      ))}
    </Stack.Navigator>
  );
};

// Auth Stack
const AuthNavigator: React.FC = () => {
  return <RenderStacks stacks={appStacks.login}></RenderStacks>;
};

//Main Stacks
const DashboardStacks: React.FC = () => {
  return <RenderStacks stacks={appStacks.dashboard} />;
};
const OperationalStacks: React.FC = () => {
  return <RenderStacks stacks={appStacks.operationalStacks} />;
};

const ReportsStacks: React.FC = () => {
  return <RenderStacks stacks={appStacks.reportsStacks} />;
};

const KPIStacks: React.FC = () => {
  return <RenderStacks stacks={appStacks.kpiStacks} />;
};

const AgeingStacks: React.FC = () => {
  return <RenderStacks stacks={appStacks.ageingStacks} />;
};

const QualityReportStacks: React.FC = () => {
  return <RenderStacks stacks={appStacks.qualityReportStacks} />;
};
// Add Your Stack Here

export {
  AuthNavigator,
  DashboardStacks,
  OperationalStacks,
  ReportsStacks,
  KPIStacks,
  AgeingStacks,
  QualityReportStacks
};

export default DashboardStacks;
