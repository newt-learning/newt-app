// A list of cards of content (used in listing search results and shelves)
import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import ContentListCard from "./ContentListCard";
// Styling
import { REGULAR, FS16 } from "../design/typography";
import { GRAY_2, GRAY_5 } from "../design/colors";
// Helpers
import { handleContentNavigation } from "../helpers/screenHelpers";

const ContentList = ({ data, SearchBar }) => {
  const navigation = useNavigation();

  if (_.isEmpty(data)) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>This shelf is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* If a SearchBar component is passed down, render it */}
      {SearchBar ? SearchBar : null}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ContentListCard
            title={item.name}
            authors={item.authors}
            thumbnailUrl={item.thumbnailUrl}
            type={item.type}
            onPress={() => handleContentNavigation(item, navigation)}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: GRAY_5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: REGULAR,
    fontSize: FS16,
    color: GRAY_2,
  },
});

export default ContentList;
