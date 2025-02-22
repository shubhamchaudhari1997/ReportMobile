import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

const TableComponent = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No data available</Text>;
  }

  const headers = Object.keys(data[0]); // Get table headers dynamically

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerRow}>
        {headers.map(header => (
          <Text key={header} style={styles.headerText}>
            {header.toUpperCase()}
          </Text>
        ))}
      </View>

      {/* Table Rows */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {headers.map(header => (
              <Text key={header} style={styles.cell}>
                {item[header]}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#555',
  },
  noDataText: {
    textAlign: 'center',
    padding: 10,
    color: '#999',
  },
});

export default TableComponent;
