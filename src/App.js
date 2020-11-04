import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} options={({route}) => ({ title: route.params.first_name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const Home = ({ navigation }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(res => setEntries(res.data))
  }, [])

  return (
    <SafeAreaView>
      {/* <Text>{JSON.stringify(entries, null, 4)}</Text> */}
      {entries.map((i, j) => (
        <Button key={j} title={i.first_name} onPress={() => {
          navigation.navigate("Details", i)
        }} />
      ))}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const Details = ({ route, navigation }) => {
  const { ...entry } = route.params;
  return (
    <View>
      <Text>Details</Text>
      <Text>{JSON.stringify(entry, null, 4)}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
