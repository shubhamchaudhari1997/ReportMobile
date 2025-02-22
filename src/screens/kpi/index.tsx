import { View } from 'react-native';
import React, { useState } from 'react';
import Selector from '../../components/Selector';
import { COLORS } from '../../theme/colors';
import Container from '../../components/Container';
import PLScreen from './PLScreen';
import BSScreen from './BSScreen';
import Customer from './Customer';
import Employee from './Employee';
import Other from './Other';


const screens = [
  { label: 'PLScreen', value: 'PLScreen' },
  { label: 'BSScreen', value: 'BSScreen' },
  { label: 'Customer', value: 'Customer' },
  { label: 'Employee', value: 'Employee' },
  { label: 'Other', value: 'Other' },
];

// Mapping screen names to their respective components
const screenComponents: Record<string, React.FC> = {
  PLScreen,
  BSScreen,
  Customer,
  Employee,
  Other,
};

const KpiScreen = () => {
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

  const handleSelection = (name: string, dropdownData: any) => {
    setSelectedScreen(dropdownData.value); // Set selected screen name
  };

  const SelectedComponent = selectedScreen ? screenComponents[selectedScreen] : null;

  return (
    <Container
      header={{
        title: 'KPI',
        backgroundColor: COLORS.primaryColor,
        statusBarType: 'dark-content',
        toggleDrawer: true,
      }}>
      <View style={{ padding: 16,paddingBottom:5 }}>
        <Selector
          data={screens}
          onChangeText={handleSelection}
          value={selectedScreen || ''}
          type="label"
          placeholder="Select a Screen *"
          containerStyle={{ width: '100%' }}
        />
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        {SelectedComponent && <SelectedComponent />}
      </View>
    </Container>
  );
};

export default KpiScreen;
