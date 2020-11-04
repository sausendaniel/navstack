import React from "react";
import { NavigationContainer } from '@react-navigation/native';
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
    fontWeight: 'bold',
  },
  animationEnabled: true,
  animationTypeForReplace: "pop"
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Campanhas" component={Home} options={() => ({ 
          ...headerOptions, 
          headerLeft: () => (
            <div style={{ padding: "0 12px" }} onClick={() => window.history.back()}>
              <BackImage />
            </div>
          )
        })} />
        <Stack.Screen name="Details" component={Details} options={({route}) => ({ 
          title: route.params.first_name, 
          headerBackImage: () => <BackImage />,
          ...headerOptions
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
