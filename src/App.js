import React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Campaigns';
import Details from './components/CampaignDetails';
import BackImage from './components/assets/BackImage';

const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#5b08a4',
  },
  headerTintColor: '#ffffff',
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "VW Text",
    fontSize: "20px"
  },
  animationEnabled: true,
  animationTypeForReplace: "pop"
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Campanhas" component={Home} options={() => ({ 
          ...headerOptions
        })} />
        <Stack.Screen name="Details" component={Details} options={({route}) => ({ 
          title: route.params.Nome, 
          headerBackImage: () => <BackImage />,
          ...headerOptions
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
