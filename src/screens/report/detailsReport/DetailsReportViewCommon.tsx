import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../../services";
import Container from "../../../components/Container";
import { COLORS } from "../../../theme/colors";

const DetailsReportViewCommon = (props) => {
  let propsData = props?.route?.params?.item;
  const [reportsData, setReportsData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(false);

  let hideCol = propsData?.addCol;
  let hideRow = propsData?.addRow;

  useEffect(() => {
    getViewByMonthYearData();
  }, []);

  const getViewByMonthYearData = async () => {
    try {
      setLoading(true);
      const params = { id1: propsData?.tempId, id2: propsData?.report_Id };
      const { data, status } = await api.client.getViewReportDetails(params);

      if (status === 200 && data) {
        setHeaders(data.TemplateData[0] || []);
        setReportsData(
          data.Reports[0]?.map((row, index) => {
            const cols = row.split(",").map(Number);
            return {
              location: data.TemplateData[index + 1]?.[0] || "",
              values: cols,
            };
          }) || []
        );
        setTotals(data.TotalCol || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
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
            <View style={{ flexDirection: "row" }}>
              <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Location</Text>
                {headers.slice(1).map((header, index) => (
                  <Text key={index} style={styles.headerCell}>
                    {header}
                  </Text>
                ))}
              </View>
              <View
                style={[
                  styles.headerRow,
                  {  backgroundColor: '#baddf5' ,marginBottom:0.4},
                ]}
              >
                {!hideCol && <Text style={styles.headerCell}>Total</Text>}
              </View>
            </View>
            {/* Data Rows */}
            {reportsData.map((row, rowIndex) => (
              <View style={{ flexDirection: "row" }}>
                <View key={rowIndex} style={styles.dataRow}>
                  <Text style={styles.dataCell}>{row.location}</Text>
                  {row.values.map((value, colIndex) => (
                    <Text key={colIndex} style={styles.dataCell}>
                      {value}
                    </Text>
                  ))}
                </View>
                <View
                  key={rowIndex}
                  style={[
                    styles.dataRow,
                    { backgroundColor: '#baddf5',margin:0.4 },
                  ]}
                >
                  {!hideCol && (
                    <Text style={styles.dataCell}>
                      {row.values.reduce((sum, val) => sum + val, 0)}
                    </Text>
                  )}
                </View>
              </View>
            ))}

            {/* Total Row */}
            {!hideRow && (
              <View style={[styles.dataRow, styles.totalRow]}>
                <Text style={styles.dataCell}>Total:</Text>
                {totals.map((total, index) => (
                  <Text key={index} style={styles.dataCell}>
                    {total}
                  </Text>
                ))}
                {!hideCol && (
                  <Text style={styles.dataCell}>
                    {totals.reduce((sum, val) => sum + val, 0)}
                  </Text>
                )}
              </View>
            )}
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
    backgroundColor:COLORS.blue_chipe,
    paddingVertical: 10,
  },
  headerCell: {
    width: 120,
    fontWeight: "bold",
    textAlign: "center",
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  totalRow: {
    backgroundColor: '#baddf5',
    fontWeight: "bold",
  },
  dataCell: {
    width: 120,
    textAlign: "center",
  },
});

export default DetailsReportViewCommon;
