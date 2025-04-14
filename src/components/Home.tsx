import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
import { barChartToolTip } from '../theme/tooltipStyle';

const Home = () => {
  const data = [
    {value: 5, label: 'a'},
    {value: 8, label: 'b'},
    {value: 49, label: 'c'},
    {value: 70, label: 'd'},
  ];
  const navigation = useNavigation<any>();

  const nav = () => {
    navigation.navigate('Profile');
  };
  return (
    <ScrollView contentContainerStyle={{justifyContent: 'space-evenly'}}>
      <View>
        <BarChart data={data}    pointerConfig={barChartToolTip}/>
      </View>
      <View style={{margin: 10}}>
        <LineChart data={data}  pointerConfig={barChartToolTip} />
      </View>
      <View style={{margin: 10}}>
        <PieChart data={data} />
      </View>
      <View style={{margin: 10}}>
        <PopulationPyramid
          data={[
            {left: 10, right: 12},
            {left: 9, right: 8},
          ]}
        />
      </View>
      {/* <View style={{margin: 10}}>
        <BarChart data={data} horizontal />
      </View> */}
      {/* <View style={{margin: 10, flex: 1}}>
        <PieChart data={data} />
      </View> */}

      <Text>Home</Text>
      <Text onPress={nav}>go to Profile</Text>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
