import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login'; // Adjust the path accordingly
import Home from './Screens/Home';
import Detail from "./Screens/Detail";
import { ImageBackground } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Login screen */}
        <Stack.Screen name="Login" component={Login} />

        {/* Home screen */}
        <Stack.Screen name="Home" component={Home} options={{
              headerBackTitleVisible: false,
            }} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
