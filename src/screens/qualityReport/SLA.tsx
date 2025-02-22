import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import { COLORS } from '../../theme/colors';
import moment from 'moment';
import api from '../../services';
import { useNavigation } from '@react-navigation/native';

const SLA = () => {
    const [loading, setLoading] = useState(true);
    const [slaData, setSLAData] = useState<any[]>([]);
    const navigation = useNavigation<any>();

    useEffect(() => {
        fetchSLAData();
    }, []);

    console.log(slaData,'slaData');
    

    const fetchSLAData = async () => {
        try {
            setLoading(true);
            const { data, status } = await api.client.getViewSLADetails();
            if (status === 200 && data) {
                setSLAData(data);
            }
        } catch (error) {
            console.error('Error fetching SLA data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={[styles.cell, styles.client]}>{item.client?.name || 'N/A'}</Text>
            <Text style={[styles.cell, styles.date]}>{moment(item.enteredDate).format('MM/DD/YYYY')}</Text>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('ViewSLA', { ClientId: item?.client })}
            >
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Container
            header={{
                title: 'SLA',
                backgroundColor: COLORS.primaryColor,
                statusBarType: 'dark-content',
                toggleDrawer: true,
            }}
            goBack={true}
        >
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.newDark} />
                ) : (
                    <>
                        {/* Table Header */}
                        <View style={[styles.row, styles.header]}>
                            <Text style={[styles.cell, styles.clientHeader]}>Client</Text>
                            <Text style={[styles.cell, styles.dateHeader]}>Date</Text>
                            <Text style={[styles.cell, styles.actionHeader]}>Action</Text>
                        </View>

                        {/* Table Data */}
                        <FlatList
                            data={slaData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={<Text style={styles.emptyText}>No Data Available</Text>}
                        />
                    </>
                )}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.primaryColor,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    header: {
        backgroundColor: COLORS.newDark,
        paddingVertical: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        color: COLORS.secondaryColor,
        fontWeight: '500',
        paddingHorizontal: 8,
    },
    client: { flex: 2 },
    date: { flex: 1 },
    actionHeader: { flex: 1, textAlign: 'right', color: COLORS.primaryColor, fontWeight: 'bold' },
    clientHeader: { flex: 2, color: COLORS.primaryColor, fontWeight: 'bold' },
    dateHeader: { flex: 1, color: COLORS.primaryColor, fontWeight: 'bold' },
    viewButton: {
        backgroundColor: COLORS.blueIcon,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    viewButtonText: {
        color: COLORS.primaryColor,
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: COLORS.danger,
        fontSize: 16,
    },
});

export default SLA;
