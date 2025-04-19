import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services";
import { LineChart, BarChart } from "react-native-gifted-charts";
import { COLORS } from "../../theme/colors";
import EmptyComponent from "../../components/EmptyComponent";
import {  getBarChartTooltipConfig } from "../../theme/tooltipStyle";

const PLScreen = () => {
  const [chartData, setChartData] = useState({
    monthLabels: [],
    firstData: [],
    secondData: [],
    thirdData: [],
    fourthData: [],
  });

  const [loading, setLoading] = useState(true); // Loading state


  useEffect(() => {
    getPLData();
  }, []);

  const getPLData = async () => {
    try {
      setLoading(true); // Start loading
      const { data, status } = await api.client.getPLData();
      if (status === 200 && data) {
        const apiData = data?.data;


        setChartData({
          monthLabels: apiData.monthLabels || [],
          firstData: apiData.firstData?.map(Number) || [],
          secondData: apiData.secondData?.map(Number) || [],
          thirdData: apiData.thirdData?.map(Number) || [],
          fourthData: apiData.forthData?.map(Number) || [],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const formatBarChartData = (values) =>
    values.map((value, index) => ({
      value,
      label: chartData.monthLabels[index] || "",
      frontColor: ["#7EA8BE", "#A1CF6B", "#A48BE0", "#FFB347"][index % 4],
    }));

  // Function to format data for charts
  const formatChartData = (values) =>
    values.map((value, index) => ({
      value,
      label: chartData.monthLabels[index] || "",
    }));

  return (
    <ScrollView style={styles.container}>
      {/* Show loader while fetching data */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.newDark}
            style={{ flex: 1 }}
          />
          <Text style={styles.loadingText}>Loading charts...</Text>
        </View>
      ) : (
        <>
          {/* Line Chart for First Data */}
          {chartData.firstData.length > 0 ? (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Revenue Growth Rate</Text>
              <LineChart
                data={formatChartData(chartData.firstData)}
                height={200}
                width={400}
                spacing={90}
                thickness={2}
                hideYAxisText={false}
                showVerticalLines
                color="green"
                isAnimated
                areaChart
                startFillColor="rgba(110, 189, 163, 0)"
                endFillColor="rgba(122, 186, 142, 0.07)"
                 pointerConfig={getBarChartTooltipConfig("Revenue Growth Rate")}
                 
              />
            </View>
          ) : (
            <EmptyComponent />
          )}

          {/* Line Chart for Second Data */}
          {chartData.thirdData.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Gross Profit</Text>
              <LineChart
                data={formatChartData(chartData.thirdData)}
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
              pointerConfig={getBarChartTooltipConfig("Gross Profit")}
               
              />
            </View>
          )}

          {/* Bar Chart for Third Data */}
          {chartData.secondData.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Overhead rate</Text>
              <BarChart
                data={formatBarChartData(chartData.secondData)}
                height={200}
                width={350}
                spacing={40}
                barWidth={30}
                barBorderRadius={4}
                showValuesAsTopLabel
                  pointerConfig={getBarChartTooltipConfig("Overhead rate")}
              />
            </View>
          )}

          {/* Bar Chart for Fourth Data */}
          {chartData.fourthData.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Net Profit</Text>
              <BarChart
                data={formatBarChartData(chartData.fourthData)}
                height={200}
                width={350}
                spacing={40}
                barWidth={30}
                barBorderRadius={4}
                showValuesAsTopLabel
                pointerConfig={getBarChartTooltipConfig("Net Profit")}
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
    justifyContent: "center",
    alignItems: "center",
    height: 400, // Ensures loader is centered properly
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.newDark,
    marginTop: 10,
    fontWeight: "bold",
  },
  chartContainer: {
    marginBottom: 40,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.secondaryColor,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#A48BE0",
    paddingBottom: 2,
    alignSelf: "flex-start",
  },
});

export default PLScreen;
