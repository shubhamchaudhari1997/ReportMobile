import React, {useEffect, useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import axios from 'axios';
import {COLORS} from '../../theme/colors';
import Container from '../../components/Container';
import {fontsProxima} from '../../theme/typography';
import {Button} from '@rneui/base';
import Selector from '../../components/Selector'; // Assuming this is your custom component
import api from '../../services';
import { useNavigation } from '@react-navigation/native';
import OperationalData from './OperationalData';

const Operational = () => {
  const [fileOptions, setFileOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const [monthOptions, setMonthOptions] = useState<
    {label: string; value: string}[]
  >([
    { label: 'January', value: '0' },
    { label: 'February', value: '1' },
    { label: 'March', value: '2' },
    { label: 'April', value: '3' },
    { label: 'May', value: '4' },
    { label: 'June', value: '5' },
    { label: 'July', value: '6' },
    { label: 'August', value: '7' },
    { label: 'September', value: '8' },
    { label: 'October', value: '9' },
    { label: 'November', value: '10' },
    { label: 'December', value: '11' },
  ]);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedMonthId, setSelectedMonthId] = useState<number | null>(null);
  const [graphVisible, setGraphVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const navigation=useNavigation<any>();

  useEffect(() => {
    getOperationalData();
  }, []);

  const getOperationalData = async () => {
    try {
      const {data, status} = await api.client.getOperationalData();
      if (status === 200 && data) {
        const dropdownData = data.map((item: any) => ({
          label: item.text,
          value: item.value,
        }));
        setFileOptions(dropdownData);
      }
    } catch (error) {
      console.error('Error fetching file options:', error);
    }
  };

  const handleShowData = async () => {
    if (!selectedFile || !selectedMonth) {
      Alert.alert('Error', 'Please select both File and Month');
      return;
    }
    setGraphVisible(true)
  };

  return (
    <Container
      header={{
        title: `Operational Report`,
        backgroundColor: COLORS.primaryColor,
        statusBarType: 'dark-content',
        toggleDrawer: true,
      }}>
      <View style={styles.container}>
        {/* File Selector */}
        <View style={{marginTop: 10}}>
          <Selector
            data={fileOptions}
            onChangeText={(name, dropdownData) => {
              setSelectedFile(dropdownData.label);
              setSelectedFileId(dropdownData.value);
            }}
            value={selectedFile}
            type="label"
            placeholder="Select a File *"
            containerStyle={{width: '100%'}}
          />
        </View>

        {/* Month Selector */}
        <View style={{marginTop: 20}}>
          <Selector
            data={monthOptions}
            onChangeText={(name, dropdownData) => {
              setSelectedMonthId(dropdownData.value);
              setSelectedMonth(dropdownData.label);
            }}
            value={selectedMonth}
            type="label"
            placeholder="Select a Month *"
            containerStyle={{width: '100%'}}
          />
        </View>

        {/* Show Data Button */}
        <Button
          title={loading ? 'Loading...' : 'Show Data'}
          onPress={handleShowData}
          disabled={loading}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
        />
        {graphVisible && <OperationalData selectedFileId={selectedFileId} selectedMonthId={selectedMonthId}/>}
      </View>

    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background_chipe,
    flex: 1,
  },
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

export default Operational;
