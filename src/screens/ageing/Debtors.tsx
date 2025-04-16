import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services";
import Selector from "../../components/Selector";
import { PieChart } from "react-native-gifted-charts";
import { COLORS } from "../../theme/colors";
import EmptyComponent from "../../components/EmptyComponent";

const Debtors = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [debetorsData, setDebetorsData] = useState<any[] | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    getDrAgeingData();
  }, []);

  const formatChartData = (data: any) => {
    const chart = [
      { value: data["< 30"] || 0, text: "< 30", color: "#a5dfdf" },
      { value: data["< 31 to 60"] || 0, text: "< 31 to 60", color: "#ccb2ff" },
      { value: data["< 61 to 90"] || 0, text: "< 61 to 90", color: "#ffcf9f" },
      { value: data["< 91 to 180"] || 0, text: "< 91 to 180", color: "#9ad0f5" },
      { value: data[" 180 above"] || 0, text: "180 above", color: "#ffb1c1" },
    ];
    return chart;
  };

  const fetchDebtorsData = async (id: number) => {
    try {
      setLoading(true);
      const { data, status } = await api.client.getDrAgeingTemplate({ tempid: id });
      if (status === 200) {
        setRawData(data);
        setChartData(formatChartData(data));
      } else {
        Alert.alert("Error", "Failed to fetch data");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getDrAgeingData = async () => {
    try {
      setLoading(true);
      const { data, status } = await api.client.getDrAgeingData();
      if (status === 200 && data) {
        setDebetorsData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formattedData = Array.isArray(debetorsData)
    ? debetorsData.map((item) => ({
        label: item.text,
        value: item.value,
      }))
    : [];

  const handleSelection = (value: string) => {
    const selectedTemplateObject = formattedData.find(
      (item) => item.label === value
    );
    if (selectedTemplateObject) {
      setSelectedTemplateId(selectedTemplateObject.value);
      fetchDebtorsData(selectedTemplateObject.value);
    }
    setSelectedTemplate(value);
  };

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {chartData?.map((item: any, index: number) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>
            {item.text}: {item.value.toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={{ }}>
      <Selector
        data={formattedData}
        onChangeText={handleSelection}
        value={selectedTemplate || ""}
        type="label"
        placeholder="Select a Template *"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.newDark}
          style={{ flex: 1, marginTop: 100 }}
        />
      ) : (
        <>
          {selectedTemplate && chartData ? (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.chartTitle}>Dr Ageing</Text>
              <PieChart
                data={chartData}
                radius={130}
                showText
                textColor="black"
                textSize={12}
                strokeColor="#007AFF"
                strokeWidth={1}
                showTooltip={true}
                tooltipBackgroundColor={'white'}
                tooltipDuration={2000}
              />
              {renderLegend()}
            </View>
          ) : (
            <EmptyComponent />
          )}
        </>
      )}
    </View>
  );
};

export default Debtors;

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondaryColor,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#D0BCFF",
    paddingBottom: 4,
    alignSelf: "flex-start",
  },
  legendContainer: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});
