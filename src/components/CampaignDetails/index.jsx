import React from "react";
import { View, Text, Button } from "react-native";

const Details = ({ route, navigation }) => {
  const { ...entry } = route.params;
  return (
    <View>
      <Text>Details</Text>
      <Text>{JSON.stringify(entry, null, 4)}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Details;