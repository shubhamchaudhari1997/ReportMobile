import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';

const ViewTableComponent = ({title, columns, rowLabels, data}: any) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No data available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Table Header */}
      <View style={styles.headerRow}>
        {columns.map((col, index) => (
          <Text key={index} style={styles.headerText}>
            {col}
          </Text>
        ))}
        <Text style={styles.headerText}>Total</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={data.slice(0, rowLabels.length + 1)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>
              {index < rowLabels.length ? rowLabels[index] : 'Total'}
            </Text>
            {item.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>
                {cell}
              </Text>
            ))}
            <Text style={styles.cell}>
              {item.reduce((sum, val) => sum + (Number(val) || 0), 0)}
            </Text>
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    flex: 1,
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

export default ViewTableComponent;
