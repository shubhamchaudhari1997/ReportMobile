import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BarChart} from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';

const Settings = () => {
  const data = [
    {value: 50, label: 'Jan'},
    {value: 80, label: 'Feb'},
    {value: 90, label: 'Mar'},
    {value: 70, label: 'Apr'},
    {value: 60, label: 'May'},
  ];
  return (
    <View>
      <Text>Settings</Text>
      <View style={styles.container}>
        {/* Adding a decorative title with an icon */}
        <View style={styles.titleContainer}>
          <Ionicons name="stats-chart" size={28} color="#4CAF50" />
          <Text style={styles.chartTitle}>Monthly Sales Data</Text>
        </View>

        {/* BarChart Component */}
        <BarChart
          data={data}
          barWidth={30}
          barBorderRadius={4}
          frontColor="rgba(66, 165, 245, 1)"
          gradientColor="rgba(102, 187, 106, 0.8)" // Adding gradient color
          backgroundColor="#f4f4f4"
          barMargin={12}
          yAxisThickness={0} // Hide Y-Axis for a minimal look
        />
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}>
          <Text style={styles.chartTitle}>Monthly Sales Data</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0', // Adding a light background color for contrast
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8, // Spacing between icon and text
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Add subtle text shadow
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});
