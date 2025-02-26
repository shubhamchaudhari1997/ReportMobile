import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";
import CDText from "./core/CDText";
import { COLORS } from "../theme";
export const Empty =
  "https://rourneedsfiles.blob.core.windows.net/rourneedsfiles/MasterData/Category/03c1297a-eb2e-44e6-b4c3-7b0314825a40_Empty.png";

type EmptyProps = {
  longMsg?: string;
  shortMsg?: string;
};

const EmptyComponent: React.FC<EmptyProps> = ({ longMsg, shortMsg }) => {
  let long = longMsg || "No data available at the moment";
  let short = shortMsg || "No records found";
  return (
    <View style={Styles.EmptyComponent}>
      <Image
        source={require("../../src/assets/images/noDataFound.png")}
        style={Styles.EmptyImage}
        resizeMode="contain"
      />
      <CDText
        style={{
          color: COLORS.secondaryColor,
          fontSize: 16,
          marginBottom: 5,
          marginTop: 10,
        }}
      >
        {short}
      </CDText>
      <CDText
        style={{
          color: COLORS.secondaryColor,
          fontSize: 14,
          marginBottom: 5,
          opacity: 0.5,
          textAlign: "center",
        }}
      >
        {long}
      </CDText>
    </View>
  );
};

export default EmptyComponent;

const Styles = StyleSheet.create({
  EmptyComponent: {
    height: Dimensions.get("window").height / 1.5,
    backgroundColor: COLORS.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  EmptyImage: {
    width: 300,
    height: 200,
  },
});
