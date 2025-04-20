import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-gifted-charts';
import { getBarChartTooltipConfig } from '../theme/tooltipStyle';

const About = () => {
  const data = [
    {value: 50, label: 'Jan'},
    {value: 80, label: 'Feb'},
    {value: 90, label: 'Mar'},
    {value: 70, label: 'Apr'},
    {value: 60, label: 'May'},
  ];
  const navigation = useNavigation<any>();
  const nav = () => {
    navigation.navigate('TobTabs');
  };
  return (
    <View>
      <Text>Abouts</Text>
      <Text onPress={nav}>Go to navigation </Text>
      <View style={styles.container}>
        {/* Background Image with Title */}
        <ImageBackground
          source={require('../assets/Images/laundry.jpg')} // Add your own image here
          style={styles.imageBackground}>
          <Text style={styles.titleWithImage}>Annual Sales Overview</Text>
        </ImageBackground>

        {/* Bar Chart */}
        <BarChart
          data={data}
          barWidth={30}
          barBorderRadius={4}
          frontColor="tomato"
          barMargin={12}
          yAxisThickness={0}
          pointerConfig={getBarChartTooltipConfig("Annual Sales Overview")}
        />
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  imageBackground: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleWithImage: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
