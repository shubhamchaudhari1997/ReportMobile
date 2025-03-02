import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../services";
import Selector from "../../components/Selector";
import { LineChart } from "react-native-gifted-charts";
import { COLORS } from "../../theme/colors";
import EmptyComponent from "../../components/EmptyComponent";

const Ageing = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [ageingData, setAgeingData] = useState<any[] | null>(null);
  const [responseData, setResponseData] = useState(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    getAgeingData();
  }, []);

  console.log(responseData, "responseData from ageing");

  const formatChartData = (data: any) => {
    return [
      { value: data["< 30"], label: "< 30" },
      { value: data["< 31 to 60"], label: "< 31 to 60" },
      { value: data["< 61 to 90"], label: "< 61 to 90" },
      { value: data["< 91 to 180"], label: "< 91 to 180" },
    ];
  };

  const getAgeingData = async () => {
    try {
      setLoading(true);
      const { data, status } = await api.client.getAgeingData();
      if (status === 200 && data) {
        setAgeingData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgeingData = async (id: number) => {
    try {
      setLoading(true);
      const { data, status } = await api.client.getAgeingTemplate({
        tempid: id,
      });
      if (status === 200) {
        setResponseData(data);
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

  const formattedData = Array.isArray(ageingData)
    ? ageingData.map((item) => ({
        label: item.text,
        value: item.value,
      }))
    : [];

  const handleSelection = (value: string) => {
    const selectedTemplateObject = formattedData.find(
      (item) => item.label === value
    );
    if (selectedTemplateObject) {
      fetchAgeingData(selectedTemplateObject.value);
    }
    setSelectedTemplate(value);
  };

  return (
    <View>
      {/* Selector Component */}
      <Selector
        data={formattedData}
        onChangeText={handleSelection}
        value={selectedTemplate || ""}
        type="label"
        placeholder="Select a Template *"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.newDark}
          style={{ flex: 1 ,marginTop:100}}
        />
      ) : (
        <>
          {selectedTemplate && chartData ? (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={styles.chartTitle}>Ageing</Text>
              <LineChart
                data={chartData}
                width={300}
                height={200}
                spacing={90}
                thickness={1}
                yAxisTextStyle={{ color: "black", fontSize: 12 }}
                xAxisLabelTextStyle={{ color: "black", fontSize: 12 }}
                showVerticalLines
                color="green"
                isAnimated
                areaChart
                startFillColor="rgba(110, 189, 163, 0)"
                endFillColor="rgba(122, 186, 142, 0.07)"
              />
            </View>
          ) : (
            <EmptyComponent />
          )}
        </>
      )}
    </View>
  );
};

export default Ageing;

const styles = StyleSheet.create({
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