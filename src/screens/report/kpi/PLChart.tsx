import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { COLORS } from '../../../theme/colors';
import { barChartToolTip } from '../../../theme/tooltipStyle';

const PLChart = ({ dataString }: { dataString: string }) => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<string[][]>([]);

  // Titles for each metric
  const metricTitles = [
    'Revenue Growth Rate (%)',
    'Overhead Rate (%)',
    'Gross Profit (%)',
    'Net Profit (PBT) (%)',
  ];

  useEffect(() => {
    if (dataString) {
      setLoading(true);
      try {
        const parsedData = JSON.parse(dataString.replace(/PL/g, ''));
        setLabels(parsedData.slice(1, 5)); // Extract month labels
        setDatasets(parsedData.slice(6)); // Extract values
      } catch (error) {
        console.error('Error parsing PL data:', error);
      }
      setLoading(false);
    }
  }, [dataString]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.newDark} style={{ flex: 1 }} />
      ) : (
        <>
          {/* Bar Charts */}
          {datasets.map((dataset, index) => (
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
                  pointerConfig={barChartToolTip}
              />
            </View>
          ))}
                    {/* Table for displaying data */}
                    <View style={styles.tableContainer}>
            {/* Header Row */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>Metric</Text>
              {labels.map((label, index) => (
                <Text key={index} style={[styles.cell, styles.headerCell]}>
                  {label}
                </Text>
              ))}
            </View>

            {/* Data Rows */}
            {datasets.map((dataset, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{metricTitles[index] || `Metric ${index + 1}`}</Text>
                {dataset.map((value, i) => (
                  <Text key={i} style={styles.cell}>{value}</Text>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  
  // Table Styles
  tableContainer: { marginBottom: 50, borderWidth: 1, borderColor: COLORS.newDark, borderRadius: 8, overflow: 'hidden' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.newDark },
  headerRow: { backgroundColor: COLORS.newDark },
  cell: { flex: 1, textAlign: 'center', padding: 8, fontSize: 14, color: COLORS.newDark },
  headerCell: { fontWeight: 'bold', color: 'white' },

  // Chart Styles
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

export default PLChart;
