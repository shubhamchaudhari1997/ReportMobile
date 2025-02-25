import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../../services';
import { LineChart } from 'react-native-gifted-charts';
import { COLORS } from '../../theme/colors';
import EmptyComponent from '../../components/EmptyComponent';

const Customer = () => {
  const [chartData, setChartData] = useState({
    monthLabels: [],
    firstData: [],
    secondData: [],
  });

  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      setLoading(true); // Start loading
      const { data, status } = await api.client.getCustomerData();
      if (status === 200 && data) {
        const apiData = data?.data;

        setChartData({
          monthLabels: apiData.monthLabels || [],
          firstData: apiData.firstData?.map(Number) || [],
          secondData: apiData.secondData?.map(Number) || [],
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to format data for charts
  const formatChartData = values =>
    values.map((value, index) => ({
      value,
      label: chartData.monthLabels[index] || '',
    }));

  return (
    <ScrollView style={styles.container}>
      {/* Show loader while fetching data */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.newDark} />
          <Text style={styles.loadingText}>Loading charts...</Text>
        </View>
      ) : (
        <>
          {/* Line Chart for First Data */}
          {chartData.firstData.length > 0 ? (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Curning%</Text>
              <LineChart
                data={formatChartData(chartData.firstData)}
                height={200}
                width={400}
                spacing={90}
                thickness={2}
                hideYAxisText={false}
                showVerticalLines
                color="blue"
                isAnimated
                areaChart
                startFillColor="rgba(158, 158, 191, 0)"
                endFillColor="rgba(139, 139, 216, 0.07)"
              />
            </View>
          ):(<EmptyComponent/>)}

          {/* Line Chart for Second Data */}
          {chartData.secondData.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Aquisition cost</Text>
              <LineChart
                data={formatChartData(chartData.secondData)}
                height={200}
                width={400}
                spacing={90}
                thickness={2}
                hideYAxisText={false}
                showVerticalLines
                color="red"
                isAnimated
                areaChart
                startFillColor="rgba(255, 227, 172, 0.3)"
                endFillColor="rgba(222, 178, 178, 0.1)"
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400, // Ensures loader is centered properly
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.newDark,
    marginTop: 10,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 40,
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
});

export default Customer;
