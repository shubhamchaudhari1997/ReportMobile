import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../../../services';
import Container from '../../../components/Container';
import { COLORS } from '../../../theme/colors';

const DetailsReportViewDr = (props) => {

    let tempId=props?.route?.params?.item?.tempId    
    const [reportsData, setReportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const headers = [
        "Party Name", "Order No", "Qty", "Date", "Value", "Ageing (Days)", 
        "Ageing 0-30", "Ageing 31-60", "Ageing 61-90", "Ageing 91-180", "Ageing >180","Is Target Reached"
    ];

    console.log(reportsData,'reportsData');
    

    useEffect(() => {
        getViewByMonthYearData();
    }, []);

    const getViewByMonthYearData = async () => {        
        try {
            setLoading(true);
            const params = { TempID: tempId };
            const { data, status } = await api.client.getViewReportDr(params);
            
            console.log(data, 'data from api getViewReportDr');
            
            if (status === 200 && data?.Reports?.length) {
                const reportsArray = data.Reports[0];
                const ageingArray = data.Ageing || [];
                const targetArray = data.Target?.[0] || [];
    
                const formattedData = reportsArray.map((row, index) => {
                    const cols = row.split(',');
    
                    return {
                        partyName: cols[0].replace(/"/g, ''),  // Remove quotes
                        orderNo: cols[2],  // Invoice No
                        qty: parseInt(cols[2], 10) || 0,  // Assuming index 2 is quantity
                        date: cols[1],  // Date
                        value: parseInt(cols[3], 10) || 0,  // Value
                        ageing: (Number(ageingArray[index])+2) || 0, // Use provided ageing data
                        ageing0_30: ageingArray[index] <= 30 ? parseInt(cols[3], 10) || 0 : 0,
                        ageing31_60: ageingArray[index] > 30 && ageingArray[index] <= 60 ? parseInt(cols[3], 10) || 0 : 0,
                        ageing61_90: ageingArray[index] > 60 && ageingArray[index] <= 90 ? parseInt(cols[3], 10) || 0 : 0,
                        ageing91_180: ageingArray[index] > 90 && ageingArray[index] <= 180 ? parseInt(cols[3], 10) || 0 : 0,
                        ageingAbove180: ageingArray[index] > 180 ? parseInt(cols[3], 10) || 0 : 0,
                        isTargetReached: targetArray[index]?.isReached ? "✅" : "❌",
                    };
                });
    
                setReportsData(formattedData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const calculateAgeing = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
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
        ageingAbove180: reportsData.reduce((sum, row) => sum + row.ageingAbove180, 0),
    };

    return (
        <Container
        header={{
          title: 'Detail Reports',
          backgroundColor: COLORS.primaryColor,
          statusBarType: 'dark-content',
        }}>
        <ScrollView horizontal style={styles.container}>
            <View>
                {/* Header Row */}
                <View style={styles.headerRow}>
                    {headers.map((header, index) => (
                        <Text key={index} style={styles.headerText}>{header}</Text>
                    ))}
                </View>

                {/* Data Rows */}
                <FlatList
                    data={[...reportsData, totalRow]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.row, item.partyName === "Total" && styles.totalRow]}>
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
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        paddingVertical: 10,
    },
    headerText: {
        width: 120,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },
    totalRow: {
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold',
    },
    cell: {
        width: 120,
        textAlign: 'center',
    },
});

export default DetailsReportViewDr;
