import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { COLORS } from "../../theme/colors";
import Selector from "../../components/Selector";
import api from "../../services";
import axios from "axios";
import ViewTableComponent from "./ViewTableComponent";
import { Button } from "@rneui/base";
import { fontsProxima } from "../../theme/typography";
import EmptyComponent from "../../components/EmptyComponent";

const ViewByMonthYear = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTemplateValue, setSelectedTemplateValue] = useState<
    string | null
  >(null);
  const [selectedTemplateLabel, setSelectedTemplateLabel] = useState<
    string | null
  >(null);
  const [viewByMonthYearData, setViewByMonthYearData] = useState<any[] | null>(
    null
  );
  const [tableData, setTableData] = useState<any | null>(null);
  const [tableLoading, setTableLoading] = useState(false);  

  useEffect(() => {
    getViewByMonthYearData();
  }, []);

  const getViewByMonthYearData = async () => {
    try {
      setLoading(true);
      const { data, status } = await api.client.getsortByMYData();
      if (status === 200 && data) {
        setViewByMonthYearData(data?.TemplateList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (templateValue?: string) => {
    const url = `https://apireposrtsystem-gmadfrdfb0cphham.centralindia-01.azurewebsites.net/api/Client/sortByMY?template=${templateValue}`;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkRpcmVjdG9yIiwibmFtZWlkIjoiZGY1NmE0MTMtNTZiNy00ZmQ3LThjNTktZmJiODBjY2EzODFiIiwicm9sZSI6IkNsaWVudCIsIm5iZiI6MTczOTk4MjAxMywiZXhwIjoxNzQwNTg2ODEzLCJpYXQiOjE3Mzk5ODIwMTMsImlzcyI6Imh0dHBzOi8vYXBpcmVwb3NydHN5c3RlbS1nbWFkZnJkZmIwY3BoaGFtLmNlbnRyYWxpbmRpYS0wMS5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3JlcG9ydHN5dGVtLmF6dXJld2Vic2l0ZXMubmV0LyJ9.Uwm-tBtRXJl9n4w4EtaDp3p4o7bWX_TT8tkxrWg_g5c";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      setTableLoading(true);
      const response = await axios.post(
        url,
        { template: templateValue },
        { headers }
      );

      if (response.data) {
        setTableData(formatTableData(response.data));
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setTableLoading(false);
    }
  };

  // Format API response into structured table data
  const formatTableData = (data: any) => {
    if (!data) return null;

    const mtdData = [...data.monthList]; // MTD data
    const ytdData = [...data.yearList]; // YTD data

    // Add row totals separately
    if (data.rowTotal?.length) {
      mtdData.push([data.rowTotal.slice(-1)[0] || 0]); // Append last row total to MTD
    }

    if (data.yearlyTotalCol?.length) {
      ytdData.push([...data.yearlyTotalCol]); // Append full yearly total to YTD
    }

    return {
      columns: [...data.templateBind[0]],
      rowLabels: data.templateBind.slice(1).flat(),
      mtdData,
      ytdData,
      rowTotal: data.rowTotal || [], // Full row total
      yearlyRowTotal: data.yearlyRowTotal || [], // Full yearly row total
    };
  };

  const formattedData = Array.isArray(viewByMonthYearData)
    ? viewByMonthYearData.map((item) => ({
        label: item.text,
        value: item.value,
      }))
    : [];

  const handleTemplateSelection = (selectedLabel: string) => {
    const selectedItem = formattedData.find(
      (item) => item.label === selectedLabel
    );
    if (selectedItem) {
      setSelectedTemplateLabel(selectedItem.label);
      setSelectedTemplateValue(selectedItem.value);
    }
  };

  const handleShowData = async () => {
    if (selectedTemplateValue) {
      fetchTableData(selectedTemplateValue);
    }
  };

  return (
    <Container
      header={{
        title: `View By Month/Year`,
        backgroundColor: COLORS.primaryColor,
        statusBarType: "dark-content",
      }}
    >
      <View style={{ padding: 16, paddingBottom: 5 }}>
        <Selector
          data={formattedData}
          onChangeText={handleTemplateSelection}
          value={selectedTemplateLabel || ""}
          type="label"
          placeholder="Select a Template *"
          containerStyle={{ width: "100%" }}
        />
        <Button
          title={loading ? "Loading..." : "Show Data"}
          onPress={handleShowData}
          disabled={loading}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
        />
      </View>

      {tableLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.newDark}
          style={{ flex: 1 }}
        />
      ) : tableData ? (
        <>
          <ViewTableComponent
            title="MTD Data"
            columns={tableData.columns}
            rowLabels={tableData.rowLabels}
            data={tableData.mtdData}
            rowTotal={tableData.rowTotal}
            totalCol={tableData.totalCol}
          />
          <ViewTableComponent
            title="YTD Data"
            columns={tableData.columns}
            rowLabels={tableData.rowLabels} 
            data={tableData.ytdData}
            rowTotal={tableData.yearlyRowTotal} 
            totalCol={tableData.yearlyTotalCol} 
          />
        </>
      ) : (
        <EmptyComponent />
      )}
    </Container>
  );
};

export default ViewByMonthYear;

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: fontsProxima.bold,
    fontSize: 16,
    color: COLORS.primaryColor,
  },
  buttonStyle: {
    backgroundColor: COLORS.new,
    height: 45,
    marginTop: 15,
    borderRadius: 10,
  },
});
