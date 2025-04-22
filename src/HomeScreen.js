import { Button, Title, Subheading, Switch, Text, RadioButton, Divider, TextInput, Card, Banner, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider'; 
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { HealthContext } from '../context/HealthContext.js';
import { loadUserSettings } from '../utils/storage';

const HomeScreen = ({ navigation }) => {
  const { updateLocation, isLoading, fluData, apiError } = useContext(HealthContext);
  const [zipCode, setZipCode] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  
  useEffect(() => {
    // Load saved settings when component mounts
    const loadSettings = async () => {
      const settings = await loadUserSettings();
      if (settings && settings.zipCode) {
        setZipCode(settings.zipCode);
        updateLocation(settings.zipCode);
      }
    };
    
    loadSettings();
  }, []);

  const handleUpdateLocation = () => {
    Keyboard.dismiss();
    updateLocation(zipCode);
  };

  const showApiData = () => {
    if (fluData) {
      Alert.alert(
        'API Data',
        JSON.stringify(fluData, null, 2),
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('No Data', 'No API data available');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image 
          source={require('../assets/sick-icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Title style={styles.title}>Sick Day Checker</Title>
        <Text style={styles.subtitle}>
          Not sure if you should go to work or class? Let us help!
        </Text>
        
        {apiError && (
          <Banner
            visible={true}
            actions={[
              {
                label: 'Retry',
                onPress: () => updateLocation(zipCode),
              },
              {
                label: 'Debug',
                onPress: () => setShowDebug(!showDebug),
              },
            ]}
            icon="alert"
          >
            {apiError}
          </Banner>
        )}
        
        {showDebug && (
          <Card style={styles.debugCard}>
            <Card.Content>
              <Text style={styles.debugTitle}>Debug Info</Text>
              <Text>API Status: {isLoading ? 'Loading...' : (fluData ? 'Data Loaded' : 'No Data')}</Text>
              <Text>Has Error: {apiError ? 'Yes' : 'No'}</Text>
              <Button 
                mode="outlined" 
                onPress={showApiData} 
                style={styles.debugButton}
              >
                View API Response
              </Button>
            </Card.Content>
          </Card>
        )}
        
        <Card style={styles.card}>
          <Card.Content>
            <Text>Enter your zip code for local health data:</Text>
            <TextInput
              label="Zip Code"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
            />
            <Button 
              mode="contained"
              onPress={handleUpdateLocation}
              loading={isLoading}
              style={styles.button}
            >
              Update Location
            </Button>
          </Card.Content>
        </Card>
        
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Symptoms')}
          style={styles.mainButton}
          contentStyle={styles.mainButtonContent}
          labelStyle={styles.mainButtonLabel}
        >
          Check My Symptoms
        </Button>
        
        <View style={styles.buttonRow}>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('History')}
            style={styles.secondaryButton}
          >
            View History
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Settings')}
            style={styles.secondaryButton}
          >
            Settings
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    marginBottom: 24,
  },
  debugCard: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fffde7',
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  debugButton: {
    marginTop: 8,
  },
  input: {
    marginVertical: 12,
  },
  button: {
    marginTop: 8,
  },
  mainButton: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#4caf50',
  },
  mainButtonContent: {
    height: 56,
  },
  mainButtonLabel: {
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    width: '48%',
  },
});

export default HomeScreen;
