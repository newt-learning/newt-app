import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
// Styling
import { NEWT_BLUE, OFF_BLACK } from "../design/colors";

const MyLibraryScreen = () => {
  return <Text style={styles.text}>My Library</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    fontSize: 48
  }
});

MyLibraryScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Feather
      name="book-open"
      size={20}
      color={focused ? NEWT_BLUE : OFF_BLACK}
    />
  )
};

export default MyLibraryScreen;
