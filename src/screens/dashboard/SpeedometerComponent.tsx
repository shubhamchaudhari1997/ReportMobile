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
            name: 'Needs Attention',
            labelColor: '#f4ab44',
            activeBarColor: '#f4ab44',
          },
          {
            name: 'Stable',
            labelColor: '#f2cf1f',
            activeBarColor: '#f2cf1f',
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
