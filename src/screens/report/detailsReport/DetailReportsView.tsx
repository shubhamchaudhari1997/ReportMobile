import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../../services";
import Container from "../../../components/Container";
import { COLORS } from "../../../theme/colors";

const DetailReportsView = (props) => {
  let tempId = props?.route?.params?.item?.tempId;
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = [
    "Party Name",
    "Order No",
    "Qty",
    "Date",
    "Value",
    "Ageing (Days)",
    "Ageing 0-30",
    "Ageing 31-60",
    "Ageing 61-90",
    "Ageing 91-180",
    "Ageing >180",
    "Is Target Reached",
  ];

  useEffect(() => {
    getViewByMonthYearData();
  }, []);

  const getViewByMonthYearData = async () => {
    try {
      setLoading(true);
      const params = { TempID: tempId };
      const { data, status } = await api.client.getViewReportAgeing(params);
      if (status === 200 && data?.Reports?.length) {
        const formattedData = data.Reports[0].map((row) => {
          const cols = row.split(",");
          const ageingDays = calculateAgeing(cols[3]);

          return {
            partyName: cols[0].replace(/"/g, ""),
            orderNo: cols[1],
            qty: parseInt(cols[2], 10) || 0,
            date: cols[3],
            value: parseInt(cols[4], 10) || 0,
            ageing: ageingDays,
            ageing0_30: ageingDays <= 30 ? parseInt(cols[4], 10) || 0 : 0,
            ageing31_60:
              ageingDays > 30 && ageingDays <= 60
                ? parseInt(cols[4], 10) || 0
                : 0,
            ageing61_90:
              ageingDays > 60 && ageingDays <= 90
                ? parseInt(cols[4], 10) || 0
                : 0,
            ageing91_180:
              ageingDays > 90 && ageingDays <= 180
                ? parseInt(cols[4], 10) || 0
                : 0,
            ageingAbove180: ageingDays > 180 ? parseInt(cols[4], 10) || 0 : 0,
            isTargetReached: cols[5] === "Yes" ? "✅" : "❌",
          };
        });

        setReportsData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAgeing = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const orderDate = new Date(year, month - 1, day);
    const today = new Date();
    return Math.floor((today - orderDate) / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalRow = {
    partyName: "Total",
    orderNo: "",
    qty: reportsData.reduce((sum, row) => sum + row.qty, 0),
    date: "",
    value: reportsData.reduce((sum, row) => sum + row.value, 0),
    ageing: reportsData.reduce((sum, row) => sum + row.ageing, 0),
    ageing0_30: reportsData.reduce((sum, row) => sum + row.ageing0_30, 0),
    ageing31_60: reportsData.reduce((sum, row) => sum + row.ageing31_60, 0),
    ageing61_90: reportsData.reduce((sum, row) => sum + row.ageing61_90, 0),
    ageing91_180: reportsData.reduce((sum, row) => sum + row.ageing91_180, 0),
    ageingAbove180: reportsData.reduce(
      (sum, row) => sum + row.ageingAbove180,
      0
    ),
  };

  return (
    <Container
      header={{
        title: "Detail Reports",
        backgroundColor: COLORS.primaryColor,
        statusBarType: "dark-content",
      }}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.newDark} />
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView horizontal style={styles.container}>
          <View>
            {/* Header Row */}
            <View style={styles.headerRow}>
              {headers.map((header, index) => (
                <Text key={index} style={styles.headerText}>
                  {header}
                </Text>
              ))}
            </View>

            {/* Data Rows */}
            <FlatList
              data={[...reportsData, totalRow]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.row,
                    item.partyName === "Total" && styles.totalRow,
                  ]}
                >
                  <Text style={styles.cell}>{item.partyName}</Text>
                  <Text style={styles.cell}>{item.orderNo}</Text>
                  <Text style={styles.cell}>{item.qty}</Text>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.value}</Text>
                  <Text style={styles.cell}>{item.ageing}</Text>
                  <Text style={styles.cell}>{item.ageing0_30}</Text>
                  <Text style={styles.cell}>{item.ageing31_60}</Text>
                  <Text style={styles.cell}>{item.ageing61_90}</Text>
                  <Text style={styles.cell}>{item.ageing91_180}</Text>
                  <Text style={styles.cell}>{item.ageingAbove180}</Text>
                  <Text style={styles.cell}>{item.isTargetReached}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 10,
  },
  headerText: {
    width: 120,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  totalRow: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  cell: {
    width: 120,
    textAlign: "center",
  },
});

export default DetailReportsView;
