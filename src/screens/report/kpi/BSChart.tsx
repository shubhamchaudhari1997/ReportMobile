import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { COLORS } from '../../../theme/colors';
import { getBarChartTooltipConfig } from '../../../theme/tooltipStyle';

const BSChart = ({ dataString }: { dataString: string }) => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<string[][]>([]);

  const metricTitles = [
    'Current Ratio',
    'Dept Equity Ratio',
    'Days Sales Outstanding',
    'Days Inventory Outstanding',
    'Days Payable Outstanding',
    'Cash Conversion Cycle',
  ];

  useEffect(() => {
    if (dataString) {
      setLoading(true);
      try {
        const parsedData = JSON.parse(dataString.replace(/BS/g, ''));
        setLabels(parsedData.slice(1, 5)); // Extract month labels
        setDatasets(parsedData.slice(6)); // Extract values
      } catch (error) {
        console.error('Error parsing BS data:', error);
      }
      setLoading(false);
    }
  }, [dataString]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.newDark} style={{ flex: 1 }} />
      ) : (
        datasets.map((dataset, index) => (
          <View key={index} style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{metricTitles[index] || `Metric ${index + 1}`}</Text>
            <BarChart
              data={dataset.map((value: string, i: number) => ({
                value: parseInt(value),
                label: labels[i],
                frontColor: ['#7EA8BE', '#A1CF6B', '#A48BE0', '#FFB347'][i % 4],
              }))}
              height={200}
              width={350}
              spacing={40}
              barWidth={30}
              barBorderRadius={4}
              showValuesAsTopLabel
              pointerConfig={getBarChartTooltipConfig(metricTitles[index])}
              />
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chartContainer: { marginBottom: 50 },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.secondaryColor,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#A48BE0',
    paddingBottom: 2,
    alignSelf: 'flex-start',
  },
});

export default BSChart;
