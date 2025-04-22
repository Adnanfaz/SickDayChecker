import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './src/HomeScreen';
import SymptomsScreen from './src/SymptomsScreen';
import ResultsScreen from './src/ResultsScreen';
import HistoryScreen from './src/HistoryScreen';
import SettingsScreen from './src/SettingsScreen';
import { HealthProvider } from './context/HealthContext';

const Stack = createStackNavigator();

// Define the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
    accent: '#ff5252',
    background: '#f5f5f5',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <HealthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Sick Day Checker' }} />
            <Stack.Screen name="Symptoms" component={SymptomsScreen} options={{ title: 'Check Symptoms' }} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
            <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </HealthProvider>
    </PaperProvider>
  );
}
