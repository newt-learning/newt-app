import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import ShowMoreShowLess from "./ShowMoreShowLess";
// Styling
import { SEMIBOLD, REGULAR, FS18, FS14 } from "../../design/typography";
import { GRAY_1, GRAY_4 } from "../../design/colors";
// Helpers
import { shortenText } from "../../helpers/textHelpers";

const TEXT_LIMIT = 400;

const Description = ({ text, showMore, setShowMore }) => {
  if (!text) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Description</Text>
      <Text style={styles.text}>
        {showMore ? text : shortenText(text, TEXT_LIMIT)}
      </Text>
      {text.length > TEXT_LIMIT ? (
        <ShowMoreShowLess showMore={showMore} setShowMore={setShowMore} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: GRAY_4
  },
  header: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: GRAY_1,
    marginBottom: 5
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14
  }
});

export default Description;
