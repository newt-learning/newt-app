import React from "react";
import { ListItem } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

const Shelf = ({ name, checked, onPressCheckbox }) => {
  return (
    <ListItem
      title={name}
      bottomDivider
      iconType="feather"
      onPress={onPressCheckbox}
      checkBox={{
        checked,
        onPress: onPressCheckbox,
        iconType: "feather",
        checkedIcon: "check-circle",
        uncheckedIcon: "circle"
      }}
    />
  );
};

export default Shelf;
