import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Container from '../../components/Container';
import {COLORS} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import api from '../../services';

const PAGE_SIZE = 8; // Number of items per page

const DetailReports = () => {
  const [reportsData, setReportsData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigation = useNavigation<any>();

  useEffect(() => {
    getViewByMonthYearData();
  }, []);

  const getViewByMonthYearData = async () => {
    try {
      setLoading(true);
      const {data, status} = await api.client.getReportsData();

      if (status === 200 && data) {        
        const formattedData = data.map(
          (item: {
            template: {fileName: any,temp_Id:any};
            dateselected: any;
            dataValues: any[];
          }) => ({
            name: item.template?.fileName || 'Unknown',
            tempId: item.template?.temp_Id || 0,
            date: item.dateselected?.split('T')[0] || 'N/A',
            values: item.dataValues.map(row => row.split(',')),
          }),
        );

        setReportsData(formattedData);
        setTotalPages(Math.ceil(formattedData.length / PAGE_SIZE)); // Calculate total pages
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedData = reportsData.slice(startIndex, startIndex + PAGE_SIZE);

  const onDetailsViewPress=(item:any)=>{
    navigation.navigate('DetailReportsView',{item})
  }  

  return (
    <Container
      header={{
        title: 'Detail Reports',
        backgroundColor: COLORS.primaryColor,
        statusBarType: 'dark-content',
        toggleDrawer: true,
      }}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.newDark} style={{flex:1}}/>
      ) : (
        <View style={styles.container}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Template Name</Text>
            <Text style={styles.headerText}>Report Date</Text>
            <Text style={styles.headerText}>Action</Text>
          </View>

          {/* Table Content */}
          <FlatList
            data={paginatedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text style={[styles.cell, {flex: 1.2}]}>{item.name}</Text>
                <Text style={styles.cell}>{item.date}</Text>
                <TouchableOpacity style={styles.viewButton} onPress={()=>onDetailsViewPress(item)}>
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Pagination Controls */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.pageButton, page === 1 && styles.disabledButton]}
              onPress={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}>
              <Text style={styles.pageButtonText}>Previous</Text>
            </TouchableOpacity>

            <Text style={styles.pageInfo}>
              Page {page} of {totalPages}
            </Text>

            <TouchableOpacity
              style={[
                styles.pageButton,
                page === totalPages && styles.disabledButton,
              ]}
              onPress={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}>
              <Text style={styles.pageButtonText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('ViewByMonthYear')}>
              <Text style={styles.actionText}>View By Month/Year</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('ViewKPI')}>
              <Text style={styles.actionText}>KPI List</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10, backgroundColor: COLORS.primaryColor},
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.blue_chipe,
    justifyContent: 'space-between',
  },
  headerText: {fontWeight: 'bold'},
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {flex: 1},
  viewButton: {
    backgroundColor: COLORS.greenLightShade,
    padding: 5,
    borderRadius: 5,
    height: 30,
  },
  buttonText: {color: COLORS.primaryColor},

  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  pageButton: {
    backgroundColor: COLORS.new,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 30,
  },
  disabledButton: {
    backgroundColor: COLORS.secondaryColorLight || '#ccc',
  },
  pageButtonText: {
    color: COLORS.primaryColor,
    fontWeight: 'bold',
  },
  pageInfo: {
    fontWeight: 'bold',
  },

  // Button Container
  buttonContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: COLORS.blueBackgroundIcon,
    marginVertical: 10,
  },
  actionText: {
    color: COLORS.newDark,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetailReports;
