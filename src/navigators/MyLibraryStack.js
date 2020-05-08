import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/shared/Headers";
// Screens
import MyLibraryScreen from "../screens/MyLibraryScreen";
import IndividualShelfScreen from "../screens/IndividualShelfScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
import CreateTopicScreen from "../screens/CreateTopicScreen";
import TopicScreen from "../screens/TopicScreen";
// Helpers
import SCREEN_OPTIONS from "./screenOptions";
// Design
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="My Library"
        component={MyLibraryScreen}
        options={{ headerTitle: () => <NavHeaderTitle title="My Library" /> }}
      />
      <Stack.Screen
        name="IndividualShelf"
        component={IndividualShelfScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTitle: () => <NavHeaderTitle title={route.params.title} />,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ title: null }}
      />
      <Stack.Screen
        name="ShelfSelect"
        component={ShelfSelectScreen}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Topic"
        component={TopicScreen}
        options={({ route }) => ({
          title: route.params.topicInfo.name,
          headerTitle: () => (
            <NavHeaderTitle title={route.params.topicInfo.name} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProgress"
        component={UpdateProgressScreen}
        options={{
          title: "Update Progress",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="CreateTopic"
        component={CreateTopicScreen}
        options={{
          title: "Create Topic",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
