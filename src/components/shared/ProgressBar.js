import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { OFF_BLACK, GRAY_5, LIME_GREEN } from "../../design/colors";
import { REGULAR, FS12 } from "../../design/typography";

const ProgressBar = ({
  barContainerStyle,
  barStyle: passedBarStyle,
  percentComplete,
  displayPercentText = true,
}) => {
  const containerStyle = StyleSheet.compose(
    styles.barContainer,
    barContainerStyle
  );
  const barStyle = StyleSheet.flatten([
    styles.bar,
    passedBarStyle,
    // Ensure width of the bar isn't over 100%
    {
      width: `${Math.min(percentComplete, 100)}%`,
    },
  ]);

  return (
    <View style={containerStyle}>
      <View style={barStyle} />
      {displayPercentText && (
        <Text style={styles.barText}>{`${percentComplete}%`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    height: 20,
    justifyContent: "center",
    backgroundColor: GRAY_5,
    borderRadius: 5,
  },
  bar: {
    height: 20,
    borderRadius: 5,
    backgroundColor: LIME_GREEN,
  },
  barText: {
    position: "absolute",
    fontFamily: REGULAR,
    fontSize: FS12,
    color: OFF_BLACK,
    paddingLeft: 5,
  },
});

export default ProgressBar;
