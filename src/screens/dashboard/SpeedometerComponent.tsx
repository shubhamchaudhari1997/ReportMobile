import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNSpeedometer from 'react-native-speedometer';

interface SpeedometerComponentProps {
  label: string;
  value: number;
}

const SpeedometerComponent: React.FC<SpeedometerComponentProps> = ({
  label,
  value,
}) => {
  return (
    <View style={styles.speedometerWrapper}>
      <Text style={styles.label}>{label}</Text>
      <RNSpeedometer
        value={value}
        size={200}
        labels={[
          {
            name: 'At Risk',
            labelColor: '#ff2900',
            activeBarColor: '#ff2900',
          },
          {
            name: 'Stable',
            labelColor: 'yellow',
            activeBarColor: 'yellow',
          },
          {
            name: 'High Growth',
            labelColor: '#14eb6e',
            activeBarColor: '#14eb6e',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  speedometerWrapper: {
    alignItems: 'center',
    marginVertical: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SpeedometerComponent;
