import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { COLORS } from "../../theme/colors";
import Icon from "../../components/Icons";
import api from "../../services";
import SpeedometerComponent from "./SpeedometerComponent";
import Speedometer from "../../../Spedometer1";
import Speedometer1 from "../../../Spedometer1";
import Speedometer0 from "../../../Spedometer0";
import Speedometer2 from "../../../Spedometer2";
import Speedometer3 from "../../../Spedometer3";

// Labels remain static; they are stored in an array and mapped dynamically
const labels = [
  "Opening Balance",
  "Sales/Revenue",
  "Direct Expenses",
  "Indirect Expenses",
  "Statutory Payments",
  "Income tax",
  "Operational",
  "Fixed Asset",
  "Loans",
  "Investment",
  "Non Operational",
  "Net Flow",
  "Closing Balance",
];
const getStylesForLabel = (label: string) => {
  const colorMap: Record<
    string,
    { labelColor: string; valueColor: string; bgColor: string }
  > = {
    "Opening Balance": {
      labelColor: COLORS.greenIcon,
      valueColor: COLORS.greenIcon,
      bgColor: COLORS.greenBackgroundIcon,
    },
    "Sales/Revenue": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    "Direct Expenses": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    "Indirect Expenses": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    "Statutory Payments": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    "Income tax": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    Operational: {
      labelColor: COLORS.yellowIcon,
      valueColor: COLORS.yellowIcon,
      bgColor: COLORS.yellowBackgroundIcon,
    },
    "Fixed Asset": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    Loans: {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    Investment: {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    "Non Operational": {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.secondaryColor,
      bgColor: COLORS.primaryColor,
    },
    "Net Flow": {
      labelColor: COLORS.yellowIcon,
      valueColor: COLORS.yellowIcon,
      bgColor: COLORS.yellowBackgroundIcon,
    },
    "Closing Balance": {
      labelColor: COLORS.redIcon,
      valueColor: COLORS.redIcon,
      bgColor: COLORS.redBackgroundIcon,
    },
  };

  return (
    colorMap[label] || {
      labelColor: COLORS.secondaryColor,
      valueColor: COLORS.new,
      bgColor: COLORS.primaryColor,
    }
  );
};

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // State to hold API data
  const [data, setData] = useState<any>({
    firstData: [],
    secondData: [],
    thirdData: [],
    monthName: "Loading...",
  });
  const [speedometerLabel1, setSpeedometerLabel1] = useState<string>("");
  const [speedometerLabel2, setSpeedometerLabel2] = useState<string>("");
  const [speedometerLabel3, setSpeedometerLabel3] = useState<string>("");
  const [speedometerLabel4, setSpeedometerLabel4] = useState<string>("");

  const [speedometerValue1, setSpeedometerValue1] = useState<number>(0);
  const [speedometerValue2, setSpeedometerValue2] = useState<number>(0);
  const [speedometerValue3, setSpeedometerValue3] = useState<number>(0);
  const [speedometerValue4, setSpeedometerValue4] = useState<number>(0);

  const onModalToggle = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  const parseData = (dataArray: any): number[] => {
    if (!dataArray || dataArray.length === 0) return [];

    return dataArray.flatMap(
      (item) =>
        item
          .replace(/\[|\]/g, "") // Remove brackets
          .split(",") // Split numbers if they exist
          .map((num) => Number(num.trim())) // Convert to numbers safely
    );
  };
  const openingBalance = data.firstData[0] || 0;

  // Compute Operational (sum of Sales/Revenue to Income Tax)
  const operational = data.secondData
    .slice(0, 5)
    .reduce((sum, val) => sum + (val || 0), 0);

  // Compute Net Flow (sum of Fixed Asset, Loans, Investment, Non Operational)
  const netFlow = data.thirdData
    .slice(0, 4)
    .reduce((sum, val) => sum + (val || 0), 0);

  // Compute Closing Balance
  const closingBalance = openingBalance + netFlow;

  // Construct values array
  const values: number[] = [
    openingBalance,
    ...data.secondData.slice(0, 5).map((v) => v || 0),
    operational,
    ...data.thirdData.slice(0, 4).map((v) => v || 0),
    netFlow,
    closingBalance,
  ];

  // Fetch API Data
  const getHomeData = async () => {
    try {
      const { data, status } = await api.client.getHomeData();
      if (status === 200 && data) {
        const apiData = data;
        setData({
          firstData: apiData.firstData ? parseData(apiData.firstData) : [],
          secondData: apiData.secondData ? parseData(apiData.secondData) : [],
          thirdData: apiData.thirdData ? parseData(apiData.thirdData) : [],
          monthName: apiData.monthName || "Unknown",
        });
        const { firstData, secondData, thirdData, forthData, monthLabels } =
          data.data;

        if (!monthLabels || monthLabels.length < 4) {
          console.warn("Invalid monthLabels data");
          return;
        }

        // Store labels
        setSpeedometerLabel1(monthLabels[0]);
        setSpeedometerLabel2(monthLabels[1]);
        setSpeedometerLabel3(monthLabels[2]);
        setSpeedometerLabel4(monthLabels[3]);

        // Store values
        setSpeedometerValue1(parseInt(firstData?.[0], 10) || 0);
        setSpeedometerValue2(parseInt(secondData?.[0], 10) || 0);
        setSpeedometerValue3(parseInt(thirdData?.[0], 10) || 0);
        setSpeedometerValue4(parseInt(forthData?.[0], 10) || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSpedometer3Values = (num: number) => {
    if (num <= 1) {
      return 30;
    }
    if (num <= 2 && num >= 1) {
      return 70;
    }
    if (num <= 3) {
      return 100;
    }
    return 0;
  };

  return (
    <Container
      header={{
        title: `Home`,
        backgroundColor: COLORS.primaryColor,
        statusBarType: "dark-content",
        toggleDrawer: true,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Financial Report - {data.monthName}
          </Text>
        </View>

        <FlatList
          data={labels.map((label, index) => ({
            label,
            value: values[index] || "-", // Display "-" if value is missing
          }))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { labelColor, valueColor, bgColor } = getStylesForLabel(
              item.label
            );

            return (
              <View style={[styles.card, { backgroundColor: bgColor }]}>
                <Text style={[styles.label, { color: labelColor }]}>
                  {item.label}
                </Text>
                <Text style={[styles.value, { color: valueColor }]}>
                  {item.value}
                </Text>
              </View>
            );
          }}
          ListFooterComponent={
            <View style={styles.speedometerContainer}>
              {/* <SpeedometerComponent
                label={speedometerLabel1}
                value={speedometerValue1}
              /> */}
              <Speedometer0
                lable={speedometerLabel1}
                value={speedometerValue1}
              />
              {/* ----------------------------------------- */}
              {/* <SpeedometerComponent
                label={speedometerLabel2}
                value={speedometerValue2}
              /> */}
              <Speedometer1
                lable={speedometerLabel2}
                value={speedometerValue2}
              />
              {/* ----------------------------------------- */}
              {/* <SpeedometerComponent
                label={speedometerLabel3}
                value={speedometerValue3}
              /> */}
              <Speedometer2
                lable={speedometerLabel3}
                value={speedometerValue3}
              />

              {/* ----------------------------------------- */}
              {/* <SpeedometerComponent
                label={speedometerLabel4}
                value={getSpedometer3Values(3)} 
              /> */}
              <Speedometer3
                lable={speedometerLabel4}
                value={getSpedometer3Values(3)}
              />

              {/* ----------------------------------------- */}
            </View>
          }
        />
      </View>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_chipe,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: COLORS.blueBackgroundIcon,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.newDark,
  },
  card: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 2,
    padding: 16,
    paddingVertical: 8,
    marginBottom: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondaryColor,
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.new,
    opacity: 0.8,
  },
  speedometerContainer: {
    paddingBottom: 50, // Adds spacing to prevent overlap
    alignItems: "center", // Centers the speedometers
  },
});
