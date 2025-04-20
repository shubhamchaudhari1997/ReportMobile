import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart} from 'react-native-gifted-charts';
import { getBarChartTooltipConfig } from '../theme/tooltipStyle';

const Progress = () => {
  const navigation = useNavigation<any>();
  const nav = () => {
    navigation.navigate('About');
  };
  const data = [
    {value: 50, label: 'Jan'},
    {value: 80, label: 'Feb'},
    {value: 90, label: 'Mar'},
    {value: 70, label: 'Apr'},
    {value: 60, label: 'May'},
  ];
  return (
    <View>
      <Text>Progress</Text>
      <Text onPress={nav}>go to About</Text>
      <View style={styles.container}>
        {/* Shadow and Outline on the Title */}
        <Text style={styles.shadowedTitle}>Quarterly Review</Text>

        {/* Bar Chart */}
        <BarChart
          data={data}
          barWidth={30}
          barBorderRadius={4}
          frontColor="purple"
          barMargin={12}
          yAxisThickness={0}
          pointerConfig={getBarChartTooltipConfig("Quarterly Review")}
        />
      </View>
    </View>
  );
};

export default Progress;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  shadowedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    textShadowColor: '#aaa',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    marginBottom: 16,
  },
});
