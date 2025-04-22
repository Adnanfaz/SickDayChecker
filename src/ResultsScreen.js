import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Text, IconButton, useTheme } from 'react-native-paper';


const ResultsScreen = ({ route, navigation }) => {
  const { result } = route.params;
  const theme = useTheme();
  
  // Determine colors and icons based on severity
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'high':
        return {
          color: '#d32f2f',
          icon: 'alert-circle',
          backgroundColor: '#ffebee'
        };
      case 'medium':
        return {
          color: '#ff9800',
          icon: 'alert',
          backgroundColor: '#fff3e0'
        };
      case 'low':
        return {
          color: '#4caf50',
          icon: 'check-circle',
          backgroundColor: '#e8f5e9'
        };
      default:
        return {
          color: '#2196f3',
          icon: 'information',
          backgroundColor: '#e3f2fd'
        };
    }
  };
  
  const severityStyle = getSeverityStyles(result.severity);
  
  const getAdviceForRecommendation = (recommendation) => {
    switch (recommendation) {
      case 'See a doctor':
        return [
          "Contact your healthcare provider or visit an urgent care facility",
          "Rest and stay hydrated",
          "Monitor your symptoms closely",
          "Isolate yourself to prevent spreading illness"
        ];
      case 'Consider resting':
        return [
          "Stay home to recover and prevent spreading illness",
          "Rest and drink plenty of fluids",
          "Take over-the-counter medications as needed for symptoms",
          "If symptoms worsen, consult a healthcare professional"
        ];
      case 'Safe to go':
        return [
          "Consider wearing a mask to protect others",
          "Practice good hand hygiene",
          "Monitor your symptoms for changes",
          "Stay hydrated and rest when possible"
        ];
      default:
        return ["Monitor your symptoms", "Practice good hygiene"];
    }
  };
  
  const advice = getAdviceForRecommendation(result.recommendation);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.resultCard, { backgroundColor: severityStyle.backgroundColor }]}>
        <Card.Content style={styles.resultContent}>
          <IconButton
            icon={severityStyle.icon}
            color={severityStyle.color}
            size={64}
          />
          <Title style={[styles.resultTitle, { color: severityStyle.color }]}>
            {result.recommendation}
          </Title>
          <Text style={styles.explanation}>{result.explanation}</Text>
        </Card.Content>
      </Card>
      
      <Card style={[styles.adviceCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Title style={[styles.adviceTitle, { color: theme.colors.text }]}>Recommended Actions:</Title>
          {advice.map((item, index) => (
            <View key={index} style={styles.adviceItem}>
              <Text style={[styles.adviceNumber, { color: theme.colors.text }]}>{index + 1}.</Text>
              <Text style={[styles.adviceText, { color: theme.colors.text }]}>{item}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Back to Home
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('History')}
          style={styles.button}
        >
          View History
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    marginBottom: 16,
    elevation: 2,
  },
  resultContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  resultTitle: {
    fontSize: 28,
    marginVertical: 16,
    textAlign: 'center',
  },
  explanation: {
    fontSize: 16,
    textAlign: 'center',
  },
  adviceCard: {
    marginBottom: 16,
  },
  adviceTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  adviceItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  adviceNumber: {
    width: 24,
    fontWeight: 'bold',
  },
  adviceText: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 16,
  },
  button: {
    marginBottom: 12,
  },
});

export default ResultsScreen;
