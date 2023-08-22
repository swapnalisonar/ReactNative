// Import necessary modules
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the main application component
const App = () => {
  // The NavigationContainer is the top-level container for navigation
  return (
    <NavigationContainer>
      {/* Inside the NavigationContainer, define the stack of screens */}
      <Stack.Navigator initialRouteName="Home">
        {/* Each Stack.Screen corresponds to a screen in the app */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the main application component
export default App;
