import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Button, Title, Subheading, Switch, Text, RadioButton, Divider, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { HealthContext } from '../context/HealthContext';

import { evaluateSymptoms } from '../utils/healthCalculator';

const SymptomsScreen = ({ navigation }) => {
  const { fluData, addSymptomRecord } = useContext(HealthContext);
  const theme = useTheme();
  
  const [symptoms, setSymptoms] = useState({
    fever: 98.6,
    cough: 'none',
    soreThroat: false,
    bodyAches: false,
    headache: false,
    fatigue: 'none',
    shortnessOfBreath: false,
    chestPain: false,
    additionalNotes: '',
  });

  const updateSymptom = (name, value) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Evaluate symptoms
    const result = evaluateSymptoms(symptoms, fluData);
    
    // Add to history
    addSymptomRecord({
      symptoms,
      result,
      date: new Date().toISOString(),
    });
    
    // Navigate to results
    navigation.navigate('Results', { result });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Title style={[styles.title, { color: theme.colors.text }]}>How are you feeling today?</Title>
      <Subheading style={[styles.subtitle, { color: theme.dark ? '#aaa' : '#666' }]}>Tell us about your symptoms:</Subheading>
      
      <View style={styles.symptomContainer}>
        <Text style={[styles.symptomTitle, { color: theme.colors.text }]}>Temperature</Text>
        <Text style={[styles.value, { color: theme.colors.accent }]}>{symptoms.fever.toFixed(1)}°F</Text>
        <Slider
          minimumValue={97}
          maximumValue={105}
          step={0.1}
          value={symptoms.fever}
          onValueChange={(value) => updateSymptom('fever', value)}
          style={styles.slider}
          minimumTrackTintColor="#ff5252"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#ff5252"
        />
        <View style={styles.sliderLabels}>
          <Text style={{ color: theme.colors.text }}>97°F</Text>
          <Text style={{ color: theme.colors.text }}>105°F</Text>
        </View>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.symptomContainer}>
        <Text style={[styles.symptomTitle, { color: theme.colors.text }]}>Cough</Text>
        <RadioButton.Group
          onValueChange={(value) => updateSymptom('cough', value)}
          value={symptoms.cough}
        >
          <View style={styles.radioRow}>
            <RadioButton.Item label="None" value="none" />
            <RadioButton.Item label="Mild" value="mild" />
          </View>
          <View style={styles.radioRow}>
            <RadioButton.Item label="Moderate" value="moderate" />
            <RadioButton.Item label="Severe" value="severe" />
          </View>
        </RadioButton.Group>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.symptomContainer}>
        <Text style={[styles.symptomTitle, { color: theme.colors.text }]}>Fatigue</Text>
        <RadioButton.Group
          onValueChange={(value) => updateSymptom('fatigue', value)}
          value={symptoms.fatigue}
        >
          <View style={styles.radioRow}>
            <RadioButton.Item label="None" value="none" />
            <RadioButton.Item label="Mild" value="mild" />
          </View>
          <View style={styles.radioRow}>
            <RadioButton.Item label="Moderate" value="moderate" />
            <RadioButton.Item label="Severe" value="severe" />
          </View>
        </RadioButton.Group>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.symptomRow}>
        <Text style={[styles.symptomText, { color: theme.colors.text }]}>Sore Throat</Text>
        <Switch 
          value={symptoms.soreThroat} 
          onValueChange={(value) => updateSymptom('soreThroat', value)}
          color="#ff5252"
        />
      </View>
      
      <View style={styles.symptomRow}>
        <Text style={[styles.symptomText, { color: theme.colors.text }]}>Body Aches</Text>
        <Switch 
          value={symptoms.bodyAches} 
          onValueChange={(value) => updateSymptom('bodyAches', value)}
          color="#ff5252"
        />
      </View>
      
      <View style={styles.symptomRow}>
        <Text style={[styles.symptomText, { color: theme.colors.text }]}>Headache</Text>
        <Switch 
          value={symptoms.headache} 
          onValueChange={(value) => updateSymptom('headache', value)}
          color="#ff5252"
        />
      </View>
      
      <View style={styles.symptomRow}>
        <Text style={[styles.symptomText, { color: theme.colors.text }]}>Shortness of Breath</Text>
        <Switch 
          value={symptoms.shortnessOfBreath} 
          onValueChange={(value) => updateSymptom('shortnessOfBreath', value)}
          color="#ff5252"
        />
      </View>
      
      <View style={styles.symptomRow}>
        <Text style={[styles.symptomText, { color: theme.colors.text }]}>Chest Pain</Text>
        <Switch 
          value={symptoms.chestPain} 
          onValueChange={(value) => updateSymptom('chestPain', value)}
          color="#ff5252"
        />
      </View>
      
      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Get Recommendation
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
    color: '#666',
  },
  symptomContainer: {
    marginBottom: 16,
  },
  symptomTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  value: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5252',
  },
  slider: {
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginVertical: 16,
  },
  symptomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  symptomText: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 32,
    marginBottom: 24,
    paddingVertical: 8,
    backgroundColor: '#4caf50',
  },
});

export default SymptomsScreen;
