import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text, IconButton } from 'react-native-paper';

const ResultCard = ({ result }) => {
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

  return (
    <Card style={[styles.card, { backgroundColor: severityStyle.backgroundColor }]}>
      <Card.Content style={styles.content}>
        <IconButton
          icon={severityStyle.icon}
          color={severityStyle.color}
          size={48}
        />
        <Title style={[styles.title, { color: severityStyle.color }]}>
          {result.recommendation}
        </Title>
        <Text style={styles.explanation}>{result.explanation}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    marginVertical: 12,
    textAlign: 'center',
  },
  explanation: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ResultCard;

