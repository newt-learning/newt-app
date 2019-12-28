import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderTitle } from "../components/Header";
import { Feather } from "@expo/vector-icons";
// Screens
import MyLibraryScreen from "../screens/MyLibraryScreen";

const MyLibraryStack = createStackNavigator({
  "My Library": {
    screen: MyLibraryScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? (
          <HeaderTitle title="My Library" />
        ) : (
          "My Library"
        )
    }
  }
});

MyLibraryStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="book-open" size={20} color={tintColor} />
  )
};

export default MyLibraryStack;