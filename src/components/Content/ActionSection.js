import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
// Components
import ActionButton from "../ActionButton";
import ChangeShelfButton from "./ChangeShelfButton";
import ClearButton from "../ClearButton";
import ProgressBar from "../ProgressBar";
// Styling
import { GRAY_4, INDIGO } from "../../design/colors";
import { REGULAR, SEMIBOLD } from "../../design/typography";
// Helpers
import { calculatePercentComplete } from "../../helpers/screenHelpers";

// Section for either adding a book to My Library or viewing and changing the
// shelf it's on if it's already been saved
const ActionSection = ({
  shelf,
  pageCount,
  pagesRead,
  onPress,
  navigation
}) => {
  return (
    <View style={styles.container}>
      {shelf ? (
        <View>
          <ChangeShelfButton shelf={shelf} onPress={onPress} />
          {shelf === "Currently Learning" ? (
            <>
              <ProgressBar
                barContainerStyle={styles.progressBar}
                percentComplete={calculatePercentComplete(pagesRead, pageCount)}
              />
              <ClearButton
                title="Update Progress"
                onPress={() => navigation.navigate("UpdateProgress")}
              />
            </>
          ) : null}
        </View>
      ) : (
        <ActionButton title="Add to Library" onPress={onPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: GRAY_4
  },
  progressBar: {
    marginTop: 15
  }
});

export default withNavigation(ActionSection);