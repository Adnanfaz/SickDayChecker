import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { HealthProvider } from '../context/HealthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useColorScheme,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../src/HomeScreen';
import SymptomsScreen from '../src/SymptomsScreen';
import ResultsScreen from '../src/ResultsScreen';
import HistoryScreen from '../src/HistoryScreen';
import SettingsScreen from '../src/SettingsScreen';

const Stack = createStackNavigator();

// Create custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
    accent: '#ff5252',
  },
  roundness: 8,
};

// Custom header component
const CustomHeader = ({ navigation, back, title }) => {
  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.appName}>Sick Day Checker</Text>
      </View>
      <View style={styles.backButtonPlaceholder} />
    </View>
  );
};


const App = () => {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={theme}>
      <HealthProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            cardStyle: { backgroundColor: '#f5f5f5' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Home"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Symptoms"
            component={SymptomsScreen}
            options={({ navigation, route }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  back={true}
                  title="Symptoms"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  back={true}
                  title="Results"
                />
              ),
            })}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  back={true}
                  title="History"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  back={true}
                  title="Settings"
                />
              ),
            })}
          />
        </Stack.Navigator>
      </HealthProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 80 : 56,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    backgroundColor: '#4caf50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  appName: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default App;
