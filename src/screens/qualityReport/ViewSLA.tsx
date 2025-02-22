import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView } from 'react-native';
import Container from '../../components/Container';
import { COLORS } from '../../theme/colors';
import api from '../../services';

const ViewSLA = () => {
    const [loading, setLoading] = useState(true);
    const [slaData, setSLAData] = useState<any>(null);

    useEffect(() => {
        fetchSLAData();
    }, []);

    const fetchSLAData = async () => {
        try {
            setLoading(true);
            const { data, status } = await api.client.getSLADetails();
            if (status === 200 && data.length > 0) {
                setSLAData(data[0]); // Assuming we get an array and need the first object
            }
        } catch (error) {
            console.error('Error fetching SLA data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderTable = (title: string, headers: string[], data: any[]) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.tableHeader}>
                {headers.map((header, index) => (
                    <Text key={index} style={[styles.headerCell, { flex: index === 0 ? 2 : 1 }]}>
                        {header}
                    </Text>
                ))}
            </View>
            {data.map((item, index) => (
                <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                    <Text style={[styles.cell, { flex: 2 }]}>{item[0]}</Text>
                    <Text style={[styles.cell, { flex: 1.3 }]}>{item[1]}</Text>
                    <Text style={[styles.cell, { flex: 1 }]}>{item[2]}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <Container
            header={{
                title: 'View SLA',
                backgroundColor: COLORS.primaryColor,
                statusBarType: 'dark-content',
            }}
            goBack={true}
        >
            <ScrollView style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.newDark} />
                ) : slaData ? (
                    <>
                        {/* Weekly Reports */}
                        {renderTable('Weekly Reports', ['Report', 'Status', 'Remarks'], slaData.weeklyReports.reduce((acc: any, _: any, i: number, arr: string | any[]) =>
                            i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, []
                        ))}

                        {/* Monthly Reports */}
                        {renderTable('Monthly Reports', ['Report', 'Status', 'Remarks'], slaData.monthlyReports.reduce((acc: any, _: any, i: number, arr: string | any[]) =>
                            i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, []
                        ))}

                        {/* Other Reports */}
                        {renderTable('Other', ['Report', 'Status', 'Remarks'], slaData.other.reduce((acc: any, _: any, i: number, arr: string | any[]) =>
                            i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc, []
                        ))}

                        {/* Other Activities Done */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Other Activities Done</Text>
                            {slaData.otherActivitiesDone.map((activity: string, index: number) => (
                                <Text key={index} style={styles.listItem}>{`\u2022 ${activity}`}</Text>
                            ))}
                        </View>

                        {/* Pending Work */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pending Work</Text>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.headerCell, { flex: 2 }]}>Task</Text>
                                <Text style={[styles.headerCell, { flex: 1.2 }]}>Completion Date</Text>
                                <Text style={[styles.headerCell, { flex: 1 }]}>Remarks</Text>
                            </View>
                            <View style={[styles.row, styles.oddRow]}>
                                <Text style={[styles.cell, { flex: 2 }]}>{slaData.pendingWork[0]}</Text>
                                <Text style={[styles.cell, { flex: 1.3 }]}>{slaData.pendingWork[1]}</Text>
                                <Text style={[styles.cell, { flex: 1 }]}>{slaData.pendingWork[2]}</Text>
                            </View>
                        </View>

                        {/* Action Required from Client */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Action Required from Client</Text>
                            {slaData.actionRequiredFromClient.map((action: string, index: number) => (
                                <Text key={index} style={styles.listItem}>{`\u2022 ${action}`}</Text>
                            ))}
                        </View>

                        {/* Client Feedback */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Client Feedback for the Month</Text>
                            <Text style={styles.listItem}>{slaData.clientFeedback || 'No feedback provided.'}</Text>
                        </View>
                    </>
                ) : (
                    <Text style={styles.emptyText}>No SLA Data Available</Text>
                )}
           </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.primaryColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondaryColor,
        marginBottom: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.newDark,
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerCell: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primaryColor,
        paddingHorizontal: 8,
        paddingLeft:20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
    },
    oddRow: {
        backgroundColor: '#fff',
    },
    cell: {
        flex: 1,
        fontSize: 14,
        color: COLORS.secondaryColor,
        fontWeight: '500',
        paddingHorizontal: 8,
    },
    listItem: {
        fontSize: 14,
        color: COLORS.secondaryColor,
        marginLeft: 10,
        marginBottom: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: COLORS.background_chipe,
        fontSize: 16,
    },
});

export default ViewSLA;
