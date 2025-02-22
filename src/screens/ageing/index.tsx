import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import Selector from '../../components/Selector';
import {COLORS} from '../../theme/colors';
import Debetors from './Debetors';
import Ageing from './Ageing';

const screens = [
  {label: 'Ageing', value: 'Ageing'},
  {label: 'Debetors', value: 'Debetors'},
];

// Mapping screen names to their respective components
const screenComponents: Record<string, React.FC> = {
  Ageing,
  Debetors,
};

const index = () => {
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

  const handleSelection = (name: string, dropdownData: any) => {
    setSelectedScreen(dropdownData.value); // Set selected screen name
  };

  const SelectedComponent = selectedScreen
    ? screenComponents[selectedScreen]
    : null;

  return (
    <Container
      header={{
        title: 'KPI',
        backgroundColor: COLORS.primaryColor,
        statusBarType: 'dark-content',
        toggleDrawer: true,
      }}>
      <View style={{padding: 16, paddingBottom: 5}}>
        <Selector
          data={screens}
          onChangeText={handleSelection}
          value={selectedScreen || ''}
          type="label"
          placeholder="Select a Screen *"
          containerStyle={{width: '100%'}}
        />
      </View>
      <View style={{flex: 1, padding: 16}}>
        {SelectedComponent && <SelectedComponent />}
      </View>
    </Container>
  );
};

export default index;
