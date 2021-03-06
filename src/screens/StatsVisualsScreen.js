import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
// Components
import ButtonGroup from "../components/shared/ButtonGroup";
import BarChart from "../components/Stats/StatsBarChart";
import Loader from "../components/shared/Loader";
import StatsSummaryCard from "../components/Stats/StatsSummaryCard";
import ErrorMessage from "../components/shared/ErrorMessage";
// Hooks
import useStatsByPeriod from "../hooks/useStatsByPeriod";
// Design
import { OFF_WHITE, GRAY_5 } from "../design/colors";

// Main component to show in screen under Button Group
const StatsVizualization = ({ data, selectedButtonIndex, period, error }) => {
  // If selectedButtonIndex is out of range for whatever reason (it should never be), return nothing
  if (selectedButtonIndex < 0 || selectedButtonIndex >= 4) {
    return null;
  }

  // If there's an error message display error message screen
  if (error) {
    return <ErrorMessage message={error.message} backgroundColor={OFF_WHITE} />;
  }

  // For the day visual, show a summary card for each content type. Otherwise for the rest, show the bar chart
  if (selectedButtonIndex === 0) {
    return data.map((item) => {
      const sentence = `${item.value} ${item.unit} today.`;
      return (
        <StatsSummaryCard
          key={item.contentType}
          contentType={item.contentType}
          summarySentence={sentence}
          cardStyle={{ backgroundColor: GRAY_5 }}
          showChevron={false}
        />
      );
    });
  } else {
    return (
      <BarChart data={data} period={period} containerStyle={styles.chart} />
    );
  }
};

const StatsVisualsScreen = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const buttons = ["D", "W", "M", "Y"];
  const periods = ["day", "week", "month", "year"];
  const { status, data, error } = useStatsByPeriod(
    periods[selectedButtonIndex]
  );

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttonsArray={buttons}
        selectedIndex={selectedButtonIndex}
        onPress={setSelectedButtonIndex}
        containerStyle={styles.buttonGroup}
      />
      {/* If fetching, show Loader. Otherwise show the Chart component */}
      {status === "loading" ? (
        <Loader backgroundColor={OFF_WHITE} />
      ) : (
        <StatsVizualization
          data={data[periods[selectedButtonIndex]]}
          selectedButtonIndex={selectedButtonIndex}
          period={periods[selectedButtonIndex]}
          error={error}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
    paddingTop: 10,
  },
  buttonGroup: {
    marginHorizontal: 15,
  },
  chart: {
    marginTop: 20,
    marginHorizontal: 15,
  },
});

export default StatsVisualsScreen;
