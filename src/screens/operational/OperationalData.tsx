import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BarChart} from 'react-native-gifted-charts';
import api from '../../services';
import {COLORS} from '../../theme/colors';

const OperationalData = ({
  selectedFileId,
  selectedMonthId,
}: OperationalDataProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartLabels, setChartLabels] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFileId && selectedMonthId) {
      fetchOperationalData();
    }
  }, [selectedFileId, selectedMonthId]);

  const fetchOperationalData = async () => {
    setLoading(true);
    try {
      const {data, status} = await api.client.getWeeklyData({
        tempId: selectedFileId,
        month: selectedMonthId,
      });

      if (status === 200 && data?.data) {
        setChartData(data.data);
        setChartLabels(data.lables);
      } else {
        Alert.alert('Error', 'No data available');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Something went wrong while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const renderBarChart = (
    values: any[],
    label: string,
    color: string,
    labels: string[],
  ) => {
    // Check if the values array is either empty or contains only zeros
    if (
      !values ||
      values.length === 0 ||
      !labels ||
      labels.length === 0 ||
      values.every(val => val === 0)
    ) {
      return null; // Don't render the chart if the data is empty or contains only zeros
    }

    const formattedData = values.map((value, index) => ({
      value,
      label: labels[index], // Use provided labels
      frontColor: ['#7EA8BE', '#A1CF6B', '#A48BE0', '#FFB347'][index % 4],
    }));

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{label}</Text>
        <BarChart
          data={formattedData}
          height={200}
          width={300}
          spacing={30}
          barWidth={35}
          barBorderRadius={4}
          showValuesAsTopLabel
          isAnimated
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.newDark} />
      ) : chartData ? (
        <>
          {/* Weekly Data */}
          {chartData.weeklyData && chartData.weeklyData.allCol && (
            <>
              <Text style={styles.Title}>Weekly Data</Text>
              {['leads', 'closed', 'potential', 'leadsFree'].map(
                (key, index) => {
                  const data = chartData.weeklyData[key];
                  if (data && data.length > 0) {
                    // Generate dynamic week labels based on the length of the data array
                    const weekLabels = Array.from(
                      {length: data.length},
                      (_, i) => `Week ${i + 1}`,
                    );

                    // Dynamically render the chart for each key
                    const chartTitles = [
                      chartLabels[0],
                      chartLabels[1],
                      chartLabels[2],
                      chartLabels[3],
                    ];
                    const chartColors = [
                      COLORS.blueIcon,
                      COLORS.greenIcon,
                      COLORS.yellowIcon,
                      COLORS.newDark,
                    ];

                    return renderBarChart(
                      data, // Data
                      chartTitles[index], // Title
                      chartColors[index], // Color
                      weekLabels, // Dynamic labels
                    );
                  } else {
                    return null; // If no data exists for this key, render nothing
                  }
                },
              )}
            </>
          )}

          {/* Monthly Data */}
          {chartData.monthlyData && (
            <>
              <Text style={styles.Title}>Monthly data</Text>
              {renderBarChart(
                chartData.monthlyData.leads,
                chartLabels[0],
                COLORS.greenIcon,
                chartData.monthlyData.monthLabels,
              )}
              {renderBarChart(
                chartData.monthlyData.closed,
                chartLabels[1],
                COLORS.blueIcon,
                chartData.monthlyData.monthLabels,
              )}

              {renderBarChart(
                chartData.monthlyData.potential,
                chartLabels[2],
                COLORS.yellowIcon,
                chartData.monthlyData.monthLabels,
              )}
              {renderBarChart(
                chartData.monthlyData.leadsFree,
                chartLabels[3],
                COLORS.newDark,
                chartData.monthlyData.monthLabels,
              )}
            </>
          )}
        </>
      ) : (
        <Text style={styles.noDataText}>No Data Available</Text>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
  },
  chartContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  noDataText: {
    fontSize: 16,
    color: COLORS.danger,
  },
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
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondaryColor,
    textTransform: 'uppercase',
    backgroundColor: COLORS.blueBackgroundIcon,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default OperationalData;
