import React from "react";
import { Text, View } from "react-native";

export const barChartToolTip ={
    pointerStripHeight: 160, // Height of the vertical strip
    pointerStripColor: 'gray', // Color of the vertical strip
    pointerStripWidth: 2, // Width of the strip
    pointerColor: 'red', // Color of the pointer dot
    radius: 6, // Size of the pointer dot
    pointerLabelWidth: 100, // Width of the tooltip label
    pointerLabelHeight: 90, // Height of the tooltip label
    activatePointersOnLongPress: false, // Show tooltip on single tap
    autoAdjustPointerLabelPosition: true, // Adjust label position to avoid overflow
    pointerLabelComponent: (items:any) => {
      // Custom tooltip content
      return (
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ddd',
          }}
        >
          <Text style={{ color: '#000' }}>
            {items[0].label}: {items[0].value}
          </Text>
        </View>
      );
    },
  }