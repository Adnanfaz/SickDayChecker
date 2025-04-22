import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Title, Text, Switch, Divider, List, useTheme } from 'react-native-paper';
import { HealthContext } from '../context/HealthContext';
import { saveUserSettings, loadUserSettings } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const { updateLocation } = useContext(HealthContext);
  const theme = useTheme();
  const [settings, setSettings] = useState({
    zipCode: '',
    notifications: true,
    darkMode: false,
    dataSharing: false,
    name: '',
    age: '',
  });
  
  useEffect(() => {
    loadSavedSettings();
  }, []);
  
  const loadSavedSettings = async () => {
    const savedSettings = await loadUserSettings();
    if (savedSettings) {
      setSettings(prevSettings => ({
        ...prevSettings,
        ...savedSettings,
      }));
    }
  };
  
  const handleSettingChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const saveSettings = async () => {
    try {
      await saveUserSettings(settings);
      if (settings.zipCode) {
        updateLocation(settings.zipCode);
      }
      Alert.alert(
        "Settings Saved",
        "Your settings have been successfully saved.",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to save settings. Please try again.",
        [{ text: "OK" }]
      );
    }
  };
  
  const clearAllData = async () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all your symptom history and settings? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear Data",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setSettings({
                zipCode: '',
                notifications: true,
                dataSharing: false,
                name: '',
                age: '',
              });
              Alert.alert("Success", "All data has been cleared.");
              navigation.navigate('Home');
            } catch (error) {
              Alert.alert("Error", "Failed to clear data. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Settings</Title>
      
      <List.Section>
        <List.Subheader>Personal Information</List.Subheader>
        <TextInput
          label="Name"
          value={settings.name}
          onChangeText={(value) => handleSettingChange('name', value)}
          style={styles.input}
        />
        <TextInput
          label="Age"
          value={settings.age}
          onChangeText={(value) => handleSettingChange('age', value)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Zip Code"
          value={settings.zipCode}
          onChangeText={(value) => handleSettingChange('zipCode', value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </List.Section>
      
      <Divider style={styles.divider} />
      
      <List.Section>
        <List.Subheader>App Preferences</List.Subheader>
        
        <View style={styles.toggleRow}>
          <Text>Notifications</Text>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => handleSettingChange('notifications', value)}
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
          <Switch
            value={global.isDarkMode}
            onValueChange={global.toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={global.isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text>Anonymous Data Sharing</Text>
          <Switch
            value={settings.dataSharing}
            onValueChange={(value) => handleSettingChange('dataSharing', value)}
          />
        </View>
      </List.Section>
      
      <Divider style={styles.divider} />
      
      <Text style={styles.infoText}>
        Anonymous data sharing helps us improve our recommendations and track illness trends.
        No personal information is ever shared.
      </Text>
      
      <Button 
        mode="contained" 
        onPress={saveSettings}
        style={styles.saveButton}
      >
        Save Settings
      </Button>
      
      <Button 
        mode="outlined" 
        onPress={clearAllData}
        style={styles.clearButton}
        color="#d32f2f"
      >
        Clear All Data
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  divider: {
    marginVertical: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  saveButton: {
    marginBottom: 16,
  },
  clearButton: {
    marginBottom: 32,
  },
});

export default SettingsScreen;

