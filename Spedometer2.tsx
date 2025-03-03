import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, G, Line, Circle } from "react-native-svg";

const Speedometer2 = ({ lable,value}:{ lable:any,value:any}) => {
  const radius = 100;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const maxValue = 100;

  // Define color ranges
  const segments = [
    { color: "#f1c40f",range: [0, 10] }, // Red (0-10%)
    { color: "#f1c40f", range: [15, 12] }, // Yellow (10-25%)
    { color: "#e74c3c", range: [20, 50] }, // Green (25-100%)
  ];

  // Get active color
  const activeColor =
    segments.find(({ range }) => value >= range[0] && value < range[1])
      ?.color || "#2c7a2a"; // Default green

  // Needle rotation (0° to 180°)
  const needleRotation = (Math.min(value, maxValue) / maxValue) * 180;

  return (
    <View style={styles.container}>
      <Svg height={center * 2} width={center * 2}>
        {/* Background Arc */}
        <Path
          d={`M ${center - radius}, ${center} A ${radius} ${radius} 0 0 1 ${
            center + radius
          }, ${center}`}
          stroke="#2c7a2a"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Colored Segments */}
        {segments.map((segment, index) => {
          const startAngle = (segment.range[0] / maxValue) * 180 - 126;
          const endAngle = (segment.range[1] / maxValue) * 180 - 90;
          const largeArcFlag = endAngle - startAngle > 90 ? 1 : 0;

          const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle);
          const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle);
          const x2 = center + radius * Math.cos((Math.PI / 180) * endAngle);
          const y2 = center + radius * Math.sin((Math.PI / 180) * endAngle);

          return (
            <Path
              key={index}
              d={`M ${x1},${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              fill="none"
            />
          );
        })}

        {/* Needle */}
        <G rotation={needleRotation - 90} origin={`${center}, ${center}`}>
          <Line
            x1={center}
            y1={center}
            x2={center}
            y2={strokeWidth * 0.5}
            stroke="#333"
            strokeWidth="4"
          />
        </G>

        {/* Center Dot */}
        <Circle cx={center} cy={center} r={5} fill="#333" />

        {/* Labels (0%, 25%, 100%) */}
        <Text style={[styles.label, { left: center - 110 }]}>0%</Text>
        <Text style={[styles.label, { left: center - 10 ,top:140,fontSize:30}]}>{value}%</Text>
        <Text style={[styles.label, { left: 210 }]}>100%</Text>
      </Svg>

      {/* Text Label Below Speedometer */}
      <Text style={styles.textLabel}>{lable} % {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical:10

  },
  label: {
    position: "absolute",
    top: 120,
    fontSize: 16,
    fontWeight: "bold",
  },
  textLabel: {
    fontSize: 22,
   // marginTop: 10,
    color: "#e74c3c",
    fontWeight: "bold",
    fontStyle: "italic",
    position: "absolute",bottom:20
  },
});

export default Speedometer2;
