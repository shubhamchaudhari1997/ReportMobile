import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services";
import { BarChart } from "react-native-gifted-charts";
import { COLORS } from "../../theme/colors";
import EmptyComponent from "../../components/EmptyComponent";
import { getBarChartTooltipConfig } from "../../theme/tooltipStyle";

const Employee = () => {
  const [chartData, setChartData] = useState({
    monthLabels: [],
    firstData: [],
    secondData: [],
  });

  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    try {
      setLoading(true); // Start loading
      const { data, status } = await api.client.getEmployeeData();
      if (status === 200 && data) {
        const apiData = data?.data;

        setChartData({
          monthLabels: apiData.monthLabels || [],
          firstData: apiData.firstData?.map(Number) || [],
          secondData: apiData.secondData?.map(Number) || [],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to format data for charts
  const formatBarChartData = (values) =>
    values.map((value, index) => ({
      value,
      label: chartData.monthLabels[index] || "",
      frontColor: ["#7EA8BE", "#A1CF6B", "#A48BE0", "#FFB347"][index % 4],
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
          {/* Bar Chart for First Data */}
          {chartData.firstData.length > 0 ? (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Retention</Text>
              <BarChart
                data={formatBarChartData(chartData.firstData)}
                height={200}
                width={350}
                spacing={40}
                barWidth={30}
                barBorderRadius={4}
                showValuesAsTopLabel
                pointerConfig={getBarChartTooltipConfig("Retention")}
              />
            </View>
          ) : (
            <EmptyComponent />
          )}

          {/* Bar Chart for Second Data */}
          {chartData.secondData.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Attrition</Text>
              <BarChart
                data={formatBarChartData(chartData.secondData)}
                height={200}
                width={350}
                spacing={40}
                barWidth={30}
                barBorderRadius={4}
                showValuesAsTopLabel
                pointerConfig={getBarChartTooltipConfig("Attrition")}
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

export default Employee;
