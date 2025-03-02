import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, G, Line, Circle } from "react-native-svg";

type Speedometer0Props = {
  lable: string;
  value: number;
};
const Speedometer0: React.FC<Speedometer0Props> = ({ lable, value }) => {
  const radius = 100;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const maxValue = 100;

  // Define color ranges
  const segments = [
    { color: "#5f932e", range: [0, 20] }, // Red (0-10%)
    { color: "#5f932e", range: [20, 45] }, // Yellow (10-25%)
    { color: "#5f932e", range: [38, 50] }, // Green (25-100%)
  ];

  // Get active color
  const activeColor =
    segments.find(({ range }) => value >= range[0] && value < range[1])
      ?.color || "#5f932e"; // Default green

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
          stroke="#f8e970"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Colored Segments */}
        {segments.map((segment, index) => {
          const startAngle = (segment.range[0] / maxValue) * 180 - 134;
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
        <Text style={[styles.label, { left: center - 80, top: center - 20 }]}>
          0%
        </Text>
        {/* <Text style={[styles.label, { left: center - 65, top: center - 60 }]}>
          25%
        </Text> */}
        <Text style={[styles.label, { left: 160, top: center - 20 }]}>
          100%
        </Text>
      </Svg>

      {/* Text Label Below Speedometer */}
      <Text style={styles.textLabel}>
        {lable} {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginTop: 50,
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
    color: "#ec5050",
    fontWeight: "bold",
    fontStyle: "italic",
    position: "absolute",
    bottom: 50,
  },
});

export default Speedometer0;
